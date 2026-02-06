import React from 'react';
import { cn } from '../lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  reverse = false,
  pauseOnHover = false,
  className,
  speed = 20,
}) => {
  return (
    <div
      className={cn(
        'group flex overflow-hidden',
        className
      )}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
      }}
    >
      <div
        className={cn(
          'flex shrink-0 animate-marquee items-center justify-around gap-4',
          reverse && 'animate-marquee-reverse',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex shrink-0 animate-marquee items-center justify-around gap-4',
          reverse && 'animate-marquee-reverse',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
};