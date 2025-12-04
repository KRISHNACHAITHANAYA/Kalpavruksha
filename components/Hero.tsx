import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HeroProps {
  title: string;
  subtitle: string;
  /** Optional extra content rendered below subtitle */
  children?: React.ReactNode;
}

/**
 * Hero section with blurred coconut plantation background and dark overlay.
 * Place an image at public/assets/coconut-plantation.jpg (Vite will serve from /assets/...).
 */
const Hero: React.FC<HeroProps> = ({ title, subtitle, children }) => {
  // Use generic HTMLElement since React's intrinsic typing doesn't expose HTMLSectionElement
  const heroRef = useScrollReveal<HTMLElement>({ threshold: 0.25 });
  return (
    <section ref={heroRef} className="hero-section relative flex items-center justify-center text-center min-h-[340px] md:min-h-[420px] overflow-hidden">
      {/* Darker overlay for hero section to make text stand out */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent z-0" />
      
      <div className="relative z-10 px-4 md:px-8 max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg mb-4">{title}</h1>
        <p className="text-lg md:text-2xl text-gray-200 font-medium mb-6 leading-relaxed">{subtitle}</p>
        {children}
      </div>
    </section>
  );
};

export default Hero;
