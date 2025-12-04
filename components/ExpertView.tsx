import React, { useState, useEffect } from 'react';
import { Coordinates, Expert, Language } from '../types';
import { findLocalExperts } from '../services/analysisService';
import Spinner from './Spinner';
import ExpertCard from './ExpertCard';

interface ExpertViewProps {
  coordinates: Coordinates | null;
  diseaseContext: string; // This can be pre-filled from a diagnosis
  getGeolocation: () => void;
  t: (key: string) => string;
  language: Language;
}

const ExpertView: React.FC<ExpertViewProps> = ({ coordinates, diseaseContext, getGeolocation, t, language }) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState(diseaseContext || '');

  // Automatically search if coordinates and a disease context are passed in
  useEffect(() => {
    if (coordinates && diseaseContext) {
      handleSearch();
    }
  }, [coordinates, diseaseContext, language]);

  const handleSearch = async () => {
    if (!coordinates) {
      setError(t('expertFinderLocationError'));
      getGeolocation(); // Prompt user to enable location
      return;
    }
    
    setIsLoading(true);
    setError('');
    setExperts([]);

    try {
      const results = await findLocalExperts(coordinates, searchQuery || 'General agricultural advice', language);
      setExperts(results);
      if (results.length === 0) {
        setError(t('expertFinderNoResults'));
      }
    } catch (err) {
      console.error(err);
      setError(t('errorFetchExperts'));
    } finally {
      setIsLoading(false);
    }
  };

  // Initial prompt to enable location if not available
  if (!coordinates) {
    return (
      <div className="text-center p-12 max-w-2xl mx-auto glass-card mt-8 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-100">{t('expertFinderTitle')}</h2>
        <p className="mt-4 text-gray-300">{t('expertViewEnableLocation')}</p>
        <button
          onClick={getGeolocation}
          className="mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          {t('enableLocationButton')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">{t('expertFinderTitle')}</h2>
      <p className="text-gray-300 mb-8 text-center">{t('expertFinderIntro')}</p>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('expertFinderSearchPlaceholder')}
          className="flex-grow bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-green-500 text-white font-bold py-3 px-8 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-500"
        >
          {isLoading ? t('expertFinderSearching') : t('expertFinderButton')}
        </button>
      </div>

      {/* Results */}
      {isLoading && <Spinner />}
      {error && !isLoading && <p className="text-yellow-400 text-center glass-card p-4">{error}</p>}

      {experts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">{t('expertFinderResultsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert, index) => (
              <ExpertCard key={index} expert={expert} diseaseContext={searchQuery} t={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertView;
