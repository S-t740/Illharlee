'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

import { supabase } from '@/lib/supabase';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch collection
      const { data: collData } = await supabase.from('collections').select('*').eq('slug', slug).single();
      if (collData) {
        setCollection(collData);
        // Fetch products in this collection
        const { data: prodData } = await supabase
          .from('products')
          .select('*')
          .contains('collections', [collData.slug]);
        if (prodData) setProducts(prodData);
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) return <div className="pt-32 min-h-screen flex items-center justify-center">Loading...</div>;

  if (!collection) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="font-heading text-2xl mb-2">Collection not found</h1>
          <Link href="/collections" className="btn-primary mt-6">Back to Collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
      {/* Banner */}
      <div 
        className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-brand-black), ${collection.accent_color}44, var(--color-brand-black))`
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Placeholder decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: collection.accent_color }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-2xl" style={{ backgroundColor: collection.accent_color }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-slide-up">
          <p className="text-xs tracking-[0.2em] uppercase text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles size={14} style={{ color: collection.accentColor }} /> 
            Collection
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white mb-4">
            {collection.name}
          </h1>
          <p className="text-lg text-white/90 font-medium italic font-heading mb-6">
            "{collection.tagline}"
          </p>
          <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/collections" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-dark transition-colors">
            <ArrowLeft size={16} /> All Collections
          </Link>
          <p className="text-sm text-neutral-500">
            {products.length} Piece{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-neutral-100">
            <p className="text-2xl mb-4">✨</p>
            <h3 className="font-heading text-xl mb-2">Pieces coming soon</h3>
            <p className="text-sm text-neutral-500">
              We're curating beautiful pieces for this collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
