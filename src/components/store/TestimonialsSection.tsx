'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Fetch approved testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTestimonials(data);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto slide
  useEffect(() => {
    if (testimonials.length <= 1 || showForm) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length, showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    const { error } = await supabase.from('feedback').insert([
      {
        name: formData.name,
        text: formData.text,
        rating: formData.rating,
        status: 'pending' // pending approval
      }
    ]);

    if (error) {
      console.error(error);
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus('idle');
        setFormData({ name: '', text: '', rating: 5 });
      }, 3000);
    }
  };

  return (
    <section className="section-padding bg-brand-cream">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-brand-pink-hot mb-3">♡ Love from Our Customers</p>
        <h2 className="font-heading text-3xl md:text-4xl text-brand-dark mb-12">What They're Saying</h2>

        {testimonials.length > 0 ? (
          <div className="relative min-h-[200px] mb-8">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === currentTestimonial
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="var(--color-brand-gold)" className="text-brand-gold" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-brand-dark leading-relaxed mb-4 italic font-heading">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <p className="text-sm font-semibold tracking-wider uppercase">{t.name}</p>
                {t.product && (
                  <p className="text-xs text-neutral-500 mt-1">Purchased: {t.product}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-12 text-neutral-500 italic">No reviews yet. Be the first to share your experience!</div>
        )}

        {/* Navigation Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-3 mb-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentTestimonial ? 'bg-brand-gold w-6' : 'bg-brand-gold/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Feedback Form Button */}
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="border-2 border-brand-black text-brand-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-brand-black hover:text-white transition-colors"
          >
            Leave Feedback
          </button>
        ) : (
          <div className="bg-white p-8 border border-neutral-200 mt-8 text-left max-w-xl mx-auto">
            <h3 className="font-heading text-2xl mb-6 text-center">Share Your Experience</h3>
            
            {submitStatus === 'success' ? (
              <div className="text-center text-green-600 bg-green-50 p-4 rounded">
                Thank you! Your feedback has been submitted for review.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        type="button" 
                        key={star} 
                        onClick={() => setFormData({...formData, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star size={24} className={formData.rating >= star ? 'text-brand-gold' : 'text-neutral-300'} fill={formData.rating >= star ? 'var(--color-brand-gold)' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">Review</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold resize-none"
                    placeholder="Tell us what you loved..."
                  />
                </div>
                {submitStatus === 'error' && (
                  <div className="text-red-500 text-sm">Something went wrong. Please try again.</div>
                )}
                <div className="flex gap-4 pt-2">
                  <button 
                    type="submit" 
                    disabled={submitStatus === 'submitting'}
                    className="flex-1 bg-brand-black text-white py-3 text-sm tracking-widest uppercase hover:bg-brand-gold hover:text-brand-black transition-colors disabled:opacity-50"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-6 border border-neutral-200 text-neutral-500 text-sm tracking-widest uppercase hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
