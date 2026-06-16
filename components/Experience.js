import { experiences } from '../utils/data';
import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12"
        >
          My Professional Journey
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative flex flex-col md:flex-row items-center mb-12 ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 z-10 hidden md:block" />

              {/* Content card */}
              <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-3">
                    {exp.duration}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{exp.company}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{exp.description}</p>
                  <ul className={`space-y-2 ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-slate-500 dark:text-slate-400 text-sm flex items-start gap-2">
                        <i className="fas fa-check-circle text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for other side */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
