import { motion } from 'framer-motion';

export default function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-10 mt-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col justify-between items-center gap-6"
        >
          <div className="footer-logo flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SF</span>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Sulemanfarooq
            </div>
          </div>
          <div className="footer-nav flex gap-6 flex-wrap justify-center">
            {['Home', 'Services', 'About', 'Portfolio', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition">
                {item}
              </a>
            ))}
          </div>
          <div className="footer-social flex gap-4 text-2xl">
            {['linkedin', 'github', 'facebook', 'instagram'].map((social) => (
              <motion.a
                key={social}
                href={`https://${social}.com/sulemanfarooq`}
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="hover:text-white transition"
              >
                <i className={`fab fa-${social}`}></i>
              </motion.a>
            ))}
          </div>
          <div className="footer-contact flex flex-col sm:flex-row gap-4 text-center">
            <p><i className="far fa-envelope"></i> sulemanfarooq954@gmail.com</p>
            <p><i className="fas fa-phone-alt"></i> +92307-6315295</p>
          </div>
        </motion.div>
        <div className="copyright text-center text-sm border-t border-slate-800 pt-6 mt-6">
          Designed by @Suleman Farooq — QA Tester & Frontend Developer
        </div>
      </div>
    </footer>
  );
}