import { useState, useEffect } from 'react';
import FloatingButton from './FloatingButton';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FloatingButton
      position="right"
      visible={isVisible}
      onClick={scrollToTop}
      icon="fas fa-arrow-up"
      ariaLabel="Scroll to top"
      tooltipIcon="fas fa-arrow-up text-green-500"
      tooltipText="Back to top"
      gradientClasses="from-blue-500 to-indigo-600"
      pulseColor="bg-blue-500"
      shadowClasses="shadow-blue-500/30 hover:shadow-blue-500/50"
      ringClasses="focus:ring-blue-400/50"
    />
  );
}
