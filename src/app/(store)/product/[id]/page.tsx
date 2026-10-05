'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { supabase } from '@/lib/supabase';
import { formatPrice, getInventoryStatus } from '@/data';
import {
  Heart, ShoppingBag, Minus, Plus, Share2, ArrowLeft,
  Truck, Shield, RotateCcw, ChevronRight, CheckCircle2, Zap
} from 'lucide-react';
import type { ProductVariation } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) {
        setProduct(data);
        if (data.variations?.length) {
          setSelectedVariation(data.variations[0]);
        }
        
        // Fetch related products
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(4);
        if (related) setRelatedProducts(related);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="pt-32 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">💎</p>
          <h1 className="font-heading text-2xl mb-2">Product not found</h1>
          <p className="text-neutral-500 text-sm mb-6">This piece might have found a new home.</p>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const status = getInventoryStatus(product);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariation);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariation);
    window.location.href = '/checkout';
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} from Illharlee Jewellery!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-brand-gold transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight size={12} />
          <span className="text-brand-dark">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square bg-white border border-neutral-100 relative overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_new && <span className="badge badge-new">New</span>}
                {product.is_bestseller && <span className="badge badge-bestseller">Bestseller</span>}
                {product.stock === 0 && <span className="badge badge-sold-out">Sold Out</span>}
                {product.stock > 0 && product.stock <= (product.low_stock_threshold || 5) && <span className="badge badge-low-stock">Low Stock</span>}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 bg-white border-2 transition-all overflow-hidden ${
                      i === selectedImage ? 'border-brand-gold' : 'border-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    <img
                      src={product.images[i]}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">

            <h1 className="font-heading text-3xl lg:text-4xl text-brand-dark mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-semibold text-brand-dark">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                  <span className="badge badge-sale">
                    Save {formatPrice(product.compare_at_price - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            <p className="text-neutral-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="mb-6">
              {status === 'in-stock' && (
                <span className="inline-flex items-center gap-2 text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full" /> In Stock
                </span>
              )}
              {status === 'low-stock' && (
                <span className="inline-flex items-center gap-2 text-sm text-amber-600">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" /> Only {product.stock} left — order soon!
                </span>
              )}
              {status === 'sold-out' && (
                <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full" /> Sold Out
                </span>
              )}
            </div>

            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-3">
                  {product.variations[0].type === 'color' ? 'Colour' : 'Style'}
                  {selectedVariation && (
                    <span className="text-neutral-500 font-normal ml-2">— {selectedVariation.name}</span>
                  )}
                </h3>
                <div className="flex gap-3">
                  {product.variations.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariation(v)}
                      className={`transition-all ${
                        v.type === 'color'
                          ? `w-10 h-10 rounded-full border-2 ${selectedVariation?.id === v.id ? 'border-brand-gold scale-110 shadow-md' : 'border-neutral-200 hover:border-neutral-400'}`
                          : `px-4 py-2 text-sm border ${selectedVariation?.id === v.id ? 'border-brand-gold bg-brand-gold/10 text-brand-gold-dark' : 'border-neutral-200 hover:border-brand-gold'}`
                      }`}
                      style={v.type === 'color' ? { backgroundColor: v.value } : undefined}
                      title={v.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Actions */}
            {status !== 'sold-out' && (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-xs tracking-[0.2em] uppercase font-semibold">Quantity</h3>
                  <div className="flex items-center border border-neutral-200">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3 hover:bg-neutral-50 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-5 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="p-3 hover:bg-neutral-50 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                      addedToCart
                        ? 'bg-green-600 text-white border border-green-600'
                        : 'btn-primary'
                    }`}
                  >
                    {addedToCart ? (
                      <>✓ Added to Bag</>
                    ) : (
                      <><ShoppingBag size={16} /> Add to Bag — {formatPrice(product.price * quantity)}</>
                    )}
                  </button>
                  <button onClick={handleBuyNow} className="btn-gold flex-1 py-4">
                    <Zap size={16} /> Buy Now
                  </button>
                </div>
              </>
            )}

            {status === 'sold-out' && (
              <div className="mb-6">
                <button className="btn-secondary w-full py-4">
                  <Heart size={16} /> Notify Me When Available
                </button>
              </div>
            )}

            {/* Wishlist + Share */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => toggleItem(product.id)}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  wishlisted ? 'text-brand-pink-hot' : 'text-neutral-500 hover:text-brand-pink-hot'
                }`}
              >
                <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-dark transition-colors"
              >
                <Share2 size={16} /> Share
              </button>
            </div>

            <div className="divider-gold mb-8" />

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-2">Materials</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  {product.materials?.map((m: string, i: number) => (
                    <li key={i}>• {m}</li>
                  )) || <li>• Premium materials</li>}
                </ul>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-2">Care Instructions</h3>
                <p className="text-sm text-neutral-600">{product.careInstructions || 'Wipe with a soft cloth to maintain shine.'}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-3 bg-neutral-50">
                  <Truck size={20} className="mx-auto mb-2 text-brand-gold" />
                  <p className="text-xs text-neutral-600">3–7 Days Delivery</p>
                </div>
                <div className="text-center p-3 bg-neutral-50">
                  <Shield size={20} className="mx-auto mb-2 text-brand-gold" />
                  <p className="text-xs text-neutral-600">Secure Payment</p>
                </div>
                <div className="text-center p-3 bg-neutral-50">
                  <CheckCircle2 size={20} className="mx-auto mb-2 text-brand-gold" />
                  <p className="text-xs text-neutral-600">Quality Checked</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="divider-gold mb-12" />
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-3">You Might Also Love</p>
              <h2 className="font-heading text-3xl text-brand-dark">Related Pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
