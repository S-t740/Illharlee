'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl tracking-wider uppercase text-brand-black">
            Illharlee<span className="text-brand-gold">.</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mt-2">
            Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-neutral-100 rounded-full">
              <Lock size={20} className="text-neutral-500" />
            </div>
          </div>

          <h2 className="text-center font-semibold text-lg mb-1">Welcome back</h2>
          <p className="text-center text-neutral-500 text-sm mb-6">
            Sign in to access the admin dashboard
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@illharlee.com"
                className="w-full border border-neutral-200 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-neutral-200 px-4 py-3 pr-12 text-sm rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-black text-white py-3 text-sm tracking-widest uppercase hover:bg-brand-gold hover:text-brand-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-neutral-400 text-xs mt-6">
          Protected area. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
