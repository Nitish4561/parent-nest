import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Database, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, isSupabaseConfigured as checkSupabaseSetup, type Product } from '../lib/supabase';
import { categories } from '../data/categories';
import AdminLogin from '../components/AdminLogin';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [dbConfigured, setDbConfigured] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    image_url: '',
    price: '',
    affiliate_link: '',
    category: 'to-be-parents',
    rating: 5,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const authToken = localStorage.getItem('adminAuth');
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (authToken && atob(authToken) === adminPassword) {
      setIsAuthenticated(true);
      checkSupabaseConfig();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (_password: string) => {
    setIsAuthenticated(true);
    checkSupabaseConfig();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  const checkSupabaseConfig = () => {
    if (checkSupabaseSetup()) {
      setDbConfigured(true);
      fetchProducts();
    } else {
      setDbConfigured(false);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      // If bucket doesn't exist, show helpful message
      if (error.message?.includes('Bucket not found')) {
        throw new Error('Storage bucket not set up. Please create "products" bucket in Supabase Storage (see SUPABASE-SETUP.md) or use image URL instead.');
      }
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload image if a new one is selected
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const productData = {
        ...formData,
        image_url: imageUrl,
      };

      if (editingProduct?.id) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        alert('Product updated successfully!');
      } else {
        // Add new product
        if (!imageUrl) {
          alert('Please select an image');
          setUploading(false);
          return;
        }

        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        alert('Product added successfully!');
      }

      // Reset form and refresh
      resetForm();
      fetchProducts();
    } catch (error: any) {
      alert('Error: ' + error.message);
      console.error('Error saving product:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image_url: '',
      price: '',
      affiliate_link: '',
      category: 'to-be-parents',
      rating: 5,
    });
    setEditingProduct(null);
    setShowForm(false);
    setSelectedImage(null);
    setImagePreview('');
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!dbConfigured) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-setup-guide">
            <Database size={64} color="#4ECDC4" />
            <h1>Welcome to Product Management!</h1>
            <p className="setup-subtitle">
              Set up your free database to start adding products
            </p>

            <div className="setup-steps">
              <h2>Quick Setup (10 minutes, FREE forever)</h2>
              
              <div className="setup-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Create Supabase Account</h3>
                  <p>Visit <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a> and sign up (no credit card needed!)</p>
                </div>
              </div>

              <div className="setup-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Create New Project</h3>
                  <p>Choose "Free" tier and create a project. Wait 2-3 minutes for setup.</p>
                </div>
              </div>

              <div className="setup-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Create Products Table</h3>
                  <p>In SQL Editor, run the SQL from <code>SUPABASE-SETUP.md</code></p>
                </div>
              </div>

              <div className="setup-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Add API Keys</h3>
                  <p>Create a <code>.env</code> file with your Supabase URL and key (see <code>.env.example</code>)</p>
                </div>
              </div>

              <div className="setup-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Restart Server</h3>
                  <p>Restart <code>npm run dev</code> and refresh this page</p>
                </div>
              </div>
            </div>

            <div className="setup-docs">
              <h3>📚 Documentation</h3>
              <ul>
                <li>
                  <strong>QUICK-START-ADMIN.md</strong> - Super quick guide (recommended)
                </li>
                <li>
                  <strong>SUPABASE-SETUP.md</strong> - Detailed step-by-step setup
                </li>
                <li>
                  <strong>PRODUCT-MANAGEMENT.md</strong> - How to manage products
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Product Management</h1>
          <div className="admin-header-actions">
            <motion.button
              className="admin-add-button"
              onClick={() => setShowForm(!showForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              {showForm ? 'Cancel' : 'Add New Product'}
            </motion.button>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            className="admin-form-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="form-title">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Baby Monitor with Camera"
                  />
                </div>

                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="e.g., $49.99"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Brief product description (50-100 characters)"
                    rows={3}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Product Image *</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                      id="image-upload"
                      required={!editingProduct && !imagePreview}
                    />
                    <label htmlFor="image-upload" className="file-input-label">
                      📁 {selectedImage ? selectedImage.name : 'Click to Upload Product Image'}
                    </label>
                    
                    {imagePreview && (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview('');
                            setFormData({ ...formData, image_url: '' });
                          }}
                          className="remove-image-btn"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                    
                    {editingProduct?.image_url && !imagePreview && (
                      <div className="current-image">
                        <p className="current-image-label">Current image:</p>
                        <img src={editingProduct.image_url} alt="Current" />
                      </div>
                    )}
                  </div>
                  <p className="field-hint">
                    Accepted: JPG, PNG, GIF, WebP (Max 5MB)
                  </p>
                </div>

                <div className="form-group">
                  <label>Amazon Affiliate Link *</label>
                  <input
                    type="url"
                    value={formData.affiliate_link}
                    onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                    required
                    placeholder="https://www.amazon.com/..."
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating (1-5) *</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button" disabled={uploading}>
                  {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={resetForm} className="cancel-button" disabled={uploading}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <div className="admin-products-list">
          <h2 className="section-title">Current Products ({products.length})</h2>
          
          {products.length === 0 ? (
            <div className="empty-state">
              <p>No products yet. Add your first product above!</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="admin-product-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <img src={product.image_url} alt={product.name} className="admin-product-image" />
                  
                  <div className="admin-product-content">
                    <h3>{product.name}</h3>
                    <p className="admin-product-category">
                      {categories.find(c => c.id === product.category)?.name}
                    </p>
                    <p className="admin-product-description">{product.description}</p>
                    <p className="admin-product-price">{product.price}</p>
                    <p className="admin-product-rating">Rating: {product.rating}/5</p>
                  </div>

                  <div className="admin-product-actions">
                    <button
                      onClick={() => handleEdit(product)}
                      className="edit-button"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id!)}
                      className="delete-button"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
