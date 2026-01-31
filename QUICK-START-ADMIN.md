# Quick Start: Product Management System

## 🎯 What You Get

A complete admin panel to manage Amazon affiliate products on your ParentNest blog!

## Option 1: Use Sample Products (Current Setup - No Action Needed)

Your site already works with sample products defined in code. No setup required!

**To add products**: Edit `src/data/sampleData.ts`

## Option 2: Use Database (Recommended for Easy Management)

### ⚡ Super Quick Setup (10 minutes)

1. **Create Supabase Account** (Free, No Credit Card)
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub or email
   - Create new project (Free tier)

2. **Create Storage Bucket for Images**
   
   - Go to Storage → Create new bucket
   - Name: `products`
   - Make it **public** (check the box)
   - Click Create

3. **Create Products Table**
   
   In Supabase SQL Editor, run this:
   ```sql
   CREATE TABLE products (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT NOT NULL,
     image_url TEXT NOT NULL,
     price TEXT NOT NULL,
     affiliate_link TEXT NOT NULL,
     category TEXT NOT NULL,
     rating FLOAT NOT NULL DEFAULT 5,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   -- Allow public to read products
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Public can view products"
   ON products FOR SELECT
   TO public
   USING (true);
   ```

4. **Get Your API Keys**
   - Settings → API
   - Copy "Project URL" and "anon public" key

5. **Add to Your Project**
   
   Create `.env` file in your project root:
   ```bash
   VITE_SUPABASE_URL=your-project-url-here
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

6. **Restart Dev Server**
   ```bash
   npm run dev
   ```

7. **Login and Access Admin Panel**
   
   - Visit: `http://localhost:5173/admin`
   - Login with password: `admin123` (default)
   - You're in!

## 🎨 Using the Admin Panel

### Add New Product

1. Click "Add New Product" button
2. Fill in the form:
   - **Name**: Product title
   - **Description**: Brief summary (50-100 chars)
   - **Product Image**: Click to upload (JPG, PNG, GIF, WebP - max 5MB)
   - **Price**: Format: "$49.99"
   - **Affiliate Link**: Your Amazon Associates link
   - **Category**: Select appropriate parenting stage
   - **Rating**: 1-5 (decimals OK)
3. Click "Add Product" (button shows "Uploading..." while processing)
4. Product appears on your site immediately!

### Edit Product

1. Find product in admin list
2. Click "Edit"
3. Update any fields
4. Click "Update Product"

### Delete Product

1. Find product in admin list
2. Click "Delete"
3. Confirm deletion

## 📋 Where Products Appear

Products automatically show up in:
- **Homepage**: "Recommended Products" section (first 3 products)
- **Category Pages**: Products filtered by category
- **All with proper images, prices, and affiliate links!**

## 💰 Free Tier Limits

Supabase Free Tier includes:
- ✅ 500MB database storage
- ✅ 50,000 monthly active users
- ✅ 5GB bandwidth/month
- ✅ Unlimited products (within 500MB)
- ✅ No credit card required
- ✅ No expiration

**Perfect for most parenting blogs!**

## 🔐 Security Note

The admin panel is currently **not password protected**. This is fine for:
- Local development
- Private sites
- Trusted collaborators only

**For production**, add authentication (see Supabase docs).

## 🆘 Troubleshooting

### Admin page shows "No products yet"
- Check Supabase table has data
- Verify `.env` file has correct values
- Restart dev server after adding `.env`

### "Error connecting to Supabase"
- Check `.env` values are correct (no quotes needed)
- Verify Supabase project is running
- Check browser console for specific errors

### Products not showing on site
- Check RLS policy allows SELECT
- Verify products have correct category names
- Check browser console for errors

## 📚 More Information

- **Full Supabase setup**: See `SUPABASE-SETUP.md`
- **Product tips**: See `PRODUCT-MANAGEMENT.md`
- **General website docs**: See `README.md`

---

**Ready to add products? Visit `/admin` to get started!** 🚀
