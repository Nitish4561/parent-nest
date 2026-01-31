import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { AmazonProduct } from '../types';

interface ProductCarouselProps {
  products: AmazonProduct[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    const gap = 32;
    const step = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    scrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <div className="product-carousel-wrap">
      <button
        type="button"
        className="carousel-btn carousel-btn-prev"
        onClick={() => scroll('left')}
        aria-label="Previous products"
      >
        <ChevronLeft size={24} />
      </button>
      <div ref={scrollRef} className="product-carousel">
        {products.map((product) => (
          <motion.div key={product.id} className="product-carousel-item">
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
      <button
        type="button"
        className="carousel-btn carousel-btn-next"
        onClick={() => scroll('right')}
        aria-label="Next products"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
