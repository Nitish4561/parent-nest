import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../data/categories';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo-wrapper">
          <motion.img 
            src="/logo.png" 
            alt="ParentNest" 
            className="logo-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="logo-text-wrapper">
            <span className="logo-brand">ParentNest</span>
            <span className="logo-tagline">Your Parenting Companion</span>
          </div>
        </Link>
        
        <nav className="nav">
          {/* <Link to="/" className="nav-link">Home</Link> */}
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`} 
              className="nav-link"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
