import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuActive, setMenuActive] = useState(false);

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="navbar fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-black/5 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center flex-wrap">
        <a href="#home" className="flex items-center gap-2.5 no-underline">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25"
          >
            <span className="text-xl font-bold text-white leading-none">SF</span>
          </motion.div>
          <div className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent">
            Suleman<span className="font-medium text-purple-600 dark:text-purple-400">farooq</span>
          </div>
        </a>

        <div className="hidden md:flex gap-8 items-center">
          {['Home', 'Services', 'About me', 'Portfolio', 'Contact me'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              className="nav-link font-medium hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hire-btn px-6 py-2.5 rounded-3xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/20 hover:shadow-none transition-all"
          >
            Hire Me
          </motion.a>
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center"
          >
            <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-600'}`} />
          </motion.button>
        </div>

        {/* mobile menu – same as before but with motion */}
        <div className="flex md:hidden gap-4 items-center">
          <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700">
            <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-600'}`} />
          </button>
          <div className="text-2xl cursor-pointer" onClick={() => setMenuActive(!menuActive)}>
            <i className="fas fa-bars text-slate-900 dark:text-slate-100" />
          </div>
        </div>

        {menuActive && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/10 flex flex-col gap-4 p-4 z-50">
            {['Home', 'Services', 'About me', 'Portfolio', 'Contact me'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                onClick={() => setMenuActive(false)}
                className="nav-link"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="hire-btn px-6 py-2.5 rounded-3xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-center">
              Hire Me
            </a>
          </div>
        )}
      </div>
    </motion.nav>
  );
}