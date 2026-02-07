# Supabase Setup Guide - Product Management System

This guide will help you set up a **FREE database** to manage products on your ParentNest website. No credit card required!

## Why Supabase?

- ✅ **100% Free tier** - 500MB database, perfect for your needs
- ✅ **No credit card required** to start
- ✅ **PostgreSQL database** - Professional and reliable
- ✅ **Easy to use** - Simple dashboard interface
- ✅ **Real-time updates** - Changes appear instantly
- ✅ **Generous limits** - 50,000 monthly active users on free tier

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub, Google, or email (no credit card needed!)
4. Verify your email

## Step 2: Create a New Project

1. Click **"New Project"** in your dashboard
2. Fill in the details:
   - **Name**: `parent-nest` (or any name you like)
   - **Database Password**: Choose a strong password (save it somewhere safe!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Select **Free** (default)
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete

## Step 3: Create Storage Bucket for Images

1. Click **"Storage"** in the left sidebar
2. Click **"Create a new bucket"**
3. Settings:
   - **Name**: `products`
   - **Public bucket**: ✅ Check this box (allows public image access)
   - **File size limit**: 5MB
   - **Allowed MIME types**: Leave empty (allows all images)
4. Click **"Create bucket"**

## Step 4: Create the Products Table

1. In your project dashboard, click **"Table Editor"** in the left sidebar
2. Click **"Create a new table"**
3. Use these settings:

   **Table Name**: `products`
   
   **Columns** (Click "Add column" for each):
   
   | Column Name      | Type         | Default Value | Extra Settings           |
   |-----------------|--------------|---------------|--------------------------|
   | id              | int8         | auto-increment| Primary key, auto-increment |
   | name            | text         | -             | Required                 |
   | description     | text         | -             | Required                 |
   | image_url       | text         | -             | Required                 |
   | price           | text         | -             | Required                 |
   | affiliate_link  | text         | -             | Required                 |
   | category        | text         | -             | Required                 |
   | rating          | float8       | 5             | Required                 |
   | created_at      | timestamptz  | now()         | Auto-generated           |

4. Click **"Save"** to create the table

### Alternative: Use SQL Editor

If you prefer SQL, click **"SQL Editor"** and run this:

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
```

### Add article links column (for linking products to articles)

To show products on specific article pages, add the `article_ids` column. In **SQL Editor** run:

```sql
ALTER TABLE products ADD COLUMN IF NOT EXISTS article_ids TEXT DEFAULT '[]';
```

This stores a JSON array of article IDs (e.g. `["1","2"]`) so each product can be linked to one or more articles.

### Add blog content column (for product page articles)

To allow blog/comparison content on each product page, add the `blog_content` column. In **SQL Editor** run:

```sql
ALTER TABLE products ADD COLUMN IF NOT EXISTS blog_content TEXT;
```

This stores optional Markdown text that is shown below the product on the product detail page.

## Step 5: Get Your API Keys

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** in the settings menu
3. You'll see two important values:

   - **Project URL**: `https://your-project.supabase.co`
   - **Anon/Public Key**: Long string starting with `eyJ...`

4. Copy both values

## Step 6: Add Keys to Your Project

1. In your project folder, create a file named `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace with your actual values from Step 4
3. **IMPORTANT**: Never commit the `.env` file to Git (already in .gitignore)

## Step 7: Set Up Row Level Security (RLS)

For now, we'll allow anyone to read products, but only you can add/edit/delete.

1. Go to **"Authentication"** → **"Policies"**
2. Click on the **"products"** table
3. Click **"New Policy"**
4. Choose **"Create a policy from scratch"**
5. Add these policies:

### Quick Option: Disable RLS (For Development)

**Easiest for getting started:**

1. In Table Editor, click on **"products"** table
2. Click settings/config menu
3. **Uncheck** "Enable Row Level Security"
4. Save

This allows your admin panel to add/edit/delete products freely.

### Production Option: Add RLS Policies

For production sites, keep RLS enabled and run this SQL:

```sql
-- Allow all operations on products table
CREATE POLICY "Allow public insert on products"
ON products FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public select on products"
ON products FOR SELECT TO public USING (true);

CREATE POLICY "Allow public update on products"
ON products FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public delete on products"
ON products FOR DELETE TO public USING (true);
```

**Note**: These allow anyone to manage products. Since your admin panel is password-protected, this is secure for now. Later, you can add authentication and restrict policies to authenticated users only.

## Step 8: Test Your Setup

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Visit the admin page**:
   ```
   http://localhost:5173/admin
   ```

3. **Add a test product** using the form

## Step 9: Update Product Display (Optional)

To show database products on your site, update `src/pages/HomePage.tsx` and `src/pages/CategoryPage.tsx` to fetch from Supabase instead of using sample data.

## Managing Products

### Through Admin Panel (Recommended)

1. Visit: `http://localhost:5173/admin`
2. Click **"Add New Product"**
3. Fill in the form:
   - Product name
   - Description (50-100 characters)
   - Image URL (use Unsplash or Amazon product images)
   - Price (e.g., "$49.99")
   - Amazon affiliate link
   - Category
   - Rating (1-5)
4. Click **"Add Product"**

### Through Supabase Dashboard

1. Go to your Supabase project
2. Click **"Table Editor"**
3. Click **"products"**
4. Click **"Insert row"** or **"Edit"** existing rows
5. Fill in the fields and save

## Getting Amazon Affiliate Links

1. Sign up for [Amazon Associates](https://affiliate-program.amazon.com/)
2. Search for products in your dashboard
3. Click "Get Link" for any product
4. Copy the link (it will include your affiliate tag)
5. Paste into the "Affiliate Link" field

## Finding Good Product Images

### Option 1: Amazon Product Images
- Right-click on product image on Amazon
- Copy image URL
- Use in your form

### Option 2: Unsplash (High Quality, Free)
1. Go to [Unsplash.com](https://unsplash.com)
2. Search for product type (e.g., "baby monitor")
3. Click on image
4. Click "..." → Copy Image URL
5. Add `?w=500&q=80` to the end for optimization

### Option 3: Pexels (Free Stock Photos)
1. Go to [Pexels.com](https://pexels.com)
2. Search and download image
3. Upload to a hosting service or use direct URL

## Cost Breakdown

### Supabase Free Tier (Forever Free!)

- **Database**: 500MB storage
- **Bandwidth**: 5GB per month
- **File Storage**: 1GB
- **Monthly Active Users**: 50,000
- **API Requests**: Unlimited

**Estimated capacity for your blog:**
- ~1,000-5,000 products (depending on description length)
- Plenty for a parenting blog!

### When to Upgrade?

You'll know it's time to upgrade when:
- You have 500MB+ of data (unlikely for products)
- More than 50,000 monthly visitors
- You need more than 5GB bandwidth/month

**Pro tier**: $25/month (only needed if you grow significantly)

## Security Best Practices

1. **Never share your database password**
2. **Keep your `.env` file private** (don't commit to GitHub)
3. **Use Row Level Security** (RLS) for production
4. **Add authentication** before going live (optional)
5. **Regularly backup** your data (Supabase does this automatically)

## Troubleshooting

### "Error connecting to Supabase"
- Check your `.env` file has correct URL and key
- Restart dev server after adding `.env`
- Verify your Supabase project is running

### "Permission denied" when adding products
- Check Table Editor → products → RLS is disabled OR
- Add proper RLS policies for INSERT/UPDATE/DELETE

### "Products not showing"
- Verify products exist in Supabase Table Editor
- Check browser console for errors
- Ensure RLS allows SELECT (read) operations

## Next Steps (Optional)

### Add Authentication
Later, you can add user authentication so only you can manage products:

1. Enable Email auth in Supabase
2. Add login page
3. Protect `/admin` route
4. Update RLS policies to check authentication

### Add Blog Post Management
You can create similar tables for:
- Blog posts
- Categories  
- Comments

### Deploy Your Site
When ready to deploy:
1. Push code to GitHub
2. Deploy to Vercel/Netlify
3. Add environment variables in deployment settings
4. Your database works automatically!

## Support

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Supabase Discord**: [https://discord.supabase.com](https://discord.supabase.com)
- **Free tier limits**: [https://supabase.com/pricing](https://supabase.com/pricing)

## Summary

✅ **Cost**: $0 (Free tier is permanent)  
✅ **Setup time**: 10-15 minutes  
✅ **Capacity**: Enough for thousands of products  
✅ **Easy to use**: Visual dashboard + code integration  
✅ **No credit card**: Completely free to start  

You now have a professional database system for managing your Amazon affiliate products! 🎉
