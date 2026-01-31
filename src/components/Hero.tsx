import { motion } from 'framer-motion';
import GradientText from './GradientText';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="hero relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear" as const,
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-pink/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear" as const,
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary-teal/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-content relative z-10"
      >
        <motion.h1 variants={itemVariants} className="hero-title">
          <GradientText>Your Parenting Journey</GradientText>
          <br />
          Starts Here
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-subtitle">
          Expert advice, honest reviews, and community support for every stage of parenthood
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-badges">
          {[
            'Pregnancy Tips',
            'Newborn Care',
            'Toddler Development',
            'Product Reviews',
          ].map((badge) => (
            <motion.span
              key={badge}
              className="badge"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
