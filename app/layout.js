import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LaundryHeap - Professional Laundry Services',
  description: 'Your one-stop solution for all laundry needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}