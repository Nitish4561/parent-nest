import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-simple">
          <div className="footer-logo-section">
            <motion.img 
              src="/logo.png" 
              alt="ParentNest" 
              className="footer-logo-image"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            />
            <p className="footer-description">
              Your trusted companion through every stage of parenthood. 
              From pregnancy to toddlerhood, we're here to support you.
            </p>
          </div>
          
          <div className="footer-disclaimer">
            {/* <p>
              <strong>Disclaimer:</strong> As an Amazon Associate, we earn from qualifying purchases. 
              This comes at no extra cost to you.
            </p> */}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 ParentNest. Made with {' '}
            <Heart size={14} style={{ display: 'inline', color: '#FF6B9D' }} /> 
            {' '} for parents everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
