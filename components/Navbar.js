import { useState } from 'react';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <nav className="navbar">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center flex-wrap">
        <a href="#home" className="flex items-center gap-2.5 no-underline">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25 transition-transform hover:scale-105">
            <span className="text-xl font-bold text-white leading-none">SF</span>
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent">
            Suleman<span className="font-medium text-purple-600 dark:text-purple-400">farooq</span>
          </div>
        </a>

        <div className="hidden md:flex gap-8 items-center">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About me</a>
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#contact" className="nav-link">Contact me</a>
          <a href="#contact" className="hire-btn px-6 py-2.5 rounded-3xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/20 hover:shadow-none transition-all hover:-translate-y-0.5">Hire Me</a>
          <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-600 dark:text-slate-300'} text-lg`}></i>
          </button>
        </div>

        <div className="flex md:hidden gap-4 items-center">
          <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-600 dark:text-slate-300'} text-lg`}></i>
          </button>
          <div className="text-2xl cursor-pointer" onClick={() => setMenuActive(!menuActive)}>
            <i className="fas fa-bars text-slate-900 dark:text-slate-100"></i>
          </div>
        </div>

        {menuActive && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/10 flex flex-col gap-4 p-4 z-50">
            <a href="#home" onClick={() => setMenuActive(false)} className="nav-link">Home</a>
            <a href="#services" onClick={() => setMenuActive(false)} className="nav-link">Services</a>
            <a href="#about" onClick={() => setMenuActive(false)} className="nav-link">About me</a>
            <a href="#portfolio" onClick={() => setMenuActive(false)} className="nav-link">Portfolio</a>
            <a href="#contact" onClick={() => setMenuActive(false)} className="nav-link">Contact me</a>
            <a href="#contact" onClick={() => setMenuActive(false)} className="hire-btn px-6 py-2.5 rounded-3xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-center">Hire Me</a>
          </div>
        )}
      </div>
    </nav>
  );
}