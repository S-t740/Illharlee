'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="relative bg-brand-black text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-purple/20 to-brand-black" />
        <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-20 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center animate-fade-in">
           <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-6 flex items-center justify-center gap-2">
            <Sparkles size={14} /> Our Story
          </p>
          <h1 className="font-heading text-4xl md:text-6xl mb-6 leading-tight">
            Jewelry redefined as <span className="text-gradient-gold italic">presence.</span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="space-y-12 text-lg text-neutral-700 leading-relaxed font-body">
          <p className="text-2xl text-brand-dark font-heading leading-snug text-center max-w-2xl mx-auto">
            Born from a love for jewellery, fashion, and self-expression, Illharlee is a brand made for every version of you.
          </p>
          
          <div className="divider-gold max-w-xs mx-auto my-12" />

          <p>
            We believe that jewellery is more than just an accessory. It's a statement. It's a mood. It's the finishing touch that transforms an outfit into a look, and a look into a presence. 
          </p>
          <p>
            Based in Nairobi, Kenya, we noticed a gap in the market for jewellery that was simultaneously highly fashionable, expressive, and accessible. We wanted pieces that felt like they belonged on a moodboard, but could actually be worn every day.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
             <div className="bg-brand-pink/10 p-8 border border-brand-pink/20 rounded-sm">
                <h3 className="font-heading text-xl text-brand-dark mb-4">The Aesthetics</h3>
                <p className="text-sm">
                  Inspired by Y2K nostalgia, contemporary Afrofusion, soft feminine styles, and edgy gothic aesthetics, we curate pieces that help you express your current mood and elevate your daily style.
                </p>
             </div>
             <div className="bg-brand-gold/10 p-8 border border-brand-gold/20 rounded-sm">
                <h3 className="font-heading text-xl text-brand-dark mb-4">The Mission</h3>
                <p className="text-sm">
                  Our goal is to make discovering and purchasing beautiful fashion jewellery simple, fun, and reliable. We want you to feel effortlessly confident every time you put on an Illharlee piece.
                </p>
             </div>
          </div>

          <p className="text-center font-heading text-2xl text-brand-dark pt-8">
            Your style. Your mood. Your Illharlee. <Heart className="inline text-brand-pink-hot ml-1" size={24} />
          </p>
        </div>

        <div className="mt-20 text-center">
          <Link href="/shop" className="btn-primary">
            Explore the Shop <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
