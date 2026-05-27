import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skorypto - Crypto Trading & Analytics',
  description: 'High-performance Web3 crypto-future trading dashboard, blending professional-grade financial tooling with a futuristic electric glassmorphism aesthetic.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
