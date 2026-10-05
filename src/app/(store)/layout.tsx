import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond } from 'next/font/google';
import '../globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/CartDrawer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading-brand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Illharlee Jewellery — Jewelry Redefined as Presence',
  description:
    'Discover stylish, affordable jewellery inspired by Y2K, Afrofusion, feminine, gothic and contemporary Kenyan fashion aesthetics. Shop necklaces, earrings, rings, bracelets and more.',
  keywords: [
    'Illharlee',
    'jewellery',
    'jewelry',
    'Kenya',
    'Nairobi',
    'Y2K',
    'Afrofusion',
    'affordable jewellery',
    'necklaces',
    'earrings',
    'rings',
    'bracelets',
  ],
  openGraph: {
    title: 'Illharlee Jewellery — Jewelry Redefined as Presence',
    description: 'Stylish, affordable jewellery for every version of you. Shop the latest drops.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Illharlee Jewellery',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${headingFont.variable}`}>
      <body className="font-body antialiased bg-brand-cream text-brand-dark min-h-screen flex flex-col">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
