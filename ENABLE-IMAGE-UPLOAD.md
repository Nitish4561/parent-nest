# ✅ Enable Image Upload - Quick Checklist

Follow these steps **in order** to enable image uploads. Takes **5 minutes**.

## 📋 Prerequisites Check

Before starting, make sure you have:
- ☑️ Supabase account (sign up at supabase.com)
- ☑️ Supabase project created
- ☑️ `.env` file with your Supabase credentials

**If you don't have these yet**, run through `SUPABASE-SETUP.md` first.

---

## 🚀 Quick Setup (3 Steps)

### Step 1️⃣: Create Storage Bucket (2 minutes)

1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click on your project
3. Click **"Storage"** in left sidebar
4. Click **"New bucket"** button
5. Settings:
   ```
   Name: products
   Public bucket: ✅ CHECK THIS!
   ```
6. Click **"Create bucket"**

**Done!** You'll see "products" with a green "Public" badge.

---

### Step 2️⃣: Set Permissions (2 minutes)

**Option A: Simple (Recommended)**

1. Click on **"products"** bucket
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Choose **"Allow public access"** template
5. Check all boxes: ☑️ SELECT ☑️ INSERT ☑️ UPDATE ☑️ DELETE
6. Click **"Save"**

**Option B: Using SQL**

1. Go to **SQL Editor** in Supabase
2. Paste this code:

```sql
-- Enable storage
CREATE POLICY "Public Access" ON storage.objects
FOR ALL TO public
USING (bucket_id = 'products');
```

3. Click **"Run"**

**Done!** Storage is ready.

---

### Step 3️⃣: Restart Your Server (1 minute)

In your terminal:

```bash
# Stop server: Press Ctrl+C
# Start again:
npm run dev
```

**Done!** Image upload is now enabled.

---

## ✅ Verify It's Working

1. Visit: `http://localhost:5173/admin`
2. Login with password: `admin123`
3. Click: **"Add New Product"**
4. Look for: **"Click to Upload Product Image"** button
5. Click it and select an image
6. You should see: Image preview appears ✅

If preview shows → **Success! Image upload is working!**

---

## 🎯 That's It!

You can now:
- ✅ Upload product images directly from your computer
- ✅ See instant previews
- ✅ No more copying URLs
- ✅ All images stored in Supabase (1GB free)

---

## 🆘 If Something's Wrong

### Can't see Storage in sidebar
→ Your Supabase project might still be setting up. Wait 2-3 minutes and refresh.

### "Bucket not found" error
→ Make sure bucket name is exactly `products` (lowercase)

### Upload button not appearing
→ Check .env file has credentials and restart server

### Need more help?
→ See detailed guide: `SUPABASE-STORAGE-SETUP.md`

---

## 🔑 Your Current Setup

**Admin Panel**: `http://localhost:5173/admin`  
**Password**: `admin123` (change in `.env`)  
**Storage**: Supabase (setup above)  
**Cost**: $0 (free tier)  

Once storage is set up, you're ready to add products with images! 📸
