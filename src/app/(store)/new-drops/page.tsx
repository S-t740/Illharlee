'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getNewArrivals, getComingSoon, getLimitedPieces } from '@/data';
import { ArrowRight, Sparkles, Clock, Zap } from 'lucide-react';

export default function NewDropsPage() {
  const newArrivals = getNewArrivals();
  const comingSoon = getComingSoon();
  const limited = getLimitedPieces();

  const [activeTab, setActiveTab] = useState<'just-dropped' | 'limited' | 'coming-soon'>('just-dropped');

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
      {/* Page Header */}
      <div className="bg-brand-black text-white py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-3 flex items-center justify-center gap-2">
            <Sparkles size={14} /> Fresh Aesthetics
          </p>
          <h1 className="font-heading text-3xl md:text-5xl mb-4">New Drops</h1>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            The latest pieces added to our collections. Snag them before they're gone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('just-dropped')}
            className={`px-6 py-3 text-xs tracking-wider uppercase transition-all ${
              activeTab === 'just-dropped'
                ? 'bg-brand-black text-white border-2 border-brand-black'
                : 'bg-white text-brand-dark border-2 border-transparent hover:border-brand-gold/30'
            }`}
          >
            Just Dropped
          </button>
          <button
            onClick={() => setActiveTab('limited')}
            className={`px-6 py-3 text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
              activeTab === 'limited'
                ? 'bg-brand-purple text-white border-2 border-brand-purple'
                : 'bg-white text-brand-dark border-2 border-transparent hover:border-brand-purple/30'
            }`}
          >
            <Zap size={14} /> Limited Pieces
          </button>
          <button
            onClick={() => setActiveTab('coming-soon')}
            className={`px-6 py-3 text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
              activeTab === 'coming-soon'
                ? 'bg-brand-gold text-brand-black border-2 border-brand-gold font-medium'
                : 'bg-white text-brand-dark border-2 border-transparent hover:border-brand-gold/30'
            }`}
          >
            <Clock size={14} /> Coming Soon
          </button>
        </div>

        {/* Tab Content: Just Dropped */}
        {activeTab === 'just-dropped' && (
          <div className="animate-fade-in">
            {newArrivals.length === 0 ? (
               <div className="text-center py-16 bg-white border border-neutral-100">
                <p className="text-sm text-neutral-500 mb-4">No new drops at the moment.</p>
                <Link href="/shop" className="btn-secondary">Explore All Jewellery</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Limited */}
        {activeTab === 'limited' && (
          <div className="animate-fade-in">
             <div className="bg-brand-purple/5 border border-brand-purple/10 p-6 mb-8 text-center rounded-sm">
                <p className="text-sm text-brand-purple-light max-w-2xl mx-auto">
                  These pieces are available in extremely low quantities or for a short time only. Once they sell out, they may not be restocked.
                </p>
             </div>
            {limited.length === 0 ? (
               <div className="text-center py-16 bg-white border border-neutral-100">
                <p className="text-sm text-neutral-500">No limited pieces currently available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {limited.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Coming Soon */}
        {activeTab === 'coming-soon' && (
          <div className="animate-fade-in">
            {comingSoon.length === 0 ? (
              <div className="text-center py-16 bg-white border border-neutral-100">
                <p className="text-sm text-neutral-500">We're working on something exciting. Check back later!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {comingSoon.map(product => (
                  <div key={product.id} className="bg-white border border-neutral-200 overflow-hidden group">
                    <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                      <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="font-heading text-xl mb-2">Dropping Soon</span>
                         <Link href={`/product/${product.slug}`} className="text-xs uppercase tracking-wider underline hover:text-brand-gold">
                           Preview Piece
                         </Link>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <p className="text-xs tracking-wider uppercase text-brand-gold mb-2">Coming Soon</p>
                      <h3 className="text-lg font-medium text-brand-dark mb-2">{product.name}</h3>
                      <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{product.description}</p>
                      <button className="btn-secondary w-full text-xs">
                        Notify Me
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
