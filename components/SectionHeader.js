import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionHeader({ title, subtitle }) {
  return (
    <>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="text-center text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12"
      >
        {subtitle}
      </motion.div>
    </>
  );
}
