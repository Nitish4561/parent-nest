import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ShimmerButton from './ShimmerButton';
import type { AmazonProduct } from '../types';

interface ProductCardProps {
  product: AmazonProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? '#FFB03B' : 'none'}
        color={i < rating ? '#FFB03B' : '#ddd'}
      />
    ));
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="product-image-wrapper">
        <motion.img 
          src={product.imageUrl} 
          alt={product.name}
          className="product-image"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="product-badge"
          whileHover={{ scale: 1.1 }}
        >
          Amazon Choice
        </motion.div>
      </div>
      
      <div className="product-content">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="rating-value">{product.rating}</span>
        </div>
        
        <div className="product-footer">
          <motion.span
            className="product-price"
            whileHover={{ scale: 1.1 }}
          >
            {product.price}
          </motion.span>
          <ShimmerButton
            href={product.affiliateLink}
            className="bg-[#FF6B9D] hover:bg-[#FF4D82]"
          >
            <ExternalLink size={14} className="inline mr-1" />
            View on Amazon
          </ShimmerButton>
        </div>
      </div>
    </motion.div>
  );
}
