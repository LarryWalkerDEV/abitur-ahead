
// Define animation delay classes for staggered animations
export const getAnimationDelay = (index: number, baseDelay: number = 100): string => {
  const delay = baseDelay * index;
  return `${delay}ms`;
};

// Animation variants for elements
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

// Animation timing utility
export const staggerChildren = (numberOfItems: number, staggerTime: number = 0.1): number[] => {
  return Array.from({ length: numberOfItems }, (_, i) => i * staggerTime);
};

// Add delay to animations based on scroll position
export const getScrollAnimationClass = (index: number): string => {
  const classes = [
    'opacity-0 translate-y-8',
    'animate-fade-up',
  ];
  
  const delay = index * 0.15;
  const style = `animation-delay: ${delay}s; animation-fill-mode: forwards;`;
  
  return `${classes.join(' ')} style="${style}"`;
};

// Get random animation duration for floating elements
export const getRandomFloatDuration = (): number => {
  return 5 + Math.random() * 5; // Between 5 and 10 seconds
};
