import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FaCamera, FaStethoscope, FaUserMd } from 'react-icons/fa';

interface GetStartedViewProps {
  onGetStarted: () => void;
  t: (key: string) => string;
  /** When false, hides the duplicate heading/subtitle/CTA (useful when a Hero is shown above). */
  showHeader?: boolean;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  bgImage: string;
  bgImageWebP: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text, bgImage, bgImageWebP }) => {
  const cardRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
  <div ref={cardRef} className="relative bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl overflow-hidden group hover:bg-gray-800/80 transition-all duration-300">
    {/* Background image with overlay - always visible, brightens on hover */}
    <div className="absolute inset-0 opacity-100 transition-opacity duration-300">
      <picture>
        <source srcSet={bgImageWebP} type="image/webp" />
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover opacity-60 blur-sm group-hover:opacity-70 transition-opacity duration-300"
          loading="lazy"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/80 group-hover:from-gray-900/50 group-hover:to-gray-900/70 transition-all duration-300" />
    </div>

    {/* Content */}
    <div className="relative z-10 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
          <div className="text-green-400 text-4xl">{icon}</div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </div>
  </div>
  );
};

const GetStartedView: React.FC<GetStartedViewProps> = ({ onGetStarted, t, showHeader = true }) => {
  const containerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-full text-center p-4 md:p-8">
      <div className="max-w-3xl">
        {showHeader && (
          <>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t('welcomeTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10">
              {t('welcomeSubtitle')}
            </p>
            <button
              onClick={onGetStarted}
              className="bg-green-500 text-white font-bold py-3 px-10 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 text-lg shadow-lg"
            >
              {t('getStartedButton')}
            </button>
          </>
        )}
      </div>

  {/* Features Section */}
  <div className={`${showHeader ? 'mt-16 md:mt-24' : 'mt-8 md:mt-12'} w-full max-w-5xl`}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaCamera />}
            title={t('feature1Title')}
            text={t('feature1Text')}
            bgImage="/assets/camera-analysis.jpg"
            bgImageWebP="/assets/camera-analysis.webp"
          />
          <FeatureCard 
            icon={<FaStethoscope />}
            title={t('feature2Title')}
            text={t('feature2Text')}
            bgImage="/assets/ai-neural.jpg"
            bgImageWebP="/assets/ai-neural.webp"
          />
          <FeatureCard 
            icon={<FaUserMd />}
            title={t('feature3Title')}
            text={t('feature3Text')}
            bgImage="/assets/expert-consultation.jpg"
            bgImageWebP="/assets/expert-consultation.webp"
          />
        </div>
      </div>
    </div>
  );
};

export default GetStartedView;
