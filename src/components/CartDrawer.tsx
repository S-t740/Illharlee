'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, itemCount, subtotal, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-brand-cream shadow-2xl flex flex-col animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <h2 className="font-heading text-lg">Your Bag ({itemCount})</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:text-brand-gold transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-neutral-300 mb-4" />
              <p className="font-heading text-lg mb-2">Your bag is empty</p>
              <p className="text-sm text-neutral-500 mb-6">
                Time to treat yourself ♡
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                <Link href="/shop">Start Shopping</Link>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedVariation?.id || index}`}
                  className="flex gap-4 p-3 bg-white border border-neutral-100"
                >
                  <div className="w-20 h-20 bg-neutral-100 flex-shrink-0 relative overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {item.selectedVariation.name}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-brand-gold mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariation?.id)}
                          className="p-1.5 hover:bg-neutral-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariation?.id)}
                          className="p-1.5 hover:bg-neutral-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedVariation?.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-neutral-400">
              Delivery calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-center block"
            >
              Checkout — {formatPrice(subtotal)}
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="btn-secondary w-full text-center block"
            >
              View Bag
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
