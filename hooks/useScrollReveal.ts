import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * Adds a fade + upward motion reveal when the element first enters the viewport.
 * Usage:
 * const ref = useScrollReveal();
 * return <div ref={ref}>Content</div>
 */
export function useScrollReveal<T extends HTMLElement>(options: { threshold?: number } = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // initial hidden state handled via CSS .reveal class
    el.classList.add('reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // reveal only once
          }
        });
      },
      { threshold: options.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold]);

  return ref;
}
