'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();
  const deliveryEstimate = 300; // Mock delivery for display before checkout

  if (items.length === 0) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream flex flex-col items-center justify-center">
        <div className="text-center px-4 max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white border border-neutral-200 rounded-full text-neutral-300 mb-6">
            <ShoppingBag size={32} />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-brand-dark mb-4">Your bag is empty</h1>
          <p className="text-neutral-500 mb-8">
            Looks like you haven't added anything to your bag yet. Let's fix that!
          </p>
          <Link href="/shop" className="btn-primary w-full justify-center">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <h1 className="font-heading text-3xl md:text-4xl text-brand-dark mb-8">Your Bag ({itemCount})</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white border border-neutral-200">
              {/* Header - Desktop only */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-neutral-200 text-xs tracking-wider uppercase font-semibold text-neutral-500 bg-neutral-50">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {/* Items list */}
              <div className="divide-y divide-neutral-100">
                {items.map((item, index) => {
                  const itemPrice = item.product.price + (item.selectedVariation?.priceModifier || 0);
                  const itemTotal = itemPrice * item.quantity;
                  const keyId = `${item.product.id}-${item.selectedVariation?.id || index}`;

                  return (
                    <div key={keyId} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="sm:col-span-6 flex gap-4">
                        <Link href={`/product/${item.product.slug}`} className="block w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-neutral-100 border border-neutral-100 relative overflow-hidden">
                          <img src={item.product.images[0]} alt={item.product.name} className="absolute inset-0 w-full h-full object-cover" />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <Link href={`/product/${item.product.slug}`} className="text-sm sm:text-base font-medium text-brand-dark hover:text-brand-gold transition-colors line-clamp-2 mb-1">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-brand-gold font-semibold mb-2">
                            {formatPrice(itemPrice)}
                          </p>
                          {item.selectedVariation && (
                            <p className="text-xs text-neutral-500 bg-neutral-50 inline-block px-2 py-1 border border-neutral-200 self-start">
                              {item.selectedVariation.type === 'color' ? 'Color' : 'Style'}: {item.selectedVariation.name}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Actions - Mobile layout splits these */}
                      <div className="sm:col-span-6 flex items-center justify-between sm:grid sm:grid-cols-6 sm:gap-4 w-full">
                        <div className="sm:col-span-3 flex items-center justify-center">
                          <div className="flex items-center border border-neutral-200 bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariation?.id)}
                              className="p-2 hover:bg-neutral-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-4 text-sm font-medium min-w-[2.5rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariation?.id)}
                              className="p-2 hover:bg-neutral-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="sm:col-span-3 flex items-center justify-end gap-4">
                          <span className="font-semibold text-brand-dark hidden sm:block">
                            {formatPrice(itemTotal)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedVariation?.id)}
                            className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Link href="/shop" className="text-sm font-medium text-brand-dark hover:text-brand-gold flex items-center gap-2 transition-colors">
                <ArrowRight size={16} className="rotate-180" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white border border-neutral-200 p-6 sticky top-24">
              <h2 className="font-heading text-xl mb-6 border-b border-neutral-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 pb-4 border-b border-neutral-100">
                  <span>Estimated Delivery</span>
                  <span>{formatPrice(deliveryEstimate)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-brand-dark pt-2">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + deliveryEstimate)}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                Delivery fees are estimated. Final delivery costs will be calculated at checkout based on your location.
              </p>

              <Link href="/checkout" className="btn-primary w-full justify-center py-4 text-sm mb-4">
                Proceed to Checkout
              </Link>

              <div className="flex items-center justify-center gap-4 text-neutral-400">
                <div className="flex items-center gap-1 text-xs"><span className="text-brand-gold">✓</span> Secure Checkout</div>
                <div className="flex items-center gap-1 text-xs"><span className="text-brand-gold">✓</span> Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
