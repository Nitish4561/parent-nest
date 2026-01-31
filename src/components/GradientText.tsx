import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface GradientTextProps {
  children: string;
  className?: string;
  colors?: string[];
}

export default function GradientText({ 
  children, 
  className,
  colors = ['#FF6B9D', '#4ECDC4', '#FFB03B']
}: GradientTextProps) {
  const gradient = `linear-gradient(135deg, ${colors.join(', ')})`;
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        'bg-clip-text text-transparent',
        className
      )}
      style={{
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </motion.span>
  );
}
