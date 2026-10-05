'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Edit2, Check, X } from 'lucide-react';

export default function AdminCollections() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', slug: '', tagline: '', description: '', image: '', accent_color: '#D4AF37' });

  const fetchCollections = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('collections').select('*').order('created_at', { ascending: true });
    if (!error && data) {
      setCollections(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const file = files[0];

    try {
      const sigRes = await fetch('/api/upload/signature', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'illharlee_collections' })
      });
      const { timestamp, signature, apiKey, cloudName: resCloudName } = await sigRes.json();

      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('timestamp', timestamp);
      uploadData.append('signature', signature);
      uploadData.append('api_key', apiKey);
      uploadData.append('folder', 'illharlee_collections');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${resCloudName}/image/upload`, {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, image: data.secure_url }));
      } else {
        alert("Upload failed: " + (data.error?.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
    setUploadingImage(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) return alert('Name and slug are required');
    
    if (editingId) {
      const { error } = await supabase.from('collections').update(formData).eq('id', editingId);
      
      if (!error) {
        setCollections(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
        setEditingId(null);
      } else {
        alert('Failed to update collection');
      }
    } else {
      const { data, error } = await supabase.from('collections').insert([formData]).select();
      
      if (!error && data) {
        setCollections(prev => [...prev, data[0]]);
        setIsAdding(false);
      } else {
        alert('Failed to add collection');
      }
    }
    
    setFormData({ name: '', slug: '', tagline: '', description: '', image: '', accent_color: '#D4AF37' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (!error) {
      setCollections(prev => prev.filter(c => c.id !== id));
    } else {
      alert('Failed to delete collection');
    }
  };

  if (loading) return <div className="p-8">Loading collections...</div>;

  return (
    <div className="flex-1 overflow-auto p-8 bg-neutral-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl mb-2">Curated Collections</h1>
          <p className="text-neutral-500 text-sm">Manage collections for the "Shop by Aesthetic" section.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', slug: '', tagline: '', description: '', image: '', accent_color: '#D4AF37' }); }}
            className="bg-brand-black text-white px-6 py-3 text-xs uppercase tracking-wider hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            + Add Collection
          </button>
        )}
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Info</th>
                <th className="px-6 py-4 font-medium">Color</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isAdding && (
                <tr className="bg-brand-cream/50">
                  <td className="px-6 py-4 align-top">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover mb-2" />
                    ) : (
                      <div className="w-16 h-16 bg-neutral-200 mb-2" />
                    )}
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="text-xs" disabled={uploadingImage} />
                  </td>
                  <td className="px-6 py-4">
                    <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-1 w-full mb-2" />
                    <input type="text" placeholder="Slug (url-friendly)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="border p-1 w-full mb-2" />
                    <input type="text" placeholder="Tagline" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="border p-1 w-full mb-2" />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border p-1 w-full" rows={2} />
                  </td>
                  <td className="px-6 py-4 align-top">
                    <input type="color" value={formData.accent_color} onChange={e => setFormData({...formData, accent_color: e.target.value})} className="h-8 w-8" />
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2 align-top">
                    <button onClick={handleSave} disabled={uploadingImage} className="p-2 text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
                    <button onClick={() => setIsAdding(false)} className="p-2 text-red-600 hover:bg-red-50 rounded"><X size={16} /></button>
                  </td>
                </tr>
              )}
              
              {collections.map(col => (
                <tr key={col.id} className="hover:bg-neutral-50">
                  {editingId === col.id ? (
                    <>
                      <td className="px-6 py-4 align-top">
                        {formData.image && <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover mb-2" />}
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="text-xs" disabled={uploadingImage} />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-1 w-full mb-2" />
                        <input type="text" placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="border p-1 w-full mb-2" />
                        <input type="text" placeholder="Tagline" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="border p-1 w-full mb-2" />
                        <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border p-1 w-full" rows={2} />
                      </td>
                      <td className="px-6 py-4 align-top">
                        <input type="color" value={formData.accent_color} onChange={e => setFormData({...formData, accent_color: e.target.value})} className="h-8 w-8" />
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2 align-top">
                        <button onClick={handleSave} disabled={uploadingImage} className="p-2 text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
                        <button onClick={() => setEditingId(null)} className="p-2 text-red-600 hover:bg-red-50 rounded"><X size={16} /></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <img src={col.image} alt={col.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{col.name}</div>
                        <div className="text-neutral-500 text-xs mb-1">{col.slug}</div>
                        <div className="text-neutral-700 italic text-sm">{col.tagline}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-6 h-6 rounded-full border border-neutral-200" style={{ backgroundColor: col.accent_color }} title={col.accent_color} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setEditingId(col.id); setFormData({name: col.name, slug: col.slug, tagline: col.tagline, description: col.description, image: col.image, accent_color: col.accent_color}); }} className="p-2 text-neutral-400 hover:text-brand-black hover:bg-neutral-100 rounded">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(col.id)} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
