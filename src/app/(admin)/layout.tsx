import React from 'react';
import AdminMobileNav from '@/components/admin/AdminMobileNav';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard - Illharlee',
  description: 'Illharlee Jewellery Admin Dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-50 text-brand-black">
      {/* Mobile Navigation */}
      <AdminMobileNav />

      <div className="min-h-screen flex">
        {/* Desktop Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen md:max-h-screen overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
