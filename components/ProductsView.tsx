import React from 'react';

interface ProductsViewProps {
  t: (key: string) => string;
}

const ProductCard: React.FC<{
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  t: (key: string) => string;
}> = ({ title, description, imageUrl, link, t }) => (
  <div className="glass-card overflow-hidden flex flex-col">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-100">{title}</h3>
      <p className="mt-2 text-gray-300 flex-grow">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block w-full text-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
      >
        {t('learnMoreButton')}
      </a>
    </div>
  </div>
);


const ProductsView: React.FC<ProductsViewProps> = ({ t }) => {
  const products = [
    {
      id: 'neem_oil',
      title: t('productNeemOilTitle'),
      description: t('productNeemOilDesc'),
      imageUrl: 'https://images.unsplash.com/photo-1629912391883-5511674a2183?q=80&w=2070&auto=format&fit=crop',
      link: 'https://en.wikipedia.org/wiki/Neem_oil',
    },
    {
      id: 'copper_fungicide',
      title: t('productCopperFungicideTitle'),
      description: t('productCopperFungicideDesc'),
      imageUrl: 'https://images.unsplash.com/photo-1591135433133-28f0d39375a9?q=80&w=2070&auto=format&fit=crop',
      link: 'https://en.wikipedia.org/wiki/Bordeaux_mixture',
    },
    {
      id: 'trichoderma',
      title: t('productTrichodermaTitle'),
      description: t('productTrichodermaDesc'),
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-69d9c6454a62?q=80&w=2070&auto=format&fit=crop',
      link: 'https://en.wikipedia.org/wiki/Trichoderma',
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">{t('productsTitle')}</h2>
      <p className="text-gray-300 mb-8 text-center">{t('productsSubtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            imageUrl={product.imageUrl}
            link={product.link}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsView;