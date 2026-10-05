import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut, Tags, Sparkles, Grid } from 'lucide-react';
import '../globals.css';

export const metadata = {
  title: 'Admin Dashboard - Illharlee',
  description: 'Illharlee Jewellery Admin Dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-body bg-neutral-50 text-brand-black">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col hidden md:flex">
            <div className="p-6 border-b border-neutral-200">
              <Link href="/" className="font-heading text-2xl tracking-wider uppercase text-brand-black">
                Illharlee<span className="text-brand-gold">.</span>
              </Link>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 mt-2">Admin Panel</p>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2">
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-black transition-colors">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-black transition-colors">
                <ShoppingBag size={18} /> Orders
              </Link>
              <Link href="/admin/inventory" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-black transition-colors">
                <Package size={18} /> Inventory
              </Link>
              <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-black transition-colors">
                <Tags size={18} /> Categories
              </Link>
              <Link href="/admin/collections" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-black transition-colors">
                <Grid size={18} /> Collections
              </Link>
              <Link href="/admin/merchandising" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-black transition-colors">
                <Sparkles size={18} /> Merchandising
              </Link>
              <Link href="/admin/feedback" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-black transition-colors">
                <Settings size={18} /> Feedback
              </Link>
            </nav>

            <div className="p-4 border-t border-neutral-200">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors">
                <LogOut size={18} /> Exit to Store
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
