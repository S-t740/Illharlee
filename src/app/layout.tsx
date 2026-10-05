import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${headingFont.variable}`}>
      <body className="font-body antialiased bg-brand-cream text-brand-dark min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
