import React from 'react';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";
import { Providers } from "./providers"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MILITARY STAR",
  description: "Created by AAFES web team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-[14px] bg-[#D3D3D3]`}
      >
        <Providers>
          <Navbar />         
          {children}
          <Footer />
        </Providers>
        
      </body>
    </html>
  );
}
