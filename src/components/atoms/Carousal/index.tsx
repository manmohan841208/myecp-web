// components/ui/Carousel.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import type { ReactNode } from 'react';

type CarouselImage = ReactNode | string;

type CarouselProps = {
  images: CarouselImage[];
  autoScroll?: boolean;
  interval?: number;
  className?: string;
  data?: any;
};

export default function Carousel({
  images,
  autoScroll = false,
  interval = 3000,
  className = '',
  data,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoScroll, interval, nextSlide]);

  return (
    <div className={clsx('relative w-full overflow-hidden', className)}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="banner-img !h-full w-full flex-shrink-0 rounded object-cover"
          >
            {data[index]?.PromotionLink ? (
              <a target="_blank" href={data[index]?.PromotionLink}>
                {img}
              </a>
            ) : (
              img
            )}
          </div>
        ))}
      </div>

      {/* Arrows icons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 z-20 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-3 opacity-20 shadow"
      >
        <ChevronLeft size={24} className="h-full w-full text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 z-20 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-3 opacity-20 shadow"
      >
        <ChevronRight size={24} className="h-full w-full text-white" />
      </button>

      {/* Bullets */}
      <div className="absolute top-95 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={clsx(
              'h-3 w-3 rounded-full border-1 border-gray-400',
              current === index ? 'bg-white' : 'bg-gray-400 opacity-40',
            )}
          />
        ))}
      </div>
    </div>
  );
}
