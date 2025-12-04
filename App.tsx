import React, { useState, useCallback, useEffect } from 'react';
import { PredictionResult, Coordinates, View, ModelSource, Language, User } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import Dashboard from './components/Dashboard';
import Spinner from './components/Spinner';
import ExpertView from './components/ExpertView';
import ProductsView from './components/ProductsView';
import AIAssistantView from './components/AIAssistantView';
import AboutView from './components/AboutView';
import GetStartedView from './components/GetStartedView';
import Hero from './components/Hero';
import ContactView from './components/ContactView';
import AdminLoginView from './components/AdminLoginView';
import AdminDashboardView from './components/AdminDashboardView';
import ProductManagementView from './components/ProductManagementView';
import UserLoginView from './components/UserLoginView';
import SignUpView from './components/SignUpView';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalization } from './hooks/useLocalization';
import {
  getTreatmentRecommendation,
  analyzeWithGemini,
  analyzeWithCustomModel,
  findLocalExperts,
  getPlaceName,
} from './services/analysisService';

const mockUsers: User[] = [
  { id: 'user-1', name: 'Test User', email: 'test@example.com', passwordHash: 'password123' }
];

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.GET_STARTED);
  const [modelSource, setModelSource] = useState<ModelSource>(ModelSource.GEMINI);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [treatment, setTreatment] = useState<string>('');
  const [diseaseContext, setDiseaseContext] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const { coordinates, error: geoError, getGeolocation } = useGeolocation();
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const { t } = useLocalization(language);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleNavigation = (targetView: View) => {
    // When navigating directly to the expert finder, clear any previous disease context
    // so the user can perform a fresh search.
    if (targetView === View.EXPERT_FINDER) {
      setDiseaseContext('');
    }
    setView(targetView);
  };

  const handleAdminLogin = (password: string): boolean => {
    // In a real application, this should be a secure check against a backend service.
    // For this demo, we'll use a simple hardcoded password.
    if (password === 'admin123') {
      setIsAdminAuthenticated(true);
      setView(View.ADMIN_DASHBOARD);
      return true;
    }
    return false;
  };

  const handleUserLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.passwordHash === password);
    if (user) {
      setIsUserAuthenticated(true);
      setCurrentUser(user);
      setView(View.HOME); // Redirect to home after login
      return true;
    }
    return false;
  };

  const handleUserSignUp = (name: string, email: string, password: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      passwordHash: password, // In a real app, hash this password
    };
    setUsers([...users, newUser]);
    setIsUserAuthenticated(true);
    setCurrentUser(newUser);
    setView(View.HOME); // Redirect to home after sign up
    return true;
  };

  const handleLogout = () => {
    setIsUserAuthenticated(false);
    setCurrentUser(null);
    setView(View.GET_STARTED); // Redirect to landing page after logout
  };

  useEffect(() => {
    const refetchTreatment = async () => {
      if (prediction && !prediction.isHealthy && prediction.diseaseType !== 'Unknown' && prediction.diseaseType !== 'No Disease Detected') {
        setIsLoading(true);
        try {
          const treatmentRec = await getTreatmentRecommendation(prediction.diseaseType, language);
          setTreatment(treatmentRec);
          setPrediction(prev => prev ? { ...prev, treatment: treatmentRec } : null);
        } catch (err) {
          setError(t('errorFailedTreatmentFetch'));
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (prediction) {
      refetchTreatment();
    }
  }, [language, prediction?.id]);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPrediction(null);
    setTreatment('');
    setError('');
    getGeolocation();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) {
      setError(t('errorSelectImage'));
      return;
    }

    setIsLoading(true);
    setError('');
    setPrediction(null);
    setTreatment('');

    try {
      // --- FIX: Get location FIRST and wait for it ---
      const currentCoords = await getGeolocation();

      const base64Image = await fileToBase64(imageFile);
      
      let analysisResult;
      if (modelSource === ModelSource.GEMINI) {
        analysisResult = await analyzeWithGemini(base64Image, imageFile.type);
      } else {
        const customModelResult = await analyzeWithCustomModel(imageFile);
        const lowerPred = customModelResult.prediction.toLowerCase();
        const healthyIndicators = ['healthy', 'no disease', 'no disease detected'];
        const isHealthy = healthyIndicators.some(h => lowerPred.includes(h));
        analysisResult = {
          isHealthy,
          diseaseType: customModelResult.prediction,
          severity: isHealthy ? 'N/A' : 'Mild', // default to Mild for non-healthy when backend doesn't supply severity
          confidence: customModelResult.confidence,
        };
      }
      
      const newPrediction: PredictionResult = {
        ...analysisResult,
        id: new Date().toISOString(),
        imageUrl: previewUrl!,
        timestamp: new Date().toLocaleString(),
        // --- FIX: Use the coordinates we just fetched ---
        coordinates: currentCoords,
        treatment: '', 
      };
      setPrediction(newPrediction);
      setDiseaseContext(`Disease: ${newPrediction.diseaseType}, Severity: ${newPrediction.severity}`);
      
      if (!analysisResult.isHealthy && analysisResult.diseaseType !== 'Unknown') {
        const treatmentRec = await getTreatmentRecommendation(analysisResult.diseaseType, language);
        setTreatment(treatmentRec);
        newPrediction.treatment = treatmentRec;
      }
      
      let placeName = 'N/A';
      // --- FIX: Use the coordinates we just fetched ---
      if (currentCoords) {
        placeName = await getPlaceName(currentCoords.latitude, currentCoords.longitude);
      }
      newPrediction.placeName = placeName;

      // Send the prediction to the PHP backend
      try {
        await fetch('http://localhost/coconut-api/save_prediction.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPrediction),
        });
      } catch (e) {
        console.error("Failed to save prediction to backend:", e);
      }

      setHistory(prev => [newPrediction, ...prev]);

    } catch (err) {
      // Check if the error is from geolocation
      if (err instanceof Error && (err.message.includes('Geolocation') || err.message.includes('location'))) {
        setError(err.message);
      } else {
        setError(t('errorFailedAnalysis'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, previewUrl, modelSource, language, t, getGeolocation]);

  const handleContactExpert = () => {
    if (!coordinates) {
      alert(t('alertEnableLocation'));
      getGeolocation();
      return;
    }
    setView(View.EXPERT_FINDER);
  };
  
  const resetState = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    setTreatment('');
    setError('');
  }

  const renderContent = () => {
    console.log("Rendering view:", view); // DEBUGGING
    switch (view) {
      case View.GET_STARTED:
        return (
          <>
            <Hero title={t('welcomeTitle')} subtitle={t('welcomeSubtitle')}>
              <button
                onClick={() => setView(View.USER_LOGIN)}
                className="bg-green-500 text-white font-bold py-3 px-10 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 text-lg shadow-lg"
              >
                {t('getStartedButton')}
              </button>
            </Hero>
            <div className="mt-12">
              {/* Hide duplicate header since Hero already shows it */}
              <GetStartedView onGetStarted={() => setView(View.USER_LOGIN)} t={t} showHeader={false} />
            </div>
          </>
        );
      case View.HOME:
        return (
          <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <ImageUploader 
              onImageChange={handleImageChange} 
              previewUrl={previewUrl} 
              onAnalyze={handleAnalyze} 
              isLoading={isLoading}
              onReset={resetState}
              modelSource={modelSource}
              onModelChange={setModelSource}
              t={t}
            />
            {isLoading && <Spinner />}
            {error && <p className="text-red-400 text-center mt-4 bg-red-900/50 p-3 rounded-lg">{error}</p>}
            {geoError && <p className="text-yellow-400 text-center mt-2 bg-yellow-900/50 p-3 rounded-lg">{geoError}</p>}
            {prediction && (
                            <ResultCard 
                prediction={prediction} 
                treatment={treatment}
                coordinates={coordinates}
                onContactExpert={() => setView(View.EXPERT_FINDER)}
                t={t}
              />
            )}
          </div>
        );
      case View.FARMER_PORTAL:
        return <Dashboard history={history} t={t} />;
      case View.PRODUCTS:
        return <ProductsView t={t} />;
      case View.AI_ASSISTANT:
        return <AIAssistantView t={t} language={language} />;
      case View.ABOUT:
        return <AboutView t={t} />;
      case View.CONTACT:
        return <ContactView t={t} />;
      case View.ADMIN_LOGIN:
        return <AdminLoginView onLogin={handleAdminLogin} t={t} />;
      case View.ADMIN_DASHBOARD:
        return isAdminAuthenticated ? <AdminDashboardView t={t} setView={setView} /> : <AdminLoginView onLogin={handleAdminLogin} t={t} />;
      case View.PRODUCT_MANAGEMENT:
        return isAdminAuthenticated ? <ProductManagementView t={t} /> : <AdminLoginView onLogin={handleAdminLogin} t={t} />;
      case View.USER_LOGIN:
        return <UserLoginView onLogin={handleUserLogin} setView={setView} t={t} />;
      case View.USER_SIGNUP:
        return <SignUpView onSignUp={handleUserSignUp} setView={setView} t={t} />;
      case View.EXPERT_FINDER:
        return <ExpertView 
          coordinates={coordinates} 
          diseaseContext={diseaseContext} 
          getGeolocation={getGeolocation}
          t={t}
          language={language}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative">
      {/* Full-page blurred coconut plantation background */}
      <div className="fixed inset-0 z-0">
        <picture className="block w-full h-full">
          <source srcSet="/assets/coconut-plantation.webp" type="image/webp" />
          <img
            src="/assets/coconut-plantation.jpg"
            alt="Coconut plantation background"
            className="w-full h-full object-cover opacity-85 blur-[12px] scale-105"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gray-900/40" />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        <Header
          currentView={view}
          setView={handleNavigation}
          language={language}
          setLanguage={setLanguage}
          t={t}
          isUserAuthenticated={isUserAuthenticated}
          handleLogout={handleLogout}
        />
        <main className="pt-20">
          {renderContent()}
        </main>
        <footer className="bg-gray-800/80 text-center p-4 text-sm text-gray-400 mt-auto">
          <p>{t('footerText')}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;