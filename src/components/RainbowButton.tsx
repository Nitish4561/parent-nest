import { type ReactNode } from 'react';
import { cn } from '../lib/utils';

interface RainbowButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: 'default' | 'outline' | 'dark';
  size?: 'default' | 'sm' | 'lg';
}

export default function RainbowButton({
  children,
  className,
  href,
  variant = 'default',
  size = 'default',
}: RainbowButtonProps) {
  const baseClasses = 'rainbow-button relative cursor-pointer group transition-all inline-flex items-center justify-center gap-2 shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const sizeClasses = {
    default: 'h-9 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-11 px-6 text-base',
  };
  const variantClasses = {
    default: 'rainbow-button-default',
    outline: 'rainbow-button-outline',
    dark: 'rainbow-button-dark',
  };

  const combinedClassName = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={combinedClassName}>
      {children}
    </button>
  );
}
