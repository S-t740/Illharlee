'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
  Tags,
  Sparkles,
  Grid,
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

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex-col hidden md:flex">
      <div className="p-6 border-b border-neutral-200">
        <Link href="/" className="font-heading text-2xl tracking-wider uppercase text-brand-black">
          Illharlee<span className="text-brand-gold">.</span>
        </Link>
        <p className="text-[10px] tracking-widest uppercase text-neutral-400 mt-2">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
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
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-neutral-100 text-brand-black font-medium'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-brand-black'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} /> Exit to Store
        </Link>
      </div>
    </aside>
  );
}
