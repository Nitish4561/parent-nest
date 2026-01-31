# ParentNest - Your Parenting Blog Platform ✨

A modern, beautiful React website template for parenting blogs with **Magic UI animations** and Amazon affiliate integration. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## ✨ Magic UI Features Integrated

This template uses animation components inspired by [Magic UI](https://magicui.design/) to create an engaging, professional user experience:

### 🎭 Animated Components

1. **AnimatedSection** - Scroll-triggered fade-in animations
   - Elements fade in and slide up as you scroll
   - Used for section titles and content blocks
   - Smooth easing with staggered children animations

2. **GradientText** - Beautiful gradient text effects
   - Multi-color gradients (pink, teal, orange)
   - Animated fade-in on load
   - Perfect for hero titles and CTAs

3. **ShimmerButton** - Interactive buttons with shimmer effect
   - Animated shine effect on hover
   - Scale animations on click/hover
   - Used for Amazon affiliate links

4. **FloatingCard** - Hoverable cards with lift effect
   - Cards float up on hover
   - Smooth spring animations
   - Applied to blog posts, products, and categories

### 🎨 Animation Features

- **Hero Section**: Animated gradient background blobs that rotate and scale
- **Category Cards**: Icon rotation and scale on hover, smooth border transitions
- **Blog Cards**: Image zoom on hover, floating lift effect
- **Product Cards**: Shimmer buttons, hover scale effects
- **Staggered Animations**: Grid items animate in sequence for smooth reveals
- **Scroll Animations**: Content fades in as you scroll using Intersection Observer

## 🚀 Features

- **Three Category System**: To-Be Parents, New Parents, and Parents to Toddlers
- **Blog Posts**: Beautiful card-based blog layout with images
- **Amazon Affiliate Integration**: Product cards with shimmer button affiliate links
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Warm, authentic design with smooth animations
- **Fast Performance**: Built with Vite and optimized with Tailwind CSS
- **Framer Motion**: Professional-grade animations throughout

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework  
- **Framer Motion** - Animation library (Magic UI foundation)
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your site.

## 🏗️ Build for Production

```bash
npm run build
```

## 🎨 Customization Guide

### 1. Add Your Blog Posts

Edit `src/data/sampleData.ts` to add your blog posts:

```typescript
{
  id: 'unique-id',
  title: 'Your Blog Post Title',
  excerpt: 'A short description of your post',
  imageUrl: 'https://your-image-url.com/image.jpg',
  category: 'to-be-parents', // or 'new-parents' or 'toddler-parents'
  date: '2026-01-30',
  readTime: '5 min read'
}
```

**Where to get images:**
- [Unsplash](https://unsplash.com) - Free high-quality photos
- [Pexels](https://pexels.com) - Free stock photos and videos
- [Pixabay](https://pixabay.com) - Free images and videos
- [Giphy](https://giphy.com) - Animated GIFs

### 2. Add Amazon Affiliate Products

Edit `src/data/sampleData.ts` to add products:

```typescript
{
  id: 'product-id',
  name: 'Product Name',
  description: 'Short product description',
  imageUrl: 'https://product-image-url.com/image.jpg',
  price: '$XX.XX',
  affiliateLink: 'https://www.amazon.com/dp/PRODUCTID?tag=YOUR-TAG-20',
  category: 'to-be-parents',
  rating: 4.5
}
```

**Getting Amazon Affiliate Links:**
1. Sign up for [Amazon Associates](https://affiliate-program.amazon.com/)
2. Search for products in your Associates dashboard
3. Generate affiliate links with your unique tag
4. Replace `YOUR-TAG-20` with your actual affiliate tag

### 3. Customize Colors & Animations

Edit `tailwind.config.js` for colors:

```javascript
colors: {
  primary: {
    pink: '#FF6B9D',    // Change to your brand color
    teal: '#4ECDC4',    // Secondary color
    orange: '#FFB03B',  // Accent color
  }
}
```

Edit `src/index.css` for CSS variables:

```css
:root {
  --primary-pink: #FF6B9D;
  --primary-teal: #4ECDC4;
  --primary-orange: #FFB03B;
}
```

### 4. Adjust Animation Speeds

In component files, modify Framer Motion props:

```typescript
// Make animations faster
transition={{ duration: 0.3, delay: 0 }}

// Make animations slower
transition={{ duration: 1.0, delay: 0.5 }}

// Change animation type
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

### 5. Update Site Information

- **Logo & Name**: Edit `src/components/Header.tsx`
- **Footer Info**: Edit `src/components/Footer.tsx`
- **Hero Section**: Edit `src/components/Hero.tsx`

### 6. Add More Categories

Edit `src/data/categories.ts`:

```typescript
{
  id: 'your-category-id',
  name: 'Category Name',
  description: 'Category description',
  icon: '🎨', // Any emoji
  color: '#HEX-COLOR'
}
```

## 📁 Project Structure

```
parent-nest/
├── src/
│   ├── components/          # Reusable components
│   │   ├── AnimatedSection.tsx   # Magic UI scroll animations
│   │   ├── GradientText.tsx      # Magic UI gradient text
│   │   ├── ShimmerButton.tsx     # Magic UI shimmer effect
│   │   ├── FloatingCard.tsx      # Magic UI float effect
│   │   ├── Header.tsx            # Site header with navigation
│   │   ├── Hero.tsx              # Animated hero section
│   │   ├── CategoryCard.tsx      # Category selector cards
│   │   ├── BlogCard.tsx          # Blog post cards
│   │   ├── ProductCard.tsx       # Amazon product cards
│   │   └── Footer.tsx            # Site footer
│   ├── pages/                    # Page components
│   │   ├── HomePage.tsx          # Main landing page
│   │   └── CategoryPage.tsx      # Category-specific pages
│   ├── data/                     # Site data
│   │   ├── categories.ts         # Category definitions
│   │   └── sampleData.ts         # Blog posts and products
│   ├── lib/                      # Utilities
│   │   └── utils.ts              # Tailwind merge utility
│   ├── types.ts                  # TypeScript types
│   ├── App.tsx                   # Main app component
│   ├── App.css                   # App-specific styles
│   ├── index.css                 # Global styles + Tailwind
│   └── main.tsx                  # App entry point
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── package.json
└── README.md
```

## 🎬 Animation Examples

### Hero Section Animations
```typescript
// Staggered children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,  // Delay between each child
      delayChildren: 0.3,     // Initial delay
    },
  },
};
```

### Scroll-Triggered Animations
```typescript
// Fade in when scrolled into view
<AnimatedSection delay={0.2}>
  <h2>Your Content</h2>
</AnimatedSection>
```

### Interactive Hover Effects
```typescript
// Scale and lift on hover
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  Your content
</motion.div>
```

## 🔍 SEO Tips

1. **Add Meta Tags**: Edit `index.html` to add meta descriptions, Open Graph tags
2. **Use Descriptive Titles**: Make your blog post titles clear and keyword-rich
3. **Alt Text**: Always add descriptive alt text to images
4. **Internal Linking**: Link between related blog posts
5. **Regular Content**: Post consistently to improve rankings

## 🖼️ Image Best Practices

### Recommended Image Sizes:
- **Blog Post Images**: 800x600px (4:3 ratio)
- **Product Images**: 500x500px (1:1 ratio)
- **Hero Images**: 1920x1080px (16:9 ratio)

### Optimization:
- Use WebP format when possible
- Compress images using [TinyPNG](https://tinypng.com)
- Use CDN for faster loading (like Cloudinary or ImageKit)

## 🎁 Adding GIFs

GIFs work great for:
- Step-by-step tutorials
- Product demonstrations
- Emotional moments
- Tips and tricks

Just use a GIF URL as the `imageUrl` in your blog posts or products.

## 🚀 Deployment

### Deploy to Netlify:
1. Push your code to GitHub
2. Connect your repo to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel:
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with default settings

## ⚠️ Amazon Affiliate Disclaimer

Make sure to include the Amazon Associates disclaimer on your site (already included in footer):

> "As an Amazon Associate, we earn from qualifying purchases."

## 📚 Resources

- [Magic UI](https://magicui.design/) - Animation components inspiration
- [Framer Motion](https://www.framer.com/motion/) - Animation library docs
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS framework
- [React Router](https://reactrouter.com/) - Routing documentation
- [Vite](https://vitejs.dev/) - Build tool documentation
- [Lucide Icons](https://lucide.dev/) - Icon library

## 📝 License

MIT License - feel free to use this template for your parenting blog!

## 🙏 Acknowledgments

- Animations inspired by [Magic UI](https://magicui.design/)
- Built with love for parents everywhere ❤️

---

**Need Help?** Check the React, Vite, or Framer Motion documentation linked above!
