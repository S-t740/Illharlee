'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

import { products, getBestsellers, getNewArrivals } from '@/data';
import { Star, ArrowRight, Sparkles, Heart, Truck, Shield, Palette } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [currentHeroBg, setCurrentHeroBg] = useState(0);

  useEffect(() => {
    async function fetchFeatured() {
      const { data: bData } = await supabase.from('products').select('*').eq('is_bestseller', true).limit(8);
      const { data: nData } = await supabase.from('products').select('*').eq('is_new', true).limit(8);
      const { data: cData } = await supabase.from('collections').select('*').order('created_at', { ascending: true });
      if (bData) setBestsellers(bData);
      if (nData) setNewArrivals(nData);
      if (cData) setCollections(cData);
    }
    fetchFeatured();
  }, []);

  const heroImages = [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=1920'
  ];

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroBg(prev => (prev + 1) % heroImages.length);
    }, 4000);

    return () => {
      clearInterval(heroTimer);
    };
  }, []);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Sliding Background Images */}
          {heroImages.map((img, i) => (
            <div 
              key={i} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === currentHeroBg ? 'opacity-30' : 'opacity-0'}`}
            >
              <img src={img} alt="Hero Background" className="w-full h-full object-cover mix-blend-luminosity" />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-br from-brand-black/90 via-brand-purple/40 to-brand-black/90" />

          {/* Glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] animate-float pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-pink-hot/10 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-brand-gold/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-gold/3 rounded-full" />
        </div>

        {/* Sparkle decorations removed */}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-brand-gold text-xs tracking-[0.2em] uppercase mb-8">
            New Collection Out Now
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6">
            Jewelry redefined
            <br />
            <span className="text-gradient-gold">as presence.</span>
          </h1>

          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Stylish, affordable jewellery inspired by Y2K, Afrofusion, and contemporary
            Kenyan fashion. Made for every version of you. ♡
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-gold text-base px-10 py-4">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/collections" className="border border-white/30 text-white uppercase tracking-[0.1em] font-medium transition-colors hover:bg-white hover:text-brand-black text-base px-10 py-4 inline-flex items-center justify-center">
              Explore Collections
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 animate-pulse-soft">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-neutral-500 to-transparent" />
        </div>
      </section>



      {/* ============ NEW ARRIVALS ============ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-3">Just Dropped</p>
              <h2 className="font-heading text-3xl md:text-4xl text-brand-dark">New Arrivals</h2>
            </div>
            <Link
              href="/new-drops"
              className="hidden sm:flex items-center gap-2 text-sm tracking-wider uppercase text-brand-dark hover:text-brand-gold transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Link
            href="/new-drops"
            className="sm:hidden flex items-center justify-center gap-2 mt-8 text-sm tracking-wider uppercase text-brand-dark hover:text-brand-gold transition-colors"
          >
            View All New Drops <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ============ COLLECTIONS PREVIEW ============ */}
      <section className="section-padding bg-brand-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-3">Curated For You</p>
            <h2 className="font-heading text-3xl md:text-4xl">Shop by Aesthetic</h2>
            <p className="text-neutral-400 mt-3 max-w-xl mx-auto text-sm">
              Discover collections curated around the styles you love.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {collections.slice(0, 3).map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                {/* Image */}
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Gradient background overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${collection.accent_color}aa, ${collection.accent_color}55, var(--color-brand-black))`,
                    mixBlendMode: 'multiply'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: collection.accent_color }}>
                    Collection
                  </p>
                  <h3 className="font-heading text-2xl lg:text-3xl mb-2">{collection.name}</h3>
                  <p className="text-sm text-neutral-300 mb-4">{collection.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white group-hover:text-brand-gold transition-colors">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Remaining 2 collections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
            {collections.slice(3).map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[3/2] overflow-hidden"
              >
                {/* Image */}
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Gradient background overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${collection.accent_color}aa, ${collection.accent_color}55, var(--color-brand-black))`,
                    mixBlendMode: 'multiply'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: collection.accent_color }}>
                    Collection
                  </p>
                  <h3 className="font-heading text-2xl lg:text-3xl mb-2">{collection.name}</h3>
                  <p className="text-sm text-neutral-300 mb-4">{collection.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-white group-hover:text-brand-gold transition-colors">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BESTSELLERS ============ */}
      <section className="section-padding bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-brand-pink-hot mb-3">♡ Fan Favourites</p>
              <h2 className="font-heading text-3xl md:text-4xl text-brand-dark">Bestsellers</h2>
            </div>
            <Link
              href="/shop?sort=bestselling"
              className="hidden sm:flex items-center gap-2 text-sm tracking-wider uppercase text-brand-dark hover:text-brand-gold transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestsellers.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>



      {/* Removed TestimonialsSection to place it in Footer */}



    </div>
  );
}
