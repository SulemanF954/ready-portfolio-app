import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal, .stagger-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('stagger-reveal')) {
            entry.target.classList.add('visible');
            const children = entry.target.children;
            for (let i = 0; i < children.length; i++) {
              setTimeout(() => {
                children[i].style.opacity = '1';
                children[i].style.transform = 'translateX(0)';
              }, i * 80);
            }
          } else {
            entry.target.classList.add('visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -20px 0px" });
    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};