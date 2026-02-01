import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit, Database, LogOut, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, isSupabaseConfigured as checkSupabaseSetup, type Product } from '../lib/supabase';
import { categories } from '../data/categories';
import { samplePosts } from '../data/sampleData';
import AdminLogin from '../components/AdminLogin';

export default function AdminPage() {
  const formContainerRef = useRef<HTMLDivElement>(null);
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
    article_ids: '[]',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 10;

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.price && String(p.price).toLowerCase().includes(q))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const pageIndex = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (pageIndex - 1) * PRODUCTS_PER_PAGE,
    pageIndex * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
        article_ids: formData.article_ids ?? '[]',
      };

      if (editingProduct?.id !== undefined && editingProduct?.id !== null) {
        // Update existing product – omit id and created_at so we don't touch primary key or timestamp
        const productId = Number(editingProduct.id);
        const updatePayload = {
          name: productData.name,
          description: productData.description,
          image_url: productData.image_url,
          price: productData.price,
          affiliate_link: productData.affiliate_link,
          category: productData.category,
          rating: productData.rating,
          article_ids: productData.article_ids ?? '[]',
        };
        const { data, error } = await supabase
          .from('products')
          .update(updatePayload)
          .eq('id', productId)
          .select('id');

        if (error) throw error;
        if (!data || data.length === 0) {
          throw new Error('Update did not match any product. The product may have been deleted.');
        }
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
    // Normalize: Supabase can return id as number or string, ensure we have a consistent Product
    const normalized: Product = {
      ...product,
      id: product.id != null ? Number(product.id) : undefined,
      article_ids: product.article_ids ?? '[]',
    };
    setEditingProduct(normalized);
    setFormData({
      name: normalized.name,
      description: normalized.description ?? '',
      image_url: normalized.image_url ?? '',
      price: normalized.price ?? '',
      affiliate_link: normalized.affiliate_link ?? '',
      category: normalized.category ?? 'to-be-parents',
      rating: typeof normalized.rating === 'number' ? normalized.rating : 5,
      article_ids: normalized.article_ids ?? '[]',
    });
    setSelectedImage(null);
    setImagePreview('');
    setShowForm(true);
    // Scroll form into view so user sees edit mode
    requestAnimationFrame(() => {
      formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const selectedArticleIds = ((): string[] => {
    try {
      const parsed = JSON.parse(formData.article_ids ?? '[]');
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  })();

  const toggleArticleForProduct = (articleId: string) => {
    const next = selectedArticleIds.includes(articleId)
      ? selectedArticleIds.filter((id) => id !== articleId)
      : [...selectedArticleIds, articleId];
    setFormData({ ...formData, article_ids: JSON.stringify(next) });
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
      article_ids: '[]',
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

            <div className="setup-production-hint">
              <strong>Already set up locally?</strong> On Vercel/Netlify, add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your project’s Environment Variables, then redeploy. The Add Product form will appear after that.
            </div>

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
              onClick={() => {
                if (!showForm) {
                  setFormData({
                    name: '',
                    description: '',
                    image_url: '',
                    price: '',
                    affiliate_link: '',
                    category: 'to-be-parents',
                    rating: 5,
                    article_ids: '[]',
                  });
                  setEditingProduct(null);
                  setSelectedImage(null);
                  setImagePreview('');
                  setShowForm(true);
                } else {
                  setShowForm(false);
                }
              }}
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
            ref={formContainerRef}
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

                <div className="form-group full-width">
                  <label>Link to articles (optional)</label>
                  <p className="field-hint">Show this product on these article pages</p>
                  <div className="article-multiselect">
                    {samplePosts.map((post) => (
                      <label key={post.id} className="article-multiselect-item">
                        <input
                          type="checkbox"
                          checked={selectedArticleIds.includes(post.id)}
                          onChange={() => toggleArticleForProduct(post.id)}
                        />
                        <span>{post.title}</span>
                      </label>
                    ))}
                  </div>
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

        {/* Products Table */}
        <div className="admin-products-list">
          <div className="admin-table-header">
            <h2 className="section-title">Current Products ({products.length})</h2>
            {products.length > 0 && (
              <div className="admin-search-wrap">
                <Search size={18} className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
              </div>
            )}
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <p>No products yet. Add your first product above!</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products match your search.</p>
            </div>
          ) : (
            <>
              <div className="admin-table-wrap">
                <table className="admin-products-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Image</th>
                      <th>Product title</th>
                      <th>Category id</th>
                      <th>Description</th>
                      <th>Price (₹)</th>
                      <th>Date added</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td className="col-no">{(pageIndex - 1) * PRODUCTS_PER_PAGE + index + 1}</td>
                        <td className="col-image">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} width={60} height={60} />
                          ) : (
                            <span className="no-image">—</span>
                          )}
                        </td>
                      <td className="col-title" title={product.name}>
                        {product.name}
                      </td>
                      <td className="col-category">{product.category}</td>
                      <td className="col-description" title={product.description}>
                        {product.description}
                      </td>
                      <td className="col-price">
                        {product.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="col-date">
                        {product.created_at
                          ? new Date(product.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                      <td className="col-rating">{product.rating}/5</td>
                      <td className="col-actions">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="edit-button"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id!)}
                          className="delete-button"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={pageIndex <= 1}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {pageIndex} of {totalPages}
                  {searchQuery && ` (${filteredProducts.length} of ${products.length} products)`}
                </span>
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={pageIndex >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
          )}
        </div>
      </div>
    </div>
  );
}
