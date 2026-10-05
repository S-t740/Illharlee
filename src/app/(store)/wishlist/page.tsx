'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { items } = useWishlist();

  const wishlistedProducts = useMemo(() => {
    return products.filter(p => items.includes(p.id));
  }, [items]);

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-brand-pink-hot/20 rounded-full text-brand-pink-hot mb-6">
            <Heart size={28} fill="currentColor" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-brand-dark mb-3">Your Wishlist</h1>
          <p className="text-neutral-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12 bg-white border border-neutral-100 px-6">
            <p className="text-4xl mb-4">✨</p>
            <h3 className="font-heading text-xl mb-3">Your wishlist is empty</h3>
            <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
              Found something you love but not ready to buy? Save it here by tapping the heart icon on any product.
            </p>
            <Link href="/shop" className="btn-primary w-full justify-center">
              Discover Pieces
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
