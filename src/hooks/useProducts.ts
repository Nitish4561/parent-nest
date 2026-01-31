import { useState, useEffect } from 'react';
import { supabase, type Product } from '../lib/supabase';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDatabase, setUsingDatabase] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      if (!supabaseUrl) {
        setProducts([]);
        setUsingDatabase(false);
        return;
      }

      let query = supabase.from('products').select('*');
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.warn('Error fetching products:', error);
        setProducts([]);
        setUsingDatabase(false);
        return;
      }

      const formattedData = (data || []).map((p: Product) => ({
        id: p.id?.toString(),
        name: p.name,
        description: p.description,
        imageUrl: p.image_url,
        price: p.price,
        affiliateLink: p.affiliate_link,
        category: p.category,
        rating: p.rating ?? 0,
      }));

      setProducts(formattedData);
      setUsingDatabase(true);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setUsingDatabase(false);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, usingDatabase };
}
