// components/ScrollToTop.js
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap
                      bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
                      text-slate-800 dark:text-white text-sm font-medium
                      px-4 py-2 rounded-xl shadow-lg
                      border border-white/20 dark:border-slate-700/50
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      pointer-events-none translate-x-2 group-hover:translate-x-0">
        <span className="flex items-center gap-2">
          <i className="fas fa-arrow-up text-green-500 text-base"></i>
          Back to top
        </span>
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 
                        bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
                        border-r border-t border-white/20 dark:border-slate-700/50
                        rotate-45"></div>
      </div>

      {/* Up Arrow Button with FontAwesome icon */}
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 rounded-full
                   bg-gradient-to-br from-blue-500 to-indigo-600
                   text-white shadow-2xl shadow-blue-500/30
                   hover:shadow-blue-500/50 transition-all duration-300
                   hover:scale-110 active:scale-95
                   focus:outline-none focus:ring-4 focus:ring-blue-400/50"
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up text-2xl"></i>
      </button>

      {/* Subtle pulse ring */}
      <div className="absolute inset-0 rounded-full bg-blue-500 -z-10 animate-ping opacity-30"></div>
    </div>
  );
}