# Image Upload Guide

Your admin panel now supports **direct image uploads**! No more copying and pasting URLs - just upload your product images directly.

## 📸 How It Works

### Image Storage
- **Where**: Supabase Storage (free tier includes 1GB)
- **Cost**: FREE up to 1GB
- **Capacity**: ~1,000-2,000 product images (at 500KB-1MB each)
- **Public access**: Images are automatically public (accessible via URL)

### Upload Process
1. Click "Choose an image file..."
2. Select image from your computer
3. See instant preview
4. Click "Add Product"
5. Image uploads and product is saved!

## 🎨 Using the Image Upload

### Adding New Product

1. **Open admin panel**: Visit `/admin` and login
2. **Click** "Add New Product"
3. **Find the Product Image field**
4. **Click** "Choose an image file..."
5. **Select** an image from your computer
6. **Preview appears** - Check it looks good
7. **Fill** other fields (name, price, etc.)
8. **Click** "Add Product"
9. **Wait** for "Uploading..." to finish
10. **Done!** Product added with uploaded image

### Editing Product Image

1. **Click** "Edit" on any product
2. **See current image** displayed
3. **To change**: Click "Choose an image file..." and select new one
4. **Preview shows** new image
5. **Click** "Update Product"
6. **Old image** stays in storage but new one is used

### Removing/Changing Image

- **During upload**: Click "Remove Image" button to clear selection
- **When editing**: Upload new image to replace old one
- **Current image** shows until you upload a replacement

## 📋 Image Requirements

### File Formats Supported
✅ JPG/JPEG  
✅ PNG  
✅ GIF  
✅ WebP  

### File Size
- **Maximum**: 5MB per image
- **Recommended**: 500KB - 1MB (good quality, fast loading)
- **Too large?** Use TinyPNG.com to compress before uploading

### Image Dimensions
- **Recommended**: 500x500px to 1000x1000px
- **Aspect ratio**: Square (1:1) works best for product cards
- **Minimum**: 300x300px
- **Maximum**: 2000x2000px

## 🖼️ Getting Product Images

### Option 1: Download from Amazon

1. Find product on Amazon
2. Right-click on product image
3. Select "Save Image As..."
4. Save to your computer
5. Upload in admin panel

### Option 2: Take Your Own Photos

1. Photo product with good lighting
2. Use plain background
3. Center the product
4. Save at recommended size
5. Upload in admin panel

### Option 3: Stock Photos

1. Visit Unsplash.com or Pexels.com
2. Search for product type
3. Download image
4. Upload in admin panel

### Option 4: Product Manufacturer

- Many brands provide product images
- Check product manufacturer website
- Download high-res images
- Upload in admin panel

## 💡 Image Best Practices

### Before Uploading

1. **Crop to square** ratio (1:1) for consistency
2. **Compress** if over 1MB using:
   - TinyPNG.com
   - Squoosh.app
   - Built-in photo editor
3. **Check clarity**: Image should be sharp and clear
4. **Remove background** (optional) for professional look

### Image Quality Tips

✅ **Good lighting**: Bright, natural light  
✅ **Plain background**: White or neutral colors  
✅ **Centered product**: Main focus of image  
✅ **High resolution**: At least 500x500px  
✅ **No watermarks**: Unless it's your brand  

❌ **Avoid**:
- Blurry images
- Dark or shadowy photos
- Cluttered backgrounds
- Very small images (pixelated when displayed)
- Multiple products in one image

## 🔄 Image Upload Flow

```
1. Select File
   ↓
2. Validate (type, size)
   ↓
3. Show Preview
   ↓
4. Upload to Supabase Storage
   ↓
5. Get Public URL
   ↓
6. Save URL in Database
   ↓
7. Display on Website
```

## 📊 Storage Management

### Free Tier Limits
- **Storage**: 1GB total
- **Bandwidth**: 2GB/month for image serving
- **Transforms**: Limited (but we don't use these)

### Monitoring Usage

In Supabase Dashboard:
1. Go to **Storage** → **products** bucket
2. See all uploaded images
3. Check total storage used
4. Delete old images if needed

### Deleting Images

**Automatic**: No (images stay even if product is deleted)  
**Manual**: 
1. Go to Supabase Storage
2. Browse `products` bucket  
3. Delete unused images

**Tip**: Images are small (usually 500KB-1MB), so 1GB = 1,000-2,000 images!

## 🎯 Upload Examples

### Example 1: Baby Monitor

```
File: baby-monitor-1.jpg
Size: 800KB
Dimensions: 800x800px
Format: JPG
Result: ✅ Perfect!
```

### Example 2: Pregnancy Pillow

```
File: pregnancy-pillow.png
Size: 1.2MB
Dimensions: 1000x1000px
Format: PNG
Result: ✅ Good! (compress to <1MB for faster loading)
```

### Example 3: Toddler Toy

```
File: IMG_20260131.jpg
Size: 6MB
Dimensions: 4000x3000px
Format: JPG
Result: ❌ Too large! Compress and resize first
```

## 🐛 Troubleshooting

### "Image upload failed"
- Check Supabase storage bucket exists
- Verify bucket is public
- Check API keys are correct
- Try smaller image

### "File size too large"
- Compress image using TinyPNG.com
- Reduce dimensions to 1000x1000px or less
- Convert to JPG (smaller than PNG)

### "Image not displaying"
- Check Supabase storage bucket is public
- Verify image uploaded successfully
- Check browser console for errors

### Preview not showing
- Refresh page
- Try different browser
- Check file format is supported

## ✅ Summary

**Image Upload Features:**
- ✅ Direct file upload (no URL needed)
- ✅ Instant preview before saving
- ✅ Supports all common formats
- ✅ 5MB max size per image
- ✅ Automatic public URL generation
- ✅ Stored in Supabase (1GB free)
- ✅ Professional upload interface

**Benefits:**
- No more finding and copying URLs
- Use your own product photos
- Better quality control
- Faster workflow
- More professional

**Storage:**
- FREE: 1GB storage (1,000+ images)
- FREE: 2GB bandwidth/month
- No credit card needed
- Plenty for most blogs

---

**Ready to upload? Login to `/admin` and start adding products with images!** 📸
