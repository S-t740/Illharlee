'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon = ({ size = 24, className = '' }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const footerLinks = {
  shop: [
    { href: '/shop?category=necklaces', label: 'Necklaces' },
    { href: '/shop?category=earrings', label: 'Earrings' },
    { href: '/shop?category=rings', label: 'Rings' },
    { href: '/shop?category=bracelets', label: 'Bracelets' },
    { href: '/shop?category=anklets', label: 'Anklets' },
    { href: '/shop?category=jewellery-sets', label: 'Jewellery Sets' },
    { href: '/shop', label: 'View All' },
  ],
  collections: [
    { href: '/collections/y2k', label: 'Y2K' },
    { href: '/collections/afrofusion', label: 'Afrofusion' },
    { href: '/collections/clean-style', label: 'Clean Style' },
    { href: '/collections/midnight-muse', label: 'Midnight Muse' },
    { href: '/collections/soft-style', label: 'Soft Style' },
  ],
  info: [
    { href: '/about', label: 'About Illharlee' },
    { href: '/shipping', label: 'Shipping & Delivery' },
    { href: '/returns', label: 'Returns & Exchanges' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
};

import TestimonialsSection from '@/components/store/TestimonialsSection';

export default function Footer() {
  return (
    <>
      <TestimonialsSection />
      {/* ============ NEWSLETTER / WHATSAPP SIGNUP ============ */}
      <section className="section-padding bg-gradient-to-br from-brand-cream via-brand-pink/10 to-brand-cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-dark mb-4">
            Never miss a drop ♡
          </h2>
          <p className="text-neutral-500 text-sm mb-8">
            Join the Illharlee family for exclusive first access to new drops, special offers, and styling tips.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white border border-neutral-200 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Join Now
            </button>
          </form>

          <p className="text-xs text-neutral-400">
            Or chat with us on{' '}
            <a
              href="https://wa.me/254705937030"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline"
            >
              WhatsApp 💬
            </a>
          </p>
        </div>
      </section>
      <footer className="bg-brand-black text-white">
        {/* ============ INSTAGRAM / SOCIAL CTA ============ */}
        <div className="border-b border-white/10 py-12 lg:py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 lg:px-8">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-3">Follow Us</p>
            <h2 className="font-heading text-3xl md:text-4xl mb-4">@ill.harlee_jewellery</h2>
            <p className="text-neutral-400 mb-8 text-sm">
              Follow us on Instagram and TikTok for styling inspo, new drops and behind-the-scenes content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/ill.harlee_jewellery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Follow on Instagram
              </a>
              <a
                href="https://www.tiktok.com/@ill.harlee_jewelery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black"
              >
                Follow on TikTok
              </a>
            </div>
          </div>
        </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-heading text-xl tracking-[0.15em] uppercase mb-4">Illharlee</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Jewelry redefined as presence. Born from a love for fashion, self-expression and all things beautiful.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ill.harlee_jewellery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@ill.harlee_jewelery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/254705937030"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-4 font-semibold">Collections</h4>
            <ul className="space-y-2.5">
              {footerLinks.collections.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-brand-gold mb-4 font-semibold">Information</h4>
            <ul className="space-y-2.5">
              {footerLinks.info.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <a href="mailto:hello@illharlee.co.ke" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                <Mail size={14} /> hello@illharlee.co.ke
              </a>
              <p className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin size={14} /> Nairobi, Kenya 🇰🇪
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © 2026 Illharlee Jewellery. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>🇰🇪 Made in Kenya</span>
            <span>•</span>
            <span>Prices in KSh</span>
            <span>•</span>
            <span>M-Pesa Accepted</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
