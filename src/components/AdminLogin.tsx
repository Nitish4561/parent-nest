import { useState } from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      onLogin(password);
      localStorage.setItem('adminAuth', btoa(password)); // Simple encoding
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="login-icon">
          <Lock size={48} color="#4ECDC4" />
        </div>
        
        <h1 className="login-title">Admin Access</h1>
        <p className="login-subtitle">
          Enter your password to manage products
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className={error ? 'error' : ''}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
