'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminMobileNav from '@/components/admin/AdminMobileNav';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page gets its own full-screen layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminAuthGuard>
        <AdminShell>{children}</AdminShell>
      </AdminAuthGuard>
    </AuthProvider>
  );
}
