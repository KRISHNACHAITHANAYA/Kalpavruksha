import React from 'react';

interface AboutViewProps {
  t: (key: string) => string;
}

interface Owner {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

const OwnerCard: React.FC<{ owner: Owner }> = ({ owner }) => (
  <div className="glass-card p-6 text-center">
    <img 
      src={owner.photo} 
      alt={owner.name} 
      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-500/30"
    />
    <h3 className="text-xl font-bold text-green-300">{owner.name}</h3>
    <p className="text-sm text-gray-400 mt-1">{owner.role}</p>
    <p className="text-sm text-gray-300 mt-3 leading-relaxed">{owner.bio}</p>
  </div>
);

const FeatureItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-green-900/30 p-6 rounded-lg border border-green-500/30 h-full">
    <h3 className="text-lg font-semibold text-green-300">{title}</h3>
    <p className="mt-2 text-gray-300">{description}</p>
  </div>
);

const AboutView: React.FC<AboutViewProps> = ({ t }) => {
  const owners: Owner[] = [
    {
      name: 'Yashwanth N B',
      role: 'Lead Developer',
      bio: 'Expert in AI and Software Development with a passion for innovation.',
      photo: '/assets/team/owner1.jpg'
    },
    {
      name: 'Shanmukha C',
      role: 'Developer',
      bio: 'Specialist in machine learning and computer vision for disease detection.',
      photo: '/assets/team/owner2.jpg'
    },
    {
      name: 'Nishanth A N',
      role: 'Developer',
      bio: 'Expert in software development with creativity and a passion for problem-solving.',
      photo: '/assets/team/owner3.jpg'
    },
    {
      name: 'Krishna Chithanya K',
      role: 'UX/UI Designer',
      bio: 'Creating intuitive interfaces to make technology accessible to all.',
      photo: '/assets/team/owner4.jpg'
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto text-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-300">{t('aboutTitle')}</h1>
      </div>

      <div className="mt-8 glass-card p-8">
        <h2 className="text-2xl font-bold mb-4 text-white">{t('aboutMissionTitle')}</h2>
        <p className="leading-relaxed">
         {t('aboutMissionBody')}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">{t('aboutFeaturesTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureItem title={t('featureDetectTitle')} description={t('featureDetectDesc')} />
          <FeatureItem title={t('featureSeverityTitle')} description={t('featureSeverityDesc')} />
          <FeatureItem title={t('featureTreatmentTitle')} description={t('featureTreatmentDesc')} />
          <FeatureItem title={t('featureExpertTitle')} description={t('featureExpertDesc')} />
        </div>
      </div>

      <div className="mt-8 glass-card p-8">
        <h2 className="text-2xl font-bold mb-4 text-white">{t('aboutTechTitle')}</h2>
        <p className="leading-relaxed">
          {t('aboutTechBody')}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-white">{t('ownersSectionTitle')}</h2>
        <p className="text-center text-gray-400 mb-6">{t('ownersSectionSubtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {owners.map((owner, index) => (
            <OwnerCard key={index} owner={owner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutView;