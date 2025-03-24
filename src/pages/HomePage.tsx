
import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/layout/Footer';

const HomePage: React.FC = () => {
  useEffect(() => {
    console.log('[HomePage] Komponente montiert');
    
    // Add observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-fade-up, .animate-scale-in, .animate-fade-in').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      console.log('[HomePage] Komponente demontiert');
      observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-abitur-dark text-white overflow-hidden">
      {/* Meta information would be added via Helmet or Next.js Head in a real project */}
      
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
};

export default HomePage;
