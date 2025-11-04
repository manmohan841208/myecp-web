import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import { Providers } from './providers';
import { AuthProvider } from '@/context/AuthProvider';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export const metadata: Metadata = {
  title: 'MILITARY STAR',
  description: 'Created by AAFES web team',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userAgentString = headersList.get('user-agent');

  const isFlutterApp =
    typeof userAgentString !== 'undefined' &&
    userAgentString?.includes('MMA-Mobile-Flutter-App');

  console.log('isFlutterApp', isFlutterApp, userAgentString);

  return (
    <html lang="en">
      <body className="font-arial flex min-h-screen flex-col bg-[#D3D3D3] text-[14px] antialiased">
        <AuthProvider>
          <Providers>
            {!isFlutterApp ? <Navbar /> : null}
            <main className="flex-grow">{children}</main>
            {!isFlutterApp ? (
              <div>
                <Footer />
              </div>
            ) : null}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
