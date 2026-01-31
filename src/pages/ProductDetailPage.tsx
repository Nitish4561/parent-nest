import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import RainbowButton from '../components/RainbowButton';

/** Format price for Indian Rupee (₹) */
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

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === productId);

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p className="empty-state">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/products" className="product-detail-back">
          View all recommended products
        </Link>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        fill={i < Math.floor(rating) ? '#FFB03B' : 'none'}
        color={i < rating ? '#FFB03B' : '#ddd'}
      />
    ));
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/products" className="product-detail-back">
          <ArrowLeft size={18} />
          Back to all products
        </Link>

        <motion.article
          className="product-detail-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="product-detail-image-wrap">
            <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-detail-rating">
              {renderStars(product.rating)}
              <span className="rating-value">{product.rating}</span>
            </div>
            <p className="product-detail-price">{formatPriceINR(product.price)}</p>
            <RainbowButton href={product.affiliateLink} variant="dark" size="lg">
              View on Amazon
            </RainbowButton>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
