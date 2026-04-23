import { projects } from '../utils/data';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4 dark:text-slate-300"
        >
          Portfolio
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12"
        >
          Creative projects, real impact
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              className="project-card relative rounded-2xl overflow-hidden h-64 bg-cover bg-center cursor-pointer group"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${proj.bg})` }}
            >
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-center p-4">
                <h3 className="text-2xl font-bold">{proj.name}</h3>
                <p>{proj.category}</p>
                <i className="fas fa-eye mt-2 text-xl animate-pulse"></i>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}