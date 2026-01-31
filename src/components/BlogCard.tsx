import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '../types';
import { categories } from '../data/categories';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const category = categories.find(c => c.id === post.category);
  
  return (
    <Link to={`/article/${post.id}`} className="block">
      <motion.article
        className="blog-card"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="blog-image-wrapper">
          <motion.img 
            src={post.imageUrl} 
            alt={post.title}
            className="blog-image"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="blog-category-tag"
            style={{ backgroundColor: category?.color }}
            whileHover={{ scale: 1.05 }}
          >
            {category?.name}
          </motion.span>
        </div>
        
        <div className="blog-content">
          <h3 className="blog-title">{post.title}</h3>
          <p className="blog-excerpt">{post.excerpt}</p>
          
          <div className="blog-meta">
            <span className="meta-item">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            <span className="meta-item">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
