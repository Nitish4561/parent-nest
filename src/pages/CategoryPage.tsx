import { useParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import { categories } from '../data/categories';
import { samplePosts } from '../data/sampleData';
import { useProducts } from '../hooks/useProducts';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products: categoryProducts, loading: productsLoading } = useProducts(categoryId ?? undefined);
  const category = categories.find(c => c.id === categoryId);
  const categoryPosts = samplePosts.filter(p => p.category === categoryId);

  if (!category) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Category not found</h2>
      </div>
    );
  }

  //const IconComponent = iconMap[category.icon] || Smile;

  return (
    <div>
      {/* Category Hero */}
      <section className="category-hero" style={{ backgroundColor: `${category.color}15` }}>
        <div className="container">
          <div className="category-hero-content">
            {/* <div className="category-hero-icon-wrapper">
              <IconComponent size={64} strokeWidth={1.5} style={{ color: category.color }} />
            </div> */}
            <h1 className="category-hero-title" style={{ color: category.color }}>
              {category.name}
            </h1>
            <p className="category-hero-description">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Articles & Tips</h2>
          
          {categoryPosts.length > 0 ? (
            <div className="blog-grid">
              {categoryPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No articles yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Recommended Products</h2>
          <p className="section-subtitle">
            Must-have items for {category.name.toLowerCase()}
          </p>
          
          {productsLoading ? (
            <ProductGridSkeleton count={6} />
          ) : categoryProducts.length > 0 ? (
            <div className="products-grid">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No products yet. Check back soon!</p>
          )}
        </div>
      </section>
    </div>
  );
}
