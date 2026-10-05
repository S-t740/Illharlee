'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { formatPrice, getInventoryStatus } from '@/data';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const status = getInventoryStatus(product);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group product-card-hover relative">
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-neutral-100 ${variant === 'compact' ? 'aspect-square' : 'aspect-[3/4]'}`}>
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
        
        {/* Image */}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 pointer-events-none" />

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          {status !== 'sold-out' && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product, 1, product.variations ? product.variations[0] : undefined);
              }}
              className="flex-1 bg-brand-black text-white py-2.5 text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-brand-gold hover:text-brand-black transition-colors"
            >
              <ShoppingBag size={14} /> Add to Bag
            </button>
          )}
          <Link
            href={`/product/${product.id}`}
            className="bg-white text-brand-black p-2.5 hover:bg-brand-cream transition-colors"
          >
            <Eye size={14} />
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          {product.is_new && <span className="badge badge-new">New</span>}
          {product.is_bestseller && <span className="badge badge-bestseller">Bestseller</span>}
          {product.stock === 0 && <span className="badge badge-sold-out">Sold Out</span>}
          {product.stock > 0 && product.stock <= (product.low_stock_threshold || 5) && <span className="badge badge-low-stock">Low Stock</span>}
        </div>
      </div>

      {/* Wishlist button */}
      <button
        onClick={() => toggleItem(product.id)}
        className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-300 z-30 ${
          wishlisted
            ? 'text-brand-pink-hot bg-white/90 shadow-sm'
            : 'text-neutral-400 bg-white/70 opacity-0 group-hover:opacity-100'
        }`}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Info */}
      <div className="mt-3 px-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-brand-dark group-hover:text-brand-gold transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {variant !== 'compact' && (
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-brand-dark">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
        {/* Color swatches */}
        {product.variations?.filter((v: any) => v.type === 'color').length > 1 && (
          <div className="flex gap-1.5 mt-2">
            {product.variations
              .filter((v: any) => v.type === 'color')
              .map((v: any) => (
                <span
                  key={v.id}
                  className="w-4 h-4 rounded-full border border-neutral-200"
                  style={{ backgroundColor: v.value }}
                  title={v.name}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
