'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Check, X, Trash2 } from 'lucide-react';

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setFeedbackList(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    // In a real app we'd need service_role key to update if RLS is tight,
    // but we can just use the anon key if RLS allows it, or we bypass with a server action.
    // For now, assuming the admin can update it using their authenticated session (or we temporarily allow update)
    const { error } = await supabase.from('feedback').update({ status }).eq('id', id);
    if (!error) {
      setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    } else {
      console.error(error);
      alert('Failed to update status. Check permissions or RLS policies.');
    }
  };

  const deleteFeedback = async (id: string) => {
    const { error } = await supabase.from('feedback').delete().eq('id', id);
    if (!error) {
      setFeedbackList(prev => prev.filter(f => f.id !== id));
    }
  };

  if (loading) return <div className="p-8">Loading feedback...</div>;

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl mb-2">Feedback & Testimonials</h1>
          <p className="text-neutral-500 text-sm">Manage customer reviews before they appear live on the store.</p>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Review</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {feedbackList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                    No feedback found.
                  </td>
                </tr>
              ) : feedbackList.map(item => (
                <tr key={item.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 max-w-md truncate">{item.text}</td>
                  <td className="px-6 py-4">{item.rating} / 5</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.status === 'approved' ? 'bg-green-50 text-green-600' :
                      item.status === 'rejected' ? 'bg-red-50 text-red-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    {item.status !== 'approved' && (
                      <button onClick={() => updateStatus(item.id, 'approved')} className="p-2 text-green-600 hover:bg-green-50 rounded" title="Approve">
                        <Check size={16} />
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button onClick={() => updateStatus(item.id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Reject">
                        <X size={16} />
                      </button>
                    )}
                    <button onClick={() => deleteFeedback(item.id)} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                      <Trash2 size={16} />
                    </button>
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
