'use client';

import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  const [collections, setCollections] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCollections() {
      const { data } = await supabase.from('collections').select('*').order('created_at', { ascending: true });
      if (data) setCollections(data);
      setLoading(false);
    }
    fetchCollections();
  }, []);

  if (loading) return <div className="pt-32 min-h-screen flex items-center justify-center">Loading collections...</div>;

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
      {/* Page Header */}
      <div className="bg-brand-black text-white py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-3">Curated Aesthetics</p>
          <h1 className="font-heading text-3xl md:text-5xl mb-3">Collections</h1>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            Discover jewellery curated by style, mood and aesthetic. Find the pieces that speak to your vibe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="space-y-16 lg:space-y-24">
          {collections.map((collection, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={collection.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <Link href={`/collections/${collection.slug}`} className="block relative aspect-[4/5] lg:aspect-square overflow-hidden group">
                    {/* Actual image */}
                    <img 
                      src={collection.image} 
                      alt={collection.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    <div className="absolute inset-0 border-[16px] border-transparent group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
                  </Link>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                    <div 
                      className="w-12 h-1 mb-6 mx-auto lg:mx-0"
                      style={{ backgroundColor: collection.accent_color }}
                    />
                    <h2 className="font-heading text-3xl md:text-4xl text-brand-dark mb-4">
                      {collection.name}
                    </h2>
                    <p className="text-sm tracking-[0.1em] text-brand-gold-dark font-medium uppercase mb-6">
                      {collection.tagline}
                    </p>
                    <p className="text-neutral-600 leading-relaxed mb-8">
                      {collection.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Link 
                        href={`/collections/${collection.slug}`}
                        className="btn-primary"
                        style={{ 
                          backgroundColor: collection.accentColor,
                          borderColor: collection.accentColor,
                          color: '#fff' 
                        }}
                      >
                        Explore Collection
                      </Link>
                      <Link 
                        href={`/shop?collection=${collection.slug}`}
                        className="btn-secondary flex items-center gap-2 justify-center"
                      >
                        Shop All <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
