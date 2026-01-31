import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export default function ProductsPage() {
  const { products, loading } = useProducts();

  return (
    <div className="products-page">
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="section-title">Recommended Products</h1>
            <p className="section-subtitle">
              Carefully curated essentials for your parenting journey. Find what you need, then shop on Amazon.
            </p>
          </motion.div>

          {loading ? (
            <p className="empty-state">Loading products...</p>
          ) : products.length > 0 ? (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <p className="empty-state">No products yet. Check back soon!</p>
          )}
        </div>
      </section>
    </div>
  );
}
