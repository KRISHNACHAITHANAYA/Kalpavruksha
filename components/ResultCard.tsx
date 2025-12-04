import React from 'react';
import { PredictionResult, Coordinates } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface ResultCardProps {
  prediction: PredictionResult;
  treatment: string;
  coordinates: Coordinates | null;
  onContactExpert: () => void;
  t: (key: string) => string;
}

const StatusBadge: React.FC<{ isHealthy: boolean, t: (key: string) => string }> = ({ isHealthy, t }) => {
  const bgColor = isHealthy ? 'bg-green-900/50' : 'bg-red-900/50';
  const textColor = isHealthy ? 'text-green-300' : 'text-red-300';
  const dotColor = isHealthy ? 'bg-green-400' : 'bg-red-400';
  const text = isHealthy ? t('statusHealthy') : t('statusDiseased');

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColor}`}></span>
      {text}
    </span>
  );
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const createMarkup = () => {
    let html = content
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/g, '<br />');

    // Group list items
    html = html.replace(/(<li.*<\/li>)(?!<li)/g, '<ul>$1</ul>');
    html = html.replace(/<\/ul><br \/><ul>/g, '');


    return { __html: html };
  };

  return <div dangerouslySetInnerHTML={createMarkup()} className="prose prose-sm prose-invert max-w-none" />;
};


const ResultCard: React.FC<ResultCardProps> = ({ prediction, treatment, coordinates, onContactExpert, t }) => {
  const { speak, isSpeaking } = useSpeechSynthesis();
  const showExpertButton = !prediction.isHealthy && (prediction.severity === 'Severe' || prediction.diseaseType === 'Unknown');

  const getSpokenText = () => {
    if (prediction.isHealthy) {
        return t('speechHealthy');
    }
    // FIX: Check if treatment is defined before calling replace on it.
    const treatmentText = treatment ? treatment.replace(/\*/g, '') : t('treatmentLoading');
    return `${t('speechDiseased')} ${prediction.diseaseType}. ${t('speechSeverity')} ${prediction.severity}. ${t('speechTreatment')} ${treatmentText}`;
  };

  return (
    <div className="mt-8 glass-card p-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('resultCardTitle')}</h2>
        <StatusBadge isHealthy={prediction.isHealthy} t={t} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-300">{t('diseaseTypeLabel')}</h3>
            <p className="text-lg text-gray-100">{prediction.diseaseType}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-300">{t('severityLabel')}</h3>
            <p className="text-lg text-gray-100">{prediction.severity}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-300">{t('confidenceLabel')}</h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${prediction.confidence * 100}%` }}></div>
            </div>
            <p className="text-lg text-gray-100 text-right">{(prediction.confidence * 100).toFixed(1)}%</p>
          </div>
          {coordinates && (
             <div className="mb-4">
                <h3 className="font-semibold text-gray-300">{t('gpsLabel')}</h3>
                <p className="text-sm text-gray-200">
                  {prediction.placeName && prediction.placeName !== 'N/A' 
                    ? prediction.placeName 
                    : `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`}
                </p>
             </div>
          )}
        </div>
        {/* Right Column */}
        <div className="bg-black/20 p-4 rounded-lg">
           <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-300">{t('voiceAssistantLabel')}</h3>
            <button 
                onClick={() => speak(getSpokenText())}
                disabled={isSpeaking}
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
                aria-label={t('voiceAssistantAriaLabel')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.75a.75.75 0 01.75.75v11.5a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75zM8.25 7a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
                    <path fillRule="evenodd" d="M3 8a4 4 0 014-4h6a4 4 0 014 4v4a4 4 0 01-4 4H7a4 4 0 01-4-4V8zm4-2.5a2.5 2.5 0 00-2.5 2.5v4a2.5 2.5 0 002.5 2.5h6a2.5 2.5 0 002.5-2.5V8a2.5 2.5 0 00-2.5-2.5H7z" clipRule="evenodd" />
                </svg>
            </button>
           </div>
           <p className="text-sm text-gray-400">
             {t('voiceAssistantHint')}
           </p>
        </div>
      </div>
      
      {showExpertButton && (
        <div className="mt-6 p-4 bg-yellow-900/40 border-l-4 border-yellow-500 rounded-r-lg">
          <h3 className="font-bold text-yellow-200">{t('expertRecommendationTitle')}</h3>
          <p className="text-yellow-300 text-sm mt-1">{t('expertRecommendationBody')}</p>
          <button 
            onClick={onContactExpert}
            className="mt-3 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
          >
            {t('findExpertButton')}
          </button>
        </div>
      )}

      {!prediction.isHealthy && treatment && (
        <div className="mt-6 pt-4 border-t border-white/20">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">{t('treatmentRecommendationTitle')}</h3>
          <div className="text-gray-200 space-y-2 leading-relaxed">
             <MarkdownRenderer content={treatment} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;