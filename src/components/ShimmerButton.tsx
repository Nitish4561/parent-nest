import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '../lib/utils';

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  onClick?: () => void;
  href?: string;
}

export default function ShimmerButton({ 
  children, 
  className, 
  shimmerColor: _shimmerColor = '#ffffff', 
  onClick,
  href 
}: ShimmerButtonProps) {
  const buttonContent = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative overflow-hidden rounded-lg px-6 py-3 font-semibold text-white',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer',
        'before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
