# Fix: Row-Level Security Error

## ❌ The Error

```
new row violates row-level security policy
```
(or HTTP 403 Unauthorized with that message)

This can come from **either** (or both):

1. **`public.products` table** – RLS is blocking the INSERT when saving the product.
2. **Storage bucket `products`** – RLS on `storage.objects` is blocking the image upload (happens *before* the table insert if you chose an image file).

Fix both using the script below so “Add Product” works every time.

## ✅ Fix both at once (recommended)

1. In Supabase go to **SQL Editor** → **New query**.
2. Paste and run this entire script:

```sql
-- ========== 1. PRODUCTS TABLE: allow inserts ==========
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- ========== 2. STORAGE BUCKET: allow uploads ==========
DROP POLICY IF EXISTS "Allow public uploads to products" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to products" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from products" ON storage.objects;

CREATE POLICY "Allow public uploads to products"
ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'products');

CREATE POLICY "Allow public access to product images"
ON storage.objects FOR SELECT TO public USING (bucket_id = 'products');

CREATE POLICY "Allow public updates to products"
ON storage.objects FOR UPDATE TO public USING (bucket_id = 'products');

CREATE POLICY "Allow public deletes from products"
ON storage.objects FOR DELETE TO public USING (bucket_id = 'products');
```

3. Click **Run**. You should see "Success".
4. Make sure the **Storage** bucket named `products` exists (Storage → New bucket → name: `products`, **Public bucket** checked). Create it first if needed.

After this, try adding a product again.

---

## ✅ Quick Fix (2 minutes) – table only

### Option 1: Disable RLS (Easiest - For Development)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Open your project
3. Click **"Table Editor"** in left sidebar
4. Click on **"products"** table
5. Click the **⚙️ settings/config icon** or **"..."** menu
6. Find **"Enable Row Level Security (RLS)"**
7. **UNCHECK/DISABLE** it
8. Click **"Save"**

**Done!** Try adding a product again - it should work now.

---

### Option 2: Add RLS Policies (Better - For Production)

If you want to keep RLS enabled, add these policies:

1. Go to **"Authentication"** → **"Policies"** in Supabase
2. Find **"products"** table
3. Click **"New Policy"**
4. Choose **"Create a policy from scratch"**
5. Paste this:

**Policy for INSERT (Adding Products):**
```sql
CREATE POLICY "Allow public insert on products"
ON products
FOR INSERT
TO public
WITH CHECK (true);
```

**Policy for SELECT (Reading Products):**
```sql
CREATE POLICY "Allow public select on products"
ON products
FOR SELECT
TO public
USING (true);
```

**Policy for UPDATE (Editing Products):**
```sql
CREATE POLICY "Allow public update on products"
ON products
FOR UPDATE
TO public
USING (true);
```

**Policy for DELETE (Removing Products):**
```sql
CREATE POLICY "Allow public delete on products"
ON products
FOR DELETE
TO public
USING (true);
```

6. Click **"Review"** then **"Save policy"** for each

---

### Option 3: Run SQL (Fastest)

1. Go to **"SQL Editor"** in Supabase
2. Paste this code:

```sql
-- Remove existing policies if any
DROP POLICY IF EXISTS "Allow public insert on products" ON products;
DROP POLICY IF EXISTS "Allow public select on products" ON products;
DROP POLICY IF EXISTS "Allow public update on products" ON products;
DROP POLICY IF EXISTS "Allow public delete on products" ON products;

-- Create new policies that allow everything
CREATE POLICY "Allow public insert on products"
ON products FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public select on products"
ON products FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public update on products"
ON products FOR UPDATE
TO public
USING (true);

CREATE POLICY "Allow public delete on products"
ON products FOR DELETE
TO public
USING (true);
```

3. Click **"Run"**
4. You should see: "Success. No rows returned"

**Done!** RLS is configured correctly.

---

## 🧪 Test It

1. Go to `http://localhost:5173/admin`
2. Login with `admin123`
3. Click "Add New Product"
4. Fill in the form
5. Click "Add Product"
6. Should work! ✅

---

## 🔒 Security Note

**For Development:**
- Disabling RLS is fine (Option 1)
- Only you have access to localhost
- Admin is password-protected

**For Production:**
- Use Option 2 or 3 (keep RLS enabled)
- Later, add proper authentication
- Restrict policies to authenticated users only

---

## ⚡ Recommended for You

**Right Now (Development):**
→ Use **Option 1** (Disable RLS) - Quickest and works fine for dev

**Before Going Live:**
→ Use **Option 3** (SQL policies) - Keeps security while allowing admin operations

---

## Summary

**The problem**: RLS is blocking database writes  
**The solution**: Either disable RLS OR add policies that allow operations  
**Time to fix**: 2 minutes  
**Recommended**: Option 1 for now, Option 3 before production  

After fixing, your admin panel will work perfectly! 🎉
