'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import type { Category, SortOption } from '@/types';
import { supabase } from '@/lib/supabase';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'bestselling', label: 'Bestselling' },
];

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under KSh 500', min: 0, max: 500 },
  { label: 'Under KSh 1,000', min: 0, max: 1000 },
  { label: 'Under KSh 1,500', min: 0, max: 1500 },
  { label: 'KSh 1,500+', min: 1500, max: Infinity },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = (searchParams.get('sort') as SortOption) || 'featured';

  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: prodData } = await supabase.from('products').select('*');
      if (prodData) setDbProducts(prodData);
      
      const { data: catData } = await supabase.from('categories').select('*');
      if (catData) setCategories(catData);
      
      setLoading(false);
    }
    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = dbProducts;

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price
    const range = priceRanges[selectedPriceRange];
    result = result.filter(p => p.price >= range.min && p.price <= range.max);

    // New arrivals
    if (showNewOnly) {
      result = result.filter(p => p.is_new);
    }

    // Bestsellers
    if (showBestsellersOnly) {
      result = result.filter(p => p.is_bestseller);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bestselling':
        result.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
        break;
    }

    return result;
  }, [dbProducts, selectedCategory, selectedPriceRange, sortBy, searchQuery, showNewOnly, showBestsellersOnly]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedPriceRange !== 0,
    showNewOnly,
    showBestsellersOnly,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange(0);
    setShowNewOnly(false);
    setShowBestsellersOnly(false);
    setSearchQuery('');
  };

  const getCategoryLabel = () => {
    if (selectedCategory === 'all') return 'All Jewellery';
    return categories.find(c => c.slug === selectedCategory)?.name || 'Shop';
  };

  return (
    <div className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
      {/* Page Header */}
      <div className="bg-brand-black text-white py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-3">Shop</p>
          <h1 className="font-heading text-3xl md:text-5xl mb-3">{getCategoryLabel()}</h1>
          <p className="text-neutral-400 text-sm">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase border transition-all ${
                showFilters ? 'bg-brand-black text-white border-brand-black' : 'bg-white border-neutral-200 hover:border-brand-gold'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-brand-gold text-brand-black rounded-full text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-neutral-500 hover:text-brand-dark transition-colors"
              >
                <X size={14} /> Clear all
              </button>
            )}

            {/* Active filter tags */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-gold/10 text-brand-gold-dark text-xs tracking-wider">
                {categories.find(c => c.slug === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory('all')}><X size={12} /></button>
              </span>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-neutral-200 px-4 py-2.5 pr-10 text-xs tracking-wider uppercase focus:outline-none focus:border-brand-gold cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" />
          </div>
        </div>

        {/* Search bar */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-white border border-neutral-100">
            <div className="flex items-center justify-between">
              <p className="text-sm">
                Search results for: <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
              </p>
              <button onClick={() => setSearchQuery('')} className="text-xs text-neutral-500 hover:text-brand-dark">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0 hidden lg:block space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                      selectedCategory === 'all' ? 'bg-brand-gold/10 text-brand-gold-dark font-medium' : 'hover:bg-neutral-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.slug ? 'bg-brand-gold/10 text-brand-gold-dark font-medium' : 'hover:bg-neutral-50'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPriceRange(i)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedPriceRange === i ? 'bg-brand-gold/10 text-brand-gold-dark font-medium' : 'hover:bg-neutral-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick filters */}
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4">Quick Filters</h3>
                <label className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={showNewOnly}
                    onChange={e => setShowNewOnly(e.target.checked)}
                    className="accent-brand-gold"
                  />
                  <span className="text-sm">New Arrivals</span>
                </label>
                <label className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={showBestsellersOnly}
                    onChange={e => setShowBestsellersOnly(e.target.checked)}
                    className="accent-brand-gold"
                  />
                  <span className="text-sm">Bestsellers</span>
                </label>
              </div>
            </aside>
          )}

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-brand-cream max-h-[80vh] overflow-y-auto rounded-t-2xl animate-slide-up">
                <div className="sticky top-0 bg-brand-cream px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                  <h3 className="font-heading text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                </div>
                <div className="px-6 py-6 space-y-6">
                  {/* Categories */}
                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-3">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-1.5 text-xs border transition-all ${
                          selectedCategory === 'all' ? 'bg-brand-black text-white border-brand-black' : 'border-neutral-200 hover:border-brand-gold'
                        }`}
                      >
                        All
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat.slug}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`px-3 py-1.5 text-xs border transition-all ${
                            selectedCategory === cat.slug ? 'bg-brand-black text-white border-brand-black' : 'border-neutral-200 hover:border-brand-gold'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-3">Price</h4>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((range, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedPriceRange(i)}
                          className={`px-3 py-1.5 text-xs border transition-all ${
                            selectedPriceRange === i ? 'bg-brand-black text-white border-brand-black' : 'border-neutral-200 hover:border-brand-gold'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="btn-primary w-full"
                  >
                    Show {filteredProducts.length} Products
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">😢</p>
                <h3 className="font-heading text-xl mb-2">No products found</h3>
                <p className="text-sm text-neutral-500 mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <button onClick={clearFilters} className="btn-secondary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
