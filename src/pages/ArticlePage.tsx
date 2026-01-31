import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { samplePosts } from '../data/sampleData';
import { articleContent } from '../data/articleContent';
import { categories } from '../data/categories';
import ReactMarkdown from 'react-markdown';

export default function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  
  const article = samplePosts.find(p => p.id === articleId);
  
  if (!article) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Article not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === article.category);
  const content = articleContent[article.id] || 'Content coming soon...';

  return (
    <div className="article-page">
      {/* Back Navigation */}
      <div className="article-nav">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="article-header">
        <div className="container-article">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="article-category-badge" style={{ backgroundColor: category?.color }}>
              {category?.name}
            </div>
            
            <h1 className="article-title">{article.title}</h1>
            
            <p className="article-excerpt">{article.excerpt}</p>
            
            <div className="article-meta">
              <span className="meta-item">
                <Calendar size={16} />
                {new Date(article.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="meta-item">
                <Clock size={16} />
                {article.readTime}
              </span>
              <button className="share-button">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="article-image-container">
        <div className="container-article">
          <motion.img
            src={article.imageUrl}
            alt={article.title}
            className="article-featured-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="article-content">
        <div className="container-article">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="article-body"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="related-articles">
        <div className="container">
          <h2 className="section-title">More from {category?.name}</h2>
          <div className="related-grid">
            {samplePosts
              .filter(p => p.category === article.category && p.id !== article.id)
              .slice(0, 3)
              .map(post => (
                <Link to={`/article/${post.id}`} key={post.id} className="related-card">
                  <img src={post.imageUrl} alt={post.title} />
                  <h3>{post.title}</h3>
                  <p>{post.readTime}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
