'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, ProductVariation } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variation?: ProductVariation) => void;
  removeItem: (productId: string, variationId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variationId?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('illharlee-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem('illharlee-cart');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('illharlee-cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = useCallback((product: Product, quantity = 1, variation?: ProductVariation) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id &&
        item.selectedVariation?.id === variation?.id
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [...prev, { product, quantity, selectedVariation: variation }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variationId?: string) => {
    setItems(prev =>
      prev.filter(item =>
        !(item.product.id === productId && item.selectedVariation?.id === variationId)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variationId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variationId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedVariation?.id === variationId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.price + (item.selectedVariation?.priceModifier || 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
