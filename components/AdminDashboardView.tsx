import React, { useState, useEffect } from 'react';
import { PredictionResult, View } from '../types';
import Spinner from './Spinner'; // Assuming you have a Spinner component

interface AdminDashboardViewProps {
  t: (key: string) => string;
  setView: (view: View) => void;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ t, setView }) => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch('/api/get_predictions.php');
        if (!response.ok) {
          throw new Error('Failed to fetch data from server.');
        }
        const data = await response.json();
        setPredictions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
    // Fetch every 30 seconds to get new data
    const intervalId = setInterval(fetchPredictions, 30000); 

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-400 bg-red-900/50 rounded-lg">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">{t('adminDashboardTitle')}</h2>
        <button 
          onClick={() => setView(View.PRODUCT_MANAGEMENT)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {t('productManagementTitle')}
        </button>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">{t('adminRecentPredictions')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-white/10 text-xs text-gray-200 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">{t('adminTableTimestamp')}</th>
                <th scope="col" className="px-6 py-3">{t('adminTableImage')}</th>
                <th scope="col" className="px-6 py-3">{t('adminTableDisease')}</th>
                <th scope="col" className="px-6 py-3">{t('adminTableConfidence')}</th>
                <th scope="col" className="px-6 py-3">{t('adminTableLocationName')}</th>
              </tr>
            </thead>
            <tbody>
              {predictions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">{t('adminNoPredictions')}</td>
                </tr>
              ) : (
                predictions.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700 hover:bg-white/5">
                    <td className="px-6 py-4">{new Date(item.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {/* The image_url from the DB might be a local file path from the React app's perspective,
                          which won't render directly. For now, we show a placeholder.
                          A more robust solution would be to upload images to a server-accessible path. */}
                      <img src={item.image_url} alt="Analyzed" className="w-16 h-16 object-cover rounded-md" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }} />
                    </td>
                    <td className="px-6 py-4 font-medium">{item.disease_type}</td>
                    <td className="px-6 py-4">{(item.confidence * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4">
                      {item.place_name && item.place_name !== 'N/A' 
                        ? item.place_name 
                        : (item.latitude ? `${parseFloat(item.latitude).toFixed(4)}, ${parseFloat(item.longitude).toFixed(4)}` : 'N/A')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
