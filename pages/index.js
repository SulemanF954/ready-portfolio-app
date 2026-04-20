import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ScrollToTop from '../components/ScrollToTop'; // <-- NEW IMPORT
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useDarkMode } from '../hooks/useDarkMode';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { generateCV } from '../utils/generateCV';

export default function Home() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  useScrollReveal();
  const [cvLoading, setCvLoading] = useState(false);

  const handleGenerateCV = () => generateCV(setCvLoading);

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Head>
        <title>Suleman Farooq | QA Tester & Frontend Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero cvLoading={cvLoading} generateCV={handleGenerateCV} darkMode={darkMode} />
        <Services />
        <About cvLoading={cvLoading} generateCV={handleGenerateCV} darkMode={darkMode} />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />  {/* Left side (as you previously moved) */}
      <ScrollToTop />       {/* Right side up arrow */}
    </div>
  );
}