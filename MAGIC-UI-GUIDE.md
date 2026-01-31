# Magic UI Components Reference

Quick reference guide for using the Magic UI-inspired animated components in your ParentNest website.

## 🎭 Available Components

### 1. AnimatedSection

Animates content as it scrolls into view with fade-in and slide-up effects.

```typescript
import AnimatedSection from './components/AnimatedSection';

<AnimatedSection delay={0.2} className="my-class">
  <h2>This will animate when scrolled into view</h2>
</AnimatedSection>
```

**Props:**
- `children` - Content to animate (required)
- `className` - Additional CSS classes (optional)
- `delay` - Animation delay in seconds (optional, default: 0)

**Use Cases:**
- Section titles
- Content blocks
- Feature lists
- Any content that should appear smoothly on scroll

---

### 2. GradientText

Creates beautiful gradient text effects with smooth animations.

```typescript
import GradientText from './components/GradientText';

<h1>
  <GradientText>Amazing Gradient Title</GradientText>
</h1>

// Custom colors
<GradientText colors={['#FF0000', '#00FF00', '#0000FF']}>
  Custom Colors
</GradientText>
```

**Props:**
- `children` - Text to display (required, must be string)
- `className` - Additional CSS classes (optional)
- `colors` - Array of color hex codes (optional, default: pink/teal/orange)

**Use Cases:**
- Hero titles
- Section headings
- Call-to-action text
- Brand elements

---

### 3. ShimmerButton

Interactive button with animated shimmer effect.

```typescript
import ShimmerButton from './components/ShimmerButton';

// As a link
<ShimmerButton
  href="https://amazon.com/your-link"
  className="bg-[#FF6B9D]"
>
  Buy on Amazon
</ShimmerButton>

// As a button with click handler
<ShimmerButton onClick={() => console.log('clicked')}>
  Click Me
</ShimmerButton>
```

**Props:**
- `children` - Button content (required)
- `className` - CSS classes for styling (optional)
- `shimmerColor` - Color of shimmer effect (optional, default: white)
- `onClick` - Click handler function (optional)
- `href` - Link URL (optional, converts to anchor tag)

**Use Cases:**
- Amazon affiliate links
- Call-to-action buttons
- Product purchase links
- Newsletter signups

---

### 4. FloatingCard

Card component with hover lift and scale effects.

```typescript
import FloatingCard from './components/FloatingCard';

<FloatingCard delay={0.1} className="p-6 bg-white rounded-lg">
  <h3>Card Title</h3>
  <p>Card content here</p>
</FloatingCard>
```

**Props:**
- `children` - Card content (required)
- `className` - Additional CSS classes (optional)
- `delay` - Animation delay in seconds (optional, default: 0)

**Use Cases:**
- Product cards
- Blog post previews
- Feature cards
- Testimonials

---

## 🎬 Direct Framer Motion Usage

You can also use Framer Motion directly for custom animations:

### Basic Motion Div

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content here
</motion.div>
```

### Hover Effects

```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -10 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  Hover over me!
</motion.div>
```

### Staggered Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // Delay between each child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
  <motion.div variants={itemVariants}>Item 3</motion.div>
</motion.div>
```

### Scroll-Triggered Animations

```typescript
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const MyComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      Animates when scrolled into view
    </motion.div>
  );
};
```

---

## 🎨 Animation Presets

### Fade In
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6 }}
```

### Slide Up
```typescript
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

### Scale In
```typescript
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5 }}
```

### Slide From Left
```typescript
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6 }}
```

### Rotate In
```typescript
initial={{ opacity: 0, rotate: -10 }}
animate={{ opacity: 1, rotate: 0 }}
transition={{ duration: 0.5 }}
```

---

## 🎯 Best Practices

1. **Performance**: Use `once: true` for scroll animations that should only happen once
2. **Delays**: Add small delays (0.1-0.3s) between staggered items
3. **Duration**: Keep animations between 0.3-0.8s for snappy feel
4. **Easing**: Use `"easeOut"` for natural-feeling animations
5. **Spring**: Use spring animations for interactive elements (hover, tap)
6. **Mobile**: Test animations on mobile devices - reduce complexity if needed

---

## 🎬 Common Animation Patterns

### Hero Section
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.2 }}
>
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <GradientText>Title</GradientText>
  </motion.h1>
  
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    Subtitle
  </motion.p>
</motion.div>
```

### Grid of Cards
```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <FloatingCard>{item.content}</FloatingCard>
    </motion.div>
  ))}
</motion.div>
```

### Button with Multiple Effects
```typescript
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="relative overflow-hidden"
>
  <ShimmerButton>Click Me</ShimmerButton>
</motion.button>
```

---

## 📚 Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Magic UI Website](https://magicui.design/)
- [Framer Motion Examples](https://www.framer.com/motion/examples/)

---

**Pro Tip**: Start with the pre-built components (AnimatedSection, GradientText, etc.) and only use direct Framer Motion when you need custom animations!
