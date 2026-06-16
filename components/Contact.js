import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks } from '../utils/data';
import SectionHeader from './SectionHeader';
import { PERSONAL_INFO, INITIAL_CONTACT_FORM } from '../utils/constants';

export default function Contact() {
  const [formData, setFormData] = useState({ ...INITIAL_CONTACT_FORM });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [useWhatsApp, setUseWhatsApp] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus({ type: '', message: '' });

    if (useWhatsApp) {
      const message = `Name: ${formData.name}%0aEmail: ${formData.email}%0aPhone: ${formData.phone}%0aService: ${formData.service}%0aTimeline: ${formData.timeline}%0aMessage: ${formData.message}`;
      window.open(`https://wa.me/${PERSONAL_INFO.phoneRaw}?text=${message}`, '_blank');
      setFormStatus({ type: 'success', message: 'Redirecting to WhatsApp...' });
      setIsSending(false);
      setFormData({ ...INITIAL_CONTACT_FORM });
    } else {
      try {
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        const data = await res.json();
        if (res.ok) {
          setFormStatus({ type: 'success', message: 'Message sent! I will get back to you soon.' });
          setFormData({ ...INITIAL_CONTACT_FORM });
        } else {
          setFormStatus({ type: 'error', message: data.message || 'Something went wrong.' });
        }
      } catch {
        setFormStatus({ type: 'error', message: 'Network error. Please try again.' });
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title="Contact me"
          subtitle="Cultivating Connections: Reach Out And Connect With Me"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side animated contact card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
              <div className="mb-6">
                <div className="text-sm uppercase tracking-[0.3em] text-blue-200/80">Get in touch</div>
                <h3 className="text-3xl font-bold mt-4">Let&apos;s connect</h3>
                <p className="mt-2 text-blue-100/90">I&apos;m always excited to work on new projects and collaborations.</p>
              </div>

              <div className="space-y-5">
                {[
                  { label: 'Name', value: PERSONAL_INFO.name },
                  { label: 'Email', value: PERSONAL_INFO.email },
                  { label: 'Phone', value: PERSONAL_INFO.phone },
                  { label: 'Availability', value: 'Freelance & Remote Work', sub: 'Open for full-time opportunities as well' },
                  { label: 'Address', value: PERSONAL_INFO.location },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                    <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold">{item.value}</p>
                    {item.sub && <p className="text-sm text-blue-100/80">{item.sub}</p>}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                {[
                  { icon: 'linkedin-in', url: socialLinks.linkedin },
                  { icon: 'github', url: socialLinks.github },
                  { icon: 'twitter', url: '#' },
                ].map((social) => (
                  <motion.a
                    key={social.icon}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition"
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl"
          >
            <form onSubmit={handleSubmit}>
              <AnimatePresence>
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-4 p-3 rounded-lg text-center ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {['name', 'email', 'phone', 'timeline'].map((field) => (
                <div key={field} className="mb-4">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    required={field !== 'phone' && field !== 'timeline'}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900"
                  />
                </div>
              ))}

              <div className="mb-4 relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3 pr-12 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 focus:ring-2 outline-none bg-white dark:bg-slate-900 appearance-none cursor-pointer transition-all duration-200"
                >
                  <option>Web Development</option>
                  <option>QA Testing</option>
                  <option>UI/UX Design</option>
                  <option>Frontend Dev</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-slate-400 dark:text-slate-500 text-sm"></i>
                </div>
              </div>

              <div className="mb-4">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Project Details..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-blue-500 outline-none bg-white dark:bg-slate-900"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSending ? (useWhatsApp ? 'Opening WhatsApp...' : 'Sending...') : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
