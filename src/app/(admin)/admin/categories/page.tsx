'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Edit2, Check, X } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: '', slug: '', icon: '' });

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!formData.name || !formData.slug) return alert('Name and slug are required');
    
    if (editingId) {
      const { error } = await supabase.from('categories').update({
        name: formData.name,
        slug: formData.slug,
        icon: formData.icon
      }).eq('id', editingId);
      
      if (!error) {
        setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
        setEditingId(null);
      } else {
        alert('Failed to update category');
      }
    } else {
      const { data, error } = await supabase.from('categories').insert([{
        name: formData.name,
        slug: formData.slug,
        icon: formData.icon
      }]).select();
      
      if (!error && data) {
        setCategories(prev => [...prev, data[0]]);
        setIsAdding(false);
      } else {
        alert('Failed to add category');
      }
    }
    
    setFormData({ name: '', slug: '', icon: '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories(prev => prev.filter(c => c.id !== id));
    } else {
      alert('Failed to delete category');
    }
  };

  if (loading) return <div className="p-8">Loading categories...</div>;

  return (
    <div className="flex-1 overflow-auto p-8 bg-neutral-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl mb-2">Categories</h1>
          <p className="text-neutral-500 text-sm">Manage product categories for your store.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', slug: '', icon: '' }); }}
            className="bg-brand-black text-white px-6 py-3 text-xs uppercase tracking-wider hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            + Add Category
          </button>
        )}
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Icon</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isAdding && (
                <tr className="bg-brand-cream/50">
                  <td className="px-6 py-4">
                    <input type="text" placeholder="Emoji icon" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="border p-1 w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-1 w-full" />
                  </td>
                  <td className="px-6 py-4">
                    <input type="text" placeholder="slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="border p-1 w-full" />
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
                    <button onClick={() => setIsAdding(false)} className="p-2 text-red-600 hover:bg-red-50 rounded"><X size={16} /></button>
                  </td>
                </tr>
              )}
              
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-neutral-50">
                  {editingId === cat.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="border p-1 w-16" />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-1 w-full" />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="border p-1 w-full" />
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
                        <button onClick={() => setEditingId(null)} className="p-2 text-red-600 hover:bg-red-50 rounded"><X size={16} /></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-2xl">{cat.icon}</td>
                      <td className="px-6 py-4 font-medium">{cat.name}</td>
                      <td className="px-6 py-4 text-neutral-500">{cat.slug}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button onClick={() => { setEditingId(cat.id); setFormData({name: cat.name, slug: cat.slug, icon: cat.icon || ''}); }} className="p-2 text-neutral-400 hover:text-brand-black hover:bg-neutral-100 rounded">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
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
