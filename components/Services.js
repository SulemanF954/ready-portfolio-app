import { services } from '../utils/data';
import TiltCard from './TiltCard';
import { motion } from 'framer-motion';

export default function Services() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="services" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl font-bold text-center mb-4 dark:text-slate-300"
        >
          Services
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12"
        >
          Empowering digital experiences with quality & creativity
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <TiltCard key={idx}>
              <div className="service-card p-8 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow hover:shadow-xl transition-all">
                <i className={`${service.icon} text-4xl text-blue-600 mb-4`}></i>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{service.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}