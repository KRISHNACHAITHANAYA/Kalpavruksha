import React from 'react';
import { Expert } from '../types';

interface ExpertCardProps {
  expert: Expert;
  diseaseContext: string;
  t: (key: string) => string;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, diseaseContext, t }) => {
  const subject = `${t('emailSubject')} - ${diseaseContext}`;
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
  
  return (
    <div className="glass-card p-5">
      <h3 className="text-lg font-bold text-green-300">{expert.name}</h3>
      <p className="text-sm text-gray-300 mt-2">{expert.address}</p>
      <p className="text-sm text-gray-300 mt-1 font-mono">{expert.phone}</p>
      <a
        href={mailtoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block w-full text-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
      >
        {t('contactViaEmailButton')}
      </a>
    </div>
  );
};

export default ExpertCard;