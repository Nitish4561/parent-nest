import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { categories } from '../data/categories';
import type { AmazonProduct } from '../types';

type CategoryFilter = 'all' | 'to-be-parents' | 'new-parents' | 'toddler-parents';
type PriceSort = 'default' | 'low-to-high' | 'high-to-low';

function parsePrice(price: string): number {
  const numeric = (price || '').replace(/[^\d.]/g, '');
  const num = parseFloat(numeric);
  return Number.isNaN(num) ? 0 : num;
}

export default function ProductsPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [priceSort, setPriceSort] = useState<PriceSort>('default');
  const { products, loading } = useProducts(
    categoryFilter === 'all' ? undefined : categoryFilter
  );

  const sortedProducts = useMemo(() => {
    if (priceSort === 'default') return products;
    const copy = [...products];
    return copy.sort((a: AmazonProduct, b: AmazonProduct) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);
      if (priceSort === 'low-to-high') return priceA - priceB;
      return priceB - priceA;
    });
  }, [products, priceSort]);

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

          <div className="products-filter-wrap">
            <div className="products-filter-group">
              <label htmlFor="category-filter" className="products-filter-label">
                Category
              </label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                className="products-filter-select"
              >
                <option value="all">All products</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="products-filter-group">
              <label htmlFor="price-sort" className="products-filter-label">
                Sort by price
              </label>
              <select
                id="price-sort"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as PriceSort)}
                className="products-filter-select"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Low to high</option>
                <option value="high-to-low">High to low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="empty-state">Loading products...</p>
          ) : sortedProducts.length > 0 ? (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <p className="empty-state">
              No products in this category. Try another filter or check back soon!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
