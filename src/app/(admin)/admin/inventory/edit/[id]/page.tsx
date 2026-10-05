'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    category: 'necklaces',
    stock: '',
    description: '',
    images: [] as string[],
    collections: [] as string[]
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [availableCollections, setAvailableCollections] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => {
      if (data) setCategories(data);
    });
    supabase.from('collections').select('*').then(({ data }) => {
      if (data) setAvailableCollections(data);
    });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setFetching(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (data) {
        setFormData({
          name: data.name,
          sku: data.sku,
          price: data.price.toString(),
          category: data.category,
          stock: data.stock.toString(),
          description: data.description || '',
          images: data.images || [],
          collections: data.collections || []
        });
      }
      setFetching(false);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productToUpdate = {
      name: formData.name,
      sku: formData.sku,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
      description: formData.description,
      images: formData.images,
      collections: formData.collections
    };

    const { error } = await supabase
      .from('products')
      .update(productToUpdate)
      .eq('id', id);

    setLoading(false);
    if (!error) {
      router.push('/admin/inventory');
    } else {
      console.error(error);
      alert('Failed to update product');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const maxFileSize = 20 * 1024 * 1024; // 20 MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds the 20MB limit.`);
        continue;
      }

      try {
        const sigRes = await fetch('/api/upload/signature', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder: 'illharlee_products' })
        });
        const { timestamp, signature, apiKey, cloudName } = await sigRes.json();

        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('timestamp', timestamp);
        uploadData.append('signature', signature);
        uploadData.append('api_key', apiKey);
        uploadData.append('folder', 'illharlee_products');

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: uploadData,
        });

        const data = await response.json();
        if (data.secure_url) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, data.secure_url]
          }));
        } else {
          console.error("Cloudinary error:", data);
          alert("Upload failed: " + (data.error?.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image. Please try again.");
      }
    }
    setUploadingImage(false);
  };

  if (fetching) return <div className="p-8">Loading product...</div>;

  return (
    <div className="flex-1 overflow-auto p-8 bg-neutral-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-black mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Inventory
        </button>

        <h1 className="font-heading text-3xl mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Product Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">SKU</label>
              <input 
                required
                type="text" 
                value={formData.sku}
                onChange={e => setFormData({...formData, sku: e.target.value})}
                className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Price (KSh)</label>
              <input 
                required
                type="number" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Stock Level</label>
              <input 
                required
                type="number" 
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
                className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Collections</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {availableCollections.map(c => (
                  <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.collections.includes(c.slug)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, collections: [...formData.collections, c.slug] });
                        } else {
                          setFormData({ ...formData, collections: formData.collections.filter(slug => slug !== c.slug) });
                        }
                      }}
                      className="text-brand-gold focus:ring-brand-gold border-neutral-300 rounded"
                    />
                    {c.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Product Images (Max 20MB)</label>
              <div className="flex gap-4 flex-wrap mb-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 border border-neutral-200 rounded overflow-hidden">
                    <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({...prev, images: prev.images.filter((_, i) => i !== idx)}))}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title="Choose images to upload"
                />
                <button 
                  type="button"
                  className="border-2 border-dashed border-brand-gold/50 bg-brand-gold/5 text-brand-gold px-6 py-4 rounded text-sm font-medium hover:bg-brand-gold/10 transition-colors w-full"
                >
                  {uploadingImage ? 'Uploading...' : '+ Upload Images from File Explorer'}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex justify-end">
            <button 
              type="submit" 
              disabled={loading || uploadingImage}
              className="bg-brand-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-brand-gold hover:text-brand-black transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
