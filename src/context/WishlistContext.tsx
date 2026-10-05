'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface WishlistContextType {
  items: string[]; // product IDs
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('illharlee-wishlist');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem('illharlee-wishlist');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('illharlee-wishlist', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = useCallback((productId: string) => {
    setItems(prev => prev.includes(productId) ? prev : [...prev, productId]);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(id => id !== productId));
  }, []);

  const toggleItem = useCallback((productId: string) => {
    setItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return items.includes(productId);
  }, [items]);

  return (
    <WishlistContext.Provider
      value={{ items, addItem, removeItem, toggleItem, isWishlisted, itemCount: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
