# Supabase Storage Setup - Image Upload System

Follow these exact steps to enable image uploads in your admin panel. Takes **5 minutes**.

## ✅ Prerequisites

- Supabase account created
- Supabase project created
- Products table created (see SUPABASE-SETUP.md if not done)

## 📦 Step 1: Create Storage Bucket

1. **Open your Supabase project dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Click on your project

2. **Navigate to Storage**
   - Click **"Storage"** in the left sidebar (icon looks like a folder)

3. **Create New Bucket**
   - Click the green **"New bucket"** button (top right)

4. **Configure Bucket**
   - **Name**: Enter exactly `products` (lowercase, no spaces)
   - **Public bucket**: ✅ **CHECK THIS BOX** (very important!)
   - **Allowed MIME types**: Leave empty (allows all image types)
   - **File size limit**: Enter `5242880` (5MB in bytes) or leave default

5. **Create**
   - Click **"Create bucket"**
   - You'll see "products" bucket in the list

## 🔐 Step 2: Set Storage Policies (Allow Public Upload)

1. **Click on the "products" bucket** you just created

2. **Go to Policies tab**
   - Look for "Policies" or "Configuration" tab
   - Click on it

3. **Create Upload Policy**
   - Click **"New Policy"**
   - Select **"For full customization"** or **"Custom policy"**
   
4. **Add Insert Policy** (Allows uploading)
   
   **Policy name**: `Allow public uploads to products`
   
   **Allowed operation**: ☑️ INSERT
   
   **Policy definition**: 
   ```sql
   true
   ```
   
   (This allows anyone to upload - fine since admin is password-protected)

5. **Add Select Policy** (Allows reading images)
   
   **Policy name**: `Allow public access to product images`
   
   **Allowed operation**: ☑️ SELECT
   
   **Policy definition**: 
   ```sql
   true
   ```

6. **Save policies**

### Alternative: Use SQL

If you prefer SQL, go to **SQL Editor** and run:

```sql
-- Allow public uploads to products bucket
CREATE POLICY "Allow public uploads to products"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'products');

-- Allow public read access
CREATE POLICY "Allow public access to product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'products');

-- Allow public updates (optional - for replacing images)
CREATE POLICY "Allow public updates to products"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'products');

-- Allow public deletes (optional - for removing images)
CREATE POLICY "Allow public deletes from products"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'products');
```

## ✅ Step 3: Verify Setup

1. **Check bucket exists**
   - Go to Storage → You should see "products" bucket
   - Should have a green "Public" badge

2. **Test upload** (optional)
   - Click into "products" bucket
   - Click "Upload file"
   - Upload any test image
   - If it uploads successfully, you're good!

## 🎯 Step 4: Update Your .env File

Make sure your `.env` file has your Supabase credentials:

```bash
VITE_ADMIN_PASSWORD=admin123

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**To get these values:**
1. In Supabase dashboard, click **Settings** (gear icon)
2. Click **API**
3. Copy **Project URL** → paste as `VITE_SUPABASE_URL`
4. Copy **anon public** key → paste as `VITE_SUPABASE_ANON_KEY`

## 🔄 Step 5: Restart Your Dev Server

**Important**: You must restart for .env changes to take effect!

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## ✅ Step 6: Test Image Upload

1. **Visit**: `http://localhost:5173/admin`
2. **Login**: Use password `admin123`
3. **Click**: "Add New Product"
4. **Click**: "Upload Image File" button
5. **Select**: Any image from your computer
6. **See**: Instant preview appears
7. **Fill**: Other product details
8. **Click**: "Add Product"
9. **Wait**: Button shows "Uploading..."
10. **Success**: Product added with image!

## 🎉 What You Get

Once set up, you can:
- ✅ Upload product images directly
- ✅ See instant previews
- ✅ Images stored in Supabase
- ✅ Automatic public URLs
- ✅ Fast CDN delivery
- ✅ Edit and replace images
- ✅ No manual URL management

## 📊 Storage Limits (Free Tier)

- **Storage**: 1GB (approximately 1,000-2,000 product images)
- **Bandwidth**: 2GB/month
- **Cost**: $0 forever on free tier
- **When full**: Upgrade to Pro ($25/month) for 100GB

## 🐛 Troubleshooting

### "Bucket not found"
✅ **Solution**: Create "products" bucket in Supabase Storage (Step 1)

### "Permission denied" when uploading
✅ **Solution**: Add storage policies (Step 2) or make bucket public

### Images not showing on site
✅ **Solution**: Make sure bucket is marked as "Public"

### "Invalid API key"
✅ **Solution**: Check .env has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

### Upload button doesn't work
✅ **Solution**: 
1. Check .env file is configured
2. Restart dev server
3. Clear browser cache
4. Check console for specific error

## 📝 Quick Checklist

Before image upload works, verify:

- ☑️ Supabase account created
- ☑️ Supabase project created
- ☑️ Storage bucket "products" created
- ☑️ Bucket is marked as **Public**
- ☑️ Storage policies added (INSERT, SELECT)
- ☑️ .env file has correct credentials
- ☑️ Dev server restarted
- ☑️ Can login to /admin page

## 🎯 Summary

**3 Key Things Needed:**

1. **Create bucket** named `products` (must be public)
2. **Add storage policies** (allow INSERT and SELECT)
3. **Add credentials** to .env and restart server

**Time to set up**: 5-10 minutes  
**Cost**: $0 (free forever)  
**Capacity**: 1,000+ product images  

After this setup, you can upload images directly - no more URLs needed!

---

**Need help?** Check the Supabase Storage documentation: [https://supabase.com/docs/guides/storage](https://supabase.com/docs/guides/storage)
