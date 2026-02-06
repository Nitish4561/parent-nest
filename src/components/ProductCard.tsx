import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import RainbowButton from './RainbowButton';
import type { AmazonProduct } from '../types';

interface ProductCardProps {
  product: AmazonProduct;
}

/** Format price for Indian Rupee (₹) with Indian number formatting */
function formatPriceINR(price: string): string {
  if (!price || typeof price !== 'string') return '₹0';
  const numeric = price.replace(/[^\d.]/g, '');
  const num = parseFloat(numeric);
  if (Number.isNaN(num)) return price.startsWith('₹') ? price : `₹${price}`;
  const hasDecimals = numeric.includes('.');
  const formatted = num.toLocaleString('en-IN', {
    maximumFractionDigits: hasDecimals ? 2 : 0,
    minimumFractionDigits: hasDecimals ? 2 : 0,
  });
  return `₹${formatted}`;
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const fraction = rating % 1;
    const hasPartialStar = fraction > 0;
    const partialFill = fraction;

    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) {
        return <Star key={i} size={16} fill="#FFB03B" color="#FFB03B" />;
      }
      if (i === fullStars && hasPartialStar) {
        return (
          <span key={i} className="star-half-wrapper" title={`${rating}`}>
            <Star size={16} fill="none" color="#ddd" />
            <span className="star-half-fill" style={{ width: `${partialFill * 100}%` }}>
              <Star size={16} fill="#FFB03B" color="#FFB03B" />
            </span>
          </span>
        );
      }
      return <Star key={i} size={16} fill="none" color="#ddd" />;
    });
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
        <h4 className="product-name">
          <Link
            to={`/product/${product.id}`}
            className="product-name-link"
            title={product.name}
          >
            {product.name}
          </Link>
        </h4>

        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="rating-value">{product.rating}</span>
        </div>
        
        <div className="product-footer">
          <div className="product-footer-row">
            <motion.span
              className="product-price"
              whileHover={{ scale: 1.1 }}
            >
              {formatPriceINR(product.price)}<sup className="text-red-500">*</sup>
            </motion.span>
            <RainbowButton href={product.affiliateLink} variant="dark" size="sm" className="font-family-inter">
              Shop on Amazon
            </RainbowButton>
          </div>
          <p className="product-price-note">
            <sup className='text-red-500'></sup>Actual price may differ on Amazon, as it&apos;s dependent on discounts and availability.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
