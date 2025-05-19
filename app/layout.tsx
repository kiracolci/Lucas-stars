'use client';

import './globals.css';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ReactNode } from 'react';
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const convex = new ConvexReactClient('https://intent-rooster-687.convex.cloud');

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={spaceMono.className}>
      <body className="bg-[#02142b] text-[#f5f5dc] font-mono min-h-screen antialiased">
        <ConvexProvider client={convex}>
          <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
            {children}
          </main>
        </ConvexProvider>
      </body>
    </html>
  );
}
