import { createClient } from '@supabase/supabase-js';

// You'll need to replace these with your actual Supabase credentials
// Get them from: https://supabase.com/dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MzksImV4cCI6MTk2MDc2ODgzOX0.placeholder';

// Safe client creation
let supabaseClient: any = null;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.warn('Supabase not configured');
}

export const supabase = supabaseClient;

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== 'https://placeholder.supabase.co');
}

// Database types
export interface Product {
  id?: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  affiliate_link: string;
  category: 'to-be-parents' | 'new-parents' | 'toddler-parents';
  rating: number;
  /** JSON array of article IDs this product is linked to, e.g. '["1","2"]' */
  article_ids?: string;
  /** Optional Markdown blog/comparison content shown on the product page */
  blog_content?: string | null;
  created_at?: string;
}
