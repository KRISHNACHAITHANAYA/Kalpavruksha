import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  purchase_link: string;
  category: string;
}

interface ProductManagementViewProps {
    t: (key: string) => string;
}

const ProductManagementView: React.FC<ProductManagementViewProps> = ({ t }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', image_url: '', purchase_link: '', category: '' });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/get_products.php');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Persist to localStorage under unified schema used by treatment recommendations
    try {
      const key = 'cg-products';
      const raw = localStorage.getItem(key);
      const store = raw ? JSON.parse(raw) : { items: [] };
      const normalizeKey = (s: string) => (s || '').toLowerCase().replace('caterpillers', 'caterpillars').replace(/[^a-z0-9]/g, '');
      const diseaseKey = normalizeKey(newProduct.category);
      const entryIndex = store.items.findIndex((it: any) => normalizeKey(String(it.key)) === diseaseKey);
      // Support multiple links separated by comma -> create multiple product entries
      const links = (newProduct.purchase_link || '').split(',').map(s => s.trim()).filter(Boolean);
      const productItems = links.length > 0
        ? links.map(l => ({ name: newProduct.name, url: l }))
        : [{ name: newProduct.name }];
      if (entryIndex >= 0) {
        const arr = Array.isArray(store.items[entryIndex].products) ? store.items[entryIndex].products : [];
        arr.push(...productItems);
        store.items[entryIndex].products = arr;
      } else {
        store.items.push({ key: diseaseKey, products: productItems });
      }
      localStorage.setItem(key, JSON.stringify(store));

      // Also keep current table view updated locally
      setProducts(prev => [
        {
          id: Date.now(),
          name: newProduct.name,
          description: newProduct.description,
          image_url: newProduct.image_url,
          purchase_link: newProduct.purchase_link,
          category: newProduct.category,
        },
        ...prev,
      ]);

      setShowForm(false);
      setNewProduct({ name: '', description: '', image_url: '', purchase_link: '', category: '' });
    } catch (error) {
      console.error('Failed to add product to localStorage:', error);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (window.confirm(t('productDeleteConfirm'))) {
        try {
            await fetch('/api/delete_product.php', {
                method: 'POST', // Using POST to send a body
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            fetchProducts(); // Refresh the list
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    }
  };

  return (
    <div className="p-4 md:p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('productManagementTitle')}</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          {showForm ? t('cancel') : t('productAddNew')}
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">{t('productAddNew')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder={t('productNameLabel')} className="bg-gray-900/50 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" required />
              <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} placeholder={t('productCategoryLabel')} className="bg-gray-900/50 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder={t('productDescriptionLabel')} className="bg-gray-900/50 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" name="image_url" value={newProduct.image_url} onChange={handleInputChange} placeholder={t('productImageUrlLabel')} className="bg-gray-900/50 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
                <input type="text" name="purchase_link" value={newProduct.purchase_link} onChange={handleInputChange} placeholder={t('productPurchaseLinkLabel')} className="bg-gray-900/50 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              {t('productSave')}
            </button>
          </form>
        </div>
      )}

      {isLoading ? <p>{t('loading')}...</p> : (
        <div className="glass-card rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="py-3 px-4 text-left text-gray-300 uppercase tracking-wider">{t('productNameLabel')}</th>
                <th className="py-3 px-4 text-left text-gray-300 uppercase tracking-wider">{t('productCategoryLabel')}</th>
                <th className="py-3 px-4 text-left text-gray-300 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-white/5">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-500 font-semibold">{t('delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductManagementView;