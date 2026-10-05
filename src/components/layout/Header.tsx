'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/new-drops', label: 'New Drops' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const shopDropdown = [
  { href: '/shop?category=necklaces', label: 'Necklaces' },
  { href: '/shop?category=earrings', label: 'Earrings' },
  { href: '/shop?category=rings', label: 'Rings' },
  { href: '/shop?category=bracelets', label: 'Bracelets' },
  { href: '/shop?category=anklets', label: 'Anklets' },
  { href: '/shop?category=jewellery-sets', label: 'Jewellery Sets' },
  { href: '/shop?category=body-jewellery', label: 'Body Jewellery' },
  { href: '/shop?category=statement-pieces', label: 'Statement Pieces' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopHover, setShopHover] = useState(false);
  const pathname = usePathname();
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const searchRef = useRef<HTMLInputElement>(null);
  const shopTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isHomepage = pathname === '/';
  const headerBg = scrolled || !isHomepage
    ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent';
  const textColor = scrolled || !isHomepage ? 'text-brand-dark' : 'text-white';
  const logoColor = scrolled || !isHomepage ? 'text-brand-black' : 'text-white';

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-black text-white text-center py-2 px-4 text-xs tracking-[0.15em] uppercase font-body">
        ✨ Free delivery on orders over KSh 3,000 ✨
      </div>

      <header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
        style={{ top: '32px' }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 ${textColor} transition-colors`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className={`font-heading text-xl lg:text-2xl font-bold tracking-[0.15em] uppercase ${logoColor} transition-colors`}>
                Illharlee
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.label === 'Shop') {
                      clearTimeout(shopTimeoutRef.current);
                      setShopHover(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.label === 'Shop') {
                      shopTimeoutRef.current = setTimeout(() => setShopHover(false), 200);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    className={`text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:text-brand-gold flex items-center gap-1 ${
                      isActive(link.href)
                        ? 'text-brand-gold font-medium'
                        : textColor
                    }`}
                  >
                    {link.label}
                    {link.label === 'Shop' && <ChevronDown size={14} />}
                  </Link>

                  {/* Shop Dropdown */}
                  {link.label === 'Shop' && shopHover && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl border border-neutral-100 animate-slide-down">
                      {shopDropdown.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-5 py-3 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-gold transition-colors tracking-wider"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 transition-colors ${textColor} hover:text-brand-gold`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className={`p-2 transition-colors relative ${textColor} hover:text-brand-gold`}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-pink-hot text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className={`p-2 transition-colors relative ${textColor} hover:text-brand-gold`}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-4 py-4 flex gap-3">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for gold necklace, Y2K, rings..."
                className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button type="submit" className="btn-primary px-6">
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-3 text-neutral-400 hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ top: '32px' }}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 bottom-0 w-80 bg-brand-cream overflow-y-auto animate-slide-down">
            <nav className="py-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-8 py-4 text-sm tracking-[0.15em] uppercase transition-colors ${
                    isActive(link.href)
                      ? 'text-brand-gold font-medium bg-brand-gold/5'
                      : 'text-brand-dark hover:text-brand-gold hover:bg-brand-gold/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="divider-gold mx-8 my-4" />

              <p className="px-8 py-2 text-xs tracking-[0.15em] uppercase text-neutral-400">Categories</p>
              {shopDropdown.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-8 py-3 text-sm text-neutral-600 hover:text-brand-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
