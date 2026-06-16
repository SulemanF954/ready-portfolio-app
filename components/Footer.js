"use client";

import { motion } from "framer-motion";
import { socialLinks } from "../utils/data";
import { PERSONAL_INFO, NAV_ITEMS } from '../utils/constants';

export default function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const currentYear = new Date().getFullYear();



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
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SF</span>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Sulemanfarooq
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 flex-wrap justify-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 text-2xl">
            {Object.entries(socialLinks).map(([key, url]) => (
              <motion.a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="hover:text-white transition"
              >
                <i className={`fab fa-${key}`}></i>
              </motion.a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-4 text-center">
            <p>
              <i className="far fa-envelope"></i>{" "}
              {PERSONAL_INFO.email}
            </p>
            <p>
              <i className="fas fa-phone-alt"></i> {PERSONAL_INFO.phone}
            </p>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="text-center text-sm border-t border-slate-800 pt-6 mt-6">
          &copy; {currentYear} Suleman Farooq &mdash; QA Tester &amp; Frontend Developer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
