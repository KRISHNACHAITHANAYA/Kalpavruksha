import React from 'react';
import { PredictionResult } from '../types';

interface DashboardProps {
  history: PredictionResult[];
  t: (key: string) => string;
}

const HistoryCard: React.FC<{ item: PredictionResult, t: (key: string) => string }> = ({ item, t }) => {
  const healthColor = item.isHealthy ? 'border-green-400' : 'border-red-400';

  return (
    <div className={`glass-card overflow-hidden border-l-4 ${healthColor}`}>
      <div className="p-4 flex">
        <img src={item.imageUrl} alt={t('analyzedLeafAlt')} className="w-24 h-24 object-cover rounded-md mr-4" />
        <div className="flex-grow">
          <p className={`font-bold text-lg ${item.isHealthy ? 'text-green-300' : 'text-red-300'}`}>{item.diseaseType}</p>
          <p className="text-sm text-gray-300">{t('severityLabel')}: {item.severity}</p>
          <p className="text-sm text-gray-300">{t('confidenceLabel')}: {(item.confidence * 100).toFixed(1)}%</p>
          {item.coordinates && (
            <p className="text-xs text-gray-400 mt-1">
              {t('locationLabel')}: {item.coordinates.latitude.toFixed(4)}, {item.coordinates.longitude.toFixed(4)}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">{item.timestamp}</p>
        </div>
      </div>
    </div>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ history, t }) => {
  if (history.length === 0) {
    return (
      <div className="text-center p-12 max-w-2xl mx-auto glass-card mt-8">
        <h2 className="text-2xl font-semibold text-gray-100">{t('dashboardTitle')}</h2>
        <p className="mt-4 text-gray-300">{t('dashboardEmpty')}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">{t('dashboardTitle')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map(item => (
          <HistoryCard key={item.id} item={item} t={t} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;