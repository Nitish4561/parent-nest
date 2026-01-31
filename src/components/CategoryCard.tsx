import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

// const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
//   'heart-pulse': HeartPulse,
//   'baby': Baby,
//   'smile': Smile,
// };

export default function CategoryCard({ category }: CategoryCardProps) {
  //const IconComponent = iconMap[category.icon] || Smile;
  
  return (
    <Link to={`/category/${category.id}`} className="block">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="category-card-modern"
      >
        <div className="category-content-modern">
          {/* <div className="category-icon-wrapper" style={{ color: category.color }}>
            <IconComponent size={48} strokeWidth={1.5} />
          </div>
           */}
          <h3 className="category-title-modern">{category.name}</h3>
          <p className="category-description-modern">{category.description}</p>
          
          <motion.div
            className="category-link-modern"
            style={{ color: category.color }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Explore Articles <ArrowRight size={18} strokeWidth={2} />
          </motion.div>
        </div>
        
        <div className="category-image-wrapper">
          <motion.img
            src={category.imageUrl}
            alt={category.name}
            className="category-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </Link>
  );
}
