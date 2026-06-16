import { projects } from '../utils/data';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

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
        <SectionHeader
          title="Portfolio"
          subtitle="Creative Projects, Real Impact"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((proj, idx) => (
            <motion.a
              key={idx}
              href={proj.link}
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              className="project-card relative rounded-2xl overflow-hidden h-64 bg-cover bg-center cursor-pointer group block"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${proj.bg})` }}
            >
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-center p-4">
                <h3 className="text-2xl font-bold">{proj.name}</h3>
                <p className="text-slate-300">{proj.category}</p>
                <div className="flex gap-3 mt-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    <i className="fas fa-eye mr-1" /> View
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
