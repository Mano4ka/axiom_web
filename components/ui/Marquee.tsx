'use client';

import FastMarquee from 'react-fast-marquee';
import { useRef, useState, useEffect } from 'react';

type MarqueeProps = {
  imageSrc?: string;
  imageSrcs?: string[];
  count?: number;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  imgClassName?: string;
  direction?: 'left' | 'right';
};

export const Marquee = ({ imageSrc, imageSrcs = [], count = 0, speed = 50, pauseOnHover = true, className = '', imgClassName = '', direction = 'left'}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const isSingleImage = !!imageSrc && imageSrcs.length === 0;
  const items = isSingleImage ? [imageSrc] : imageSrcs;

  if (items.length === 0) return null;

  if (isSingleImage && count === 0) {
    return (
      <div className={`relative w-full overflow-hidden bg-[#1C1C1C] ${className}`}>
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#1C1C1C] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#1C1C1C] to-transparent" />

        <FastMarquee speed={speed} pauseOnHover={pauseOnHover} loop={0} autoFill={true} gradient={false} className="flex items-center">
          <img src={imageSrc} alt="Marquee item" className={`mx-10 object-cover ${imgClassName}`}/>
        </FastMarquee>
      </div>
    );
  }

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const estimatedItemWidth = 100;
  const itemsPerScreen = Math.ceil(containerWidth / estimatedItemWidth);
  const minCopies = Math.max(3, itemsPerScreen * 2); 

  const repeatedItems = Array(minCopies)
    .fill(null)
    .flatMap((_, i) => items.map((src, j) => ({ src, key: `${i}-${j}-${src}`})));

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      <FastMarquee speed={speed} pauseOnHover={pauseOnHover} loop={0} autoFill={false} gradient={false} direction={direction} className="flex items-center" style={{ gap: '20px' }}>
        {repeatedItems.map(({ src, key }) => (
          <img key={key} src={src} alt="Marquee item" className={`mx-3 rounded-[12px] w-[300px] object-cover shadow-[5px_6px_9.5px_2px_rgba(0,0,0,0.63)] shadow-inner-[3px_3px_7.4px_rgba(0,0,0,0.55)] ${imgClassName}`} style={{ minWidth: 'auto' }}/>
        ))}
      </FastMarquee>
    </div>
  );
};