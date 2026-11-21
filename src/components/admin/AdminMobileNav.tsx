'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
  Tags,
  Sparkles,
  Grid,
  Menu,
  X,
} from 'lucide-react';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/collections', label: 'Collections', icon: Grid },
  { href: '/admin/merchandising', label: 'Merchandising', icon: Sparkles },
  { href: '/admin/feedback', label: 'Feedback', icon: Settings },
];

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useAuth();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    router.push('/admin/login');
  };

  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-neutral-200 px-4 py-3">
        <Link href="/" className="font-heading text-xl tracking-wider uppercase text-brand-black">
          Illharlee<span className="text-brand-gold">.</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-widest uppercase text-neutral-400">Admin</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          style={{ top: '57px' }}
        />
      )}

      {/* Slide-down Nav Panel */}
      <div
        className={`fixed left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[calc(100vh-57px)] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ top: '57px' }}
      >
        <nav className="p-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-neutral-100 text-brand-black font-medium'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-brand-black active:bg-neutral-100'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 pt-0 border-t border-neutral-100 mt-1">
          {user && (
            <p className="text-[10px] text-neutral-400 truncate px-4 py-2">
              {user.email}
            </p>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3.5 w-full rounded-lg text-sm text-neutral-600 hover:bg-red-50 hover:text-red-600 active:bg-red-100 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
