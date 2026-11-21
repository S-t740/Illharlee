'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [user, loading, pathname, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-neutral-300 border-t-brand-gold rounded-full animate-spin mb-4" />
          <p className="text-neutral-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Login page — render without guard
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Not authenticated — show nothing while redirecting
  if (!user) {
    return null;
  }

  // Authenticated — render admin content
  return <>{children}</>;
}
