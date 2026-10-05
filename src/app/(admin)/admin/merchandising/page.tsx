'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Star, Sparkles, Tag, Check } from 'lucide-react';
import { formatPrice } from '@/data';

export default function MerchandisingModule() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, compare_at_price, is_bestseller, is_new, image:images')
      .order('created_at', { ascending: false });
      
    if (data && !error) {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleToggle = async (id: string, field: 'is_bestseller' | 'is_new', currentValue: boolean) => {
    setSaving(id);
    const newValue = !currentValue;
    const { error } = await supabase.from('products').update({ [field]: newValue }).eq('id', id);
    
    if (!error) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: newValue } : p));
    }
    setSaving(null);
  };

  const handleUpdateOffer = async (id: string, newOfferPrice: string) => {
    setSaving(id);
    const val = newOfferPrice ? Number(newOfferPrice) : null;
    const { error } = await supabase.from('products').update({ compare_at_price: val }).eq('id', id);
    
    if (!error) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, compare_at_price: val } : p));
    }
    setSaving(null);
  };

  if (loading) return <div className="p-8">Loading merchandising...</div>;

  return (
    <div className="flex-1 overflow-auto p-8 bg-neutral-50 min-h-screen">
      <div className="mb-8">
        <h1 className="font-heading text-3xl mb-2">Merchandising & Offers</h1>
        <p className="text-neutral-500 text-sm">Quickly update Bestsellers, New Arrivals, and special Offers across your store.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium text-center">New Arrival</th>
                <th className="px-6 py-4 font-medium text-center">Bestseller</th>
                <th className="px-6 py-4 font-medium">Regular Price</th>
                <th className="px-6 py-4 font-medium">Offer Price (Compare At)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded overflow-hidden">
                        {product.image && product.image.length > 0 && (
                          <img src={product.image[0]} alt={product.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className="font-medium text-brand-dark">{product.name}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <button 
                      disabled={saving === product.id}
                      onClick={() => handleToggle(product.id, 'is_new', product.is_new)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${product.is_new ? 'bg-brand-gold' : 'bg-neutral-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${product.is_new ? 'left-7' : 'left-1'}`} />
                    </button>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <button 
                      disabled={saving === product.id}
                      onClick={() => handleToggle(product.id, 'is_bestseller', product.is_bestseller)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${product.is_bestseller ? 'bg-brand-black' : 'bg-neutral-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${product.is_bestseller ? 'left-7' : 'left-1'}`} />
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    {formatPrice(product.price)}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        placeholder="No Offer"
                        defaultValue={product.compare_at_price || ''}
                        onBlur={(e) => {
                          if (e.target.value !== String(product.compare_at_price || '')) {
                            handleUpdateOffer(product.id, e.target.value);
                          }
                        }}
                        className="border border-neutral-200 px-3 py-1.5 w-32 rounded focus:outline-none focus:border-brand-gold"
                      />
                      {saving === product.id && <span className="text-xs text-neutral-400">Saving...</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
