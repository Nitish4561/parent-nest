# Product Management System - Quick Start

Your ParentNest website now has a **product management system** that lets you easily add, edit, and delete Amazon affiliate products!

## 🚀 Quick Start (Without Database)

Your site works right now with sample products! You can:
- View products on the homepage
- See category-specific products
- Click "View on Amazon" buttons

To add/edit products manually, edit `src/data/sampleData.ts`

## 🗄️ Upgrade to Database (Recommended)

To add products through an admin panel, follow these steps:

### 1. Set Up Supabase (10 minutes, FREE forever)

Follow the complete guide in `SUPABASE-SETUP.md`

**Quick version:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project (free tier)
3. Create `products` table
4. Copy your URL and API key
5. Add to `.env` file

### 2. Access Admin Panel

Once Supabase is configured:

1. Visit: `http://localhost:5173/admin`
2. You'll see the Product Management page
3. Click "Add New Product"
4. Fill in the form and submit!

## 📝 Adding Products

### Required Information:

1. **Product Name** 
   - Example: "Baby Monitor with Camera"
   - Keep it concise and clear

2. **Description** (50-100 characters)
   - Example: "HD video baby monitor with night vision and two-way audio"
   - Brief, informative summary

3. **Image URL**
   - Use Unsplash: [unsplash.com](https://unsplash.com)
   - Or Amazon product images
   - Example: `https://images.unsplash.com/photo-XXX?w=500&q=80`

4. **Price**
   - Format: "$49.99" or "$129.99"
   - Include dollar sign

5. **Amazon Affiliate Link**
   - Get from Amazon Associates dashboard
   - Format: `https://www.amazon.com/dp/PRODUCTID?tag=YOURTAG-20`
   - Must include your affiliate tag!

6. **Category**
   - Choose: Expecting Parents, New Parents, or Toddler Stage
   - Products appear on relevant category pages

7. **Rating** (1-5)
   - Decimal values OK (e.g., 4.5, 4.7)
   - Shows as stars on product cards

## 🔗 Getting Amazon Affiliate Links

### Set Up Amazon Associates (If Not Done Yet)

1. Go to [affiliate-program.amazon.com](https://affiliate-program.amazon.com)
2. Sign up (free)
3. Get approved (usually 1-3 days)
4. You'll get a unique tracking tag (e.g., `yoursite-20`)

### Generate Affiliate Links

1. Log into Amazon Associates dashboard
2. Use "Product Linking" → "Product Links"
3. Search for any product
4. Click "Get Link"
5. Copy the short link or full URL
6. **Make sure your tag is in the URL**: `?tag=YOURTAG-20`

### Affiliate Link Format

```
https://www.amazon.com/dp/PRODUCTCODE?tag=YOURTAG-20
```

Example:
```
https://www.amazon.com/dp/B08L5VN6RZ?tag=parentnest-20
```

## 🖼️ Best Practices for Product Images

### Image Size
- **Recommended**: 500x500px (square ratio)
- **Format**: JPG or PNG
- **Quality**: Medium to high

### Image Sources

1. **Unsplash** (Free, High Quality)
   - Search: "baby monitor", "pregnancy pillow", etc.
   - Get URL: Click image → "..." → Copy Link
   - Add quality param: `?w=500&q=80`

2. **Amazon Product Images**
   - Right-click product image on Amazon
   - Choose "Copy Image Address"
   - Use in your form

3. **Pexels** (Free Stock Photos)
   - Similar to Unsplash
   - Great variety

### Optimize URLs

Add these parameters to Unsplash URLs:
- `?w=500` - Sets width to 500px
- `&q=80` - Sets quality to 80%
- Full example: `https://images.unsplash.com/photo-XXX?w=500&q=80`

## 📊 Managing Your Products

### Add New Product
1. Go to `/admin`
2. Click "Add New Product"
3. Fill out form
4. Click "Add Product"

### Edit Product
1. Go to `/admin`
2. Find product in list
3. Click "Edit"
4. Update fields
5. Click "Update Product"

### Delete Product
1. Go to `/admin`
2. Find product in list
3. Click "Delete"
4. Confirm deletion

## 🎯 Product Categories Explained

### Expecting Parents
Products for pregnant women and those preparing for baby:
- Pregnancy pillows
- Hospital bags
- Baby monitors
- Nursery items
- Maternity clothes

### New Parents
Products for parents with newborns (0-12 months):
- Swaddle blankets
- Bottle warmers
- Baby carriers
- Pacifiers
- Nursing supplies

### Toddler Stage
Products for toddlers (1-3 years):
- Learning toys
- Toddler books
- Safety gates
- Potty training items
- Educational tablets

## 💡 Tips for Success

### Product Selection
- Choose products you genuinely recommend
- Mix price points (budget to premium)
- Include variety within each category
- Update regularly with new products

### Writing Descriptions
- Keep it under 100 characters
- Highlight main benefit
- Use clear, simple language
- Avoid hype or excessive claims

### Pricing
- Check Amazon frequently (prices change!)
- Consider updating monthly
- Show competitive prices

### Images
- Use high-quality, clear images
- Ensure product is visible
- Avoid cluttered backgrounds
- Keep consistent style across products

## 🔒 Security Notes

### Current Setup (Development)
- Admin panel is publicly accessible
- Anyone with the URL can add products
- Fine for personal use during development

### For Production (Later)
You'll want to add:
1. **Authentication** - Login system
2. **Protected routes** - Admin requires login
3. **RLS policies** - Database-level security

See Supabase docs for adding authentication.

## 🚀 Deployment

When deploying to Netlify/Vercel:

1. Add environment variables in deployment settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Your database works automatically!

3. Access admin at: `https://yoursite.com/admin`

## 📈 Scaling Up

Your free tier includes:
- **50,000 monthly active users**
- **5GB bandwidth**
- **500MB database**

This is plenty for most parenting blogs! If you outgrow it, upgrading is easy.

Products are loaded from Supabase on the public site. Add and manage them in the admin panel at `/admin`; they appear automatically on the home page and category pages.

## Need Help?

- Check `SUPABASE-SETUP.md` for detailed setup
- Visit [Supabase documentation](https://supabase.com/docs)
- Join [Supabase Discord](https://discord.supabase.com)

---

**You're all set!** Start adding your favorite parenting products and earn through Amazon Associates! 💰
