'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Trash2, Edit2, ArchiveX } from 'lucide-react';

export default function AdminInventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const markOutOfStock = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .update({ stock: 0 })
      .eq('id', id);

    if (!error) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: 0 } : p));
    } else {
      alert('Failed to update stock');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    } else {
      alert('Failed to delete product');
    }
  };

  if (loading) return <div className="p-8">Loading inventory...</div>;

  return (
    <div className="flex-1 overflow-auto p-8 bg-neutral-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl mb-2">Inventory</h1>
          <p className="text-neutral-500 text-sm">Manage products and stock levels.</p>
        </div>
        <Link href="/admin/inventory/new" className="bg-brand-black text-white px-6 py-3 text-xs uppercase tracking-wider hover:bg-brand-gold hover:text-brand-black transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                    No products found.
                  </td>
                </tr>
              ) : products.map(product => (
                <tr key={product.id} className="hover:bg-neutral-50 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neutral-100 overflow-hidden flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-neutral-200"></div>
                        )}
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">{product.sku}</td>
                  <td className="px-6 py-4 capitalize">{product.category.replace('-', ' ')}</td>
                  <td className="px-6 py-4">KSh {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      product.stock > product.low_stock_threshold ? 'bg-green-50 text-green-600' :
                      product.stock > 0 ? 'bg-orange-50 text-orange-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {product.stock > product.low_stock_threshold ? 'In Stock' :
                       product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => markOutOfStock(product.id)}
                        className="p-2 text-orange-500 hover:bg-orange-50 rounded" 
                        title="Mark Out of Stock"
                      >
                        <ArchiveX size={16} />
                      </button>
                      <Link 
                        href={`/admin/inventory/edit/${product.id}`}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded" 
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
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
