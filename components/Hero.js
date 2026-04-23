import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero({ cvLoading, generateCV, darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  // Animated counter component (inline)
  const AnimatedCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const duration = 2000;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, [inView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
  };

  return (
    <section id="home" className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl font-extrabold leading-tight">
              Hi, I'm<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Suleman Farooq
              </span>
            </h1>
            <div className="subtitle text-slate-600 dark:text-slate-300 text-lg my-4">
              QA Tester | Software Quality Enthusiast & Frontend Developer
            </div>

            <div className="social-icons flex gap-5 my-6">
              {['linkedin-in', 'github', 'facebook-f', 'instagram'].map((icon, idx) => (
                <motion.a
                  key={icon}
                  href={`https://${icon.split('-')[0]}.com/sulemanfarooq`}
                  target="_blank"
                  whileHover={{ scale: 1.1, backgroundColor: '#2563eb', color: 'white' }}
                  className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow"
                >
                  <i className={`fab fa-${icon}`}></i>
                </motion.a>
              ))}
            </div>

            <div className="btn-group flex gap-4 my-4">
              <MagneticButton>
                <button
                  id="hireMeBtn"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30"
                >
                  Hire Me
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={generateCV}
                  disabled={cvLoading}
                  className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-full font-semibold bg-transparent transition-all duration-300 hover:scale-105 hover:-translate-y-1 disabled:opacity-50"
                >
                  {cvLoading ? 'Generating...' : 'Download CV'}
                </button>
              </MagneticButton>
            </div>

            <div className="stats flex gap-6 mt-6">
              {[
                { label: 'Experience (yrs)', target: 2.5, suffix: '+' },
                { label: 'Projects Done', target: 8 },
                { label: 'Happy Clients', target: 4 },
              ].map((stat, idx) => (
                <div key={idx} className="stat-card bg-white dark:bg-slate-800 p-4 rounded-2xl text-center min-w-[110px] shadow">
                  <div className="stat-number text-3xl font-extrabold text-blue-600">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix || ''} />
                  </div>
                  <div>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-right flex justify-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-blue-100 to-slate-300 dark:from-blue-900 dark:to-slate-700 rounded-[40%_60%_30%_70%/50%_40%_60%_50%] flex items-center justify-center shadow-xl"
            >
              <img
                src={darkMode ? '/profile-dark.png' : '/profile-light.png'}
                alt="Suleman Farooq"
                className="w-[90%] h-[90%] object-cover rounded-[30%_70%_40%_60%/50%_40%_60%_50%] border-4 border-white dark:border-slate-700"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}