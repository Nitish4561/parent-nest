import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FloatingCard({ children, className, delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={cn('transition-shadow duration-300', className)}
    >
      {children}
    </motion.div>
  );
}
