import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ScrollToTop from '../components/ScrollToTop';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import { useDarkMode } from '../hooks/useDarkMode';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { generateCV } from '../utils/generateCV';

export default function Home() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  useScrollReveal();
  const [cvLoading, setCvLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateCV = () => generateCV(setCvLoading);

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Head>
        <title>Suleman Farooq | QA Tester &amp; Frontend Developer</title>
        <meta name="description" content="Suleman Farooq — QA Tester with 1.5+ years of experience & Frontend Developer specializing in React, Next.js, and modern web technologies. Based in Multan, Pakistan." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Suleman Farooq" />
        <meta name="keywords" content="QA Tester, Frontend Developer, React, Next.js, Web Developer, Suleman Farooq, Portfolio" />

        {/* Open Graph */}
        <meta property="og:title" content="Suleman Farooq | QA Tester & Frontend Developer" />
        <meta property="og:description" content="Professional portfolio of Suleman Farooq — QA Tester & Frontend Developer specializing in React, Next.js, and modern web technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/profile-light.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Suleman Farooq | QA Tester & Frontend Developer" />
        <meta name="twitter:description" content="Professional portfolio of Suleman Farooq — QA Tester & Frontend Developer." />
        <meta name="twitter:image" content="/profile-light.png" />
      </Head>

      <Preloader isLoading={isLoading} />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero cvLoading={cvLoading} generateCV={handleGenerateCV} darkMode={darkMode} />
        <Services />
        <About cvLoading={cvLoading} generateCV={handleGenerateCV} darkMode={darkMode} />
        <Skills />
        <Experience />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}
