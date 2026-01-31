import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import AnimatedSection from '../components/AnimatedSection';
import { categories } from '../data/categories';
import { samplePosts } from '../data/sampleData';
import { useProducts } from '../hooks/useProducts';

export default function HomePage() {
  const { products, loading: productsLoading } = useProducts();
  const latestPosts = samplePosts.slice(0, 6);
  const featuredProducts = products.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Choose Your Journey</h2>
            <p className="section-subtitle">
              Select the stage that best describes your parenting journey
            </p>
          </AnimatedSection>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="categories-grid"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants} className="category-card-wrapper">
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section section-alt">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-subtitle">
              Fresh insights and tips from parenting experts
            </p>
          </AnimatedSection>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="blog-grid"
          >
            {latestPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Recommended Products</h2>
            <p className="section-subtitle">
              Carefully curated essentials for your parenting journey
            </p>
          </AnimatedSection>

          {productsLoading ? (
            <p className="empty-state">Loading products...</p>
          ) : featuredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="products-grid"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="empty-state">No products yet. Add some from the admin!</p>
          )}
        </div>
      </section>
    </div>
  );
}
