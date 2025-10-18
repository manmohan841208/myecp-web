
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import Button from '@/components/atoms/Button/index'

type CarouselImage = ReactNode | string;

type CarouselProps = {
  images: CarouselImage[];
  autoScroll?: boolean;
  interval?: number;
  className?: string;
};

export default function Carousel({
  images,
  autoScroll = false,
  interval = 3000,
  className = '',
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  // const nextSlide = () => setCurrent((prev) => (prev + 1) % total)

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
    <div className={clsx('relative h-full w-full overflow-hidden', className)}>
      {/* Slides */}
      <div
        className="z-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="relative z-0 h-full w-full flex-shrink-0">
            <div className="relative z-0 flex h-full w-full items-center justify-center overflow-hidden rounded bg-black">
              {typeof img === 'string' ? (
                // If a string is passed, render it (could be an <img> tag or URL)
                // Wrap in img element to ensure sizing
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt={`slide-${index}`}
                  className="max-h-full max-w-full object-contain"
                />
              ) : // If it's a React element, try to inject sizing classes
              (img as any)?.props ? (
                // clone element and add sizing classes
                // preserve any existing className
                // eslint-disable-next-line react/no-children-prop
                (img as any).type ? (
                  // clone element with appended className
                  // Use React.cloneElement to preserve props
                  // but avoid importing React here again; use a simple approach
                  // by rendering the element and relying on caller to pass className
                  React.isValidElement(img as any) ? (
                    React.cloneElement(
                      img as React.ReactElement,
                      {
                        className: clsx(
                          (img as any).props?.className,
                          'max-h-full max-w-full object-contain',
                        ),
                      } as any,
                    )
                  ) : (
                    img
                  )
                ) : (
                  img
                )
              ) : (
                img
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Overlay container ensures controls are painted above transformed slides */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 2147483647 }}
      >
        <div className="pointer-events-auto absolute top-1/2 left-2 -translate-y-1/2">
          {/* <button
// style={{ zIndex: 2147483647 }}
          >
          </button> */}
          <Button
            onClick={prevSlide}
            className="rounded-full bg-black/40 p-2 text-white shadow hover:bg-black/60 opacity-50 h-10 w-10 "
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </Button>
        </div>
        <div className="pointer-events-auto absolute top-1/2 right-2 -translate-y-1/2">
          {/* <button
            onClick={nextSlide}
            style={{ zIndex: 2147483647 }}
            className="rounded-full bg-black/40 p-2 text-white shadow hover:bg-black/60"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button> */}
          <Button
            onClick={nextSlide}
            className="rounded-full bg-black/40 p-2 text-white shadow hover:bg-black/60 opacity-50 h-10 w-10"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="pointer-events-auto absolute bottom-[20px] left-1/2 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={clsx(
                'h-3 w-3 rounded-full',
                current === index ? 'bg-white' : 'bg-[#7D7D7D7A]',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
