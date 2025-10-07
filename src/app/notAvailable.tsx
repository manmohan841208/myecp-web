'use client'

import React, { useEffect } from "react";

interface NotAvailableProps {
  title?: string;
}

export default function NotAvailable({ title = "Coming Soon" }: NotAvailableProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4">🚧 {title}</h1>
        <p className="text-lg text-gray-300">
          We&apos;re working hard to bring something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
}