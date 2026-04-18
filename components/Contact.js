import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    timeline: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [useWhatsApp, setUseWhatsApp] = useState(false); // toggle between email and WhatsApp

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus({ type: '', message: '' });

    if (useWhatsApp) {
      // WhatsApp method – opens WhatsApp chat with pre-filled message
      const message = `Name: ${formData.name}%0aEmail: ${formData.email}%0aPhone: ${formData.phone}%0aService: ${formData.service}%0aTimeline: ${formData.timeline}%0aMessage: ${formData.message}`;
      const whatsappUrl = `https://wa.me/923076315295?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setFormStatus({ type: 'success', message: 'Redirecting to WhatsApp...' });
      setIsSending(false);
      // Optionally reset form
      setFormData({ name: '', email: '', phone: '', service: 'Web Development', timeline: '', message: '' });
    } else {
      // Email method
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setFormStatus({ type: 'success', message: 'Message sent! I will get back to you soon.' });
          setFormData({ name: '', email: '', phone: '', service: 'Web Development', timeline: '', message: '' });
        } else {
          setFormStatus({ type: 'error', message: data.message || 'Something went wrong.' });
        }
      } catch (err) {
        setFormStatus({ type: 'error', message: 'Network error. Please try again.' });
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="section-title scroll-reveal reveal-up dark:text-slate-300 text-4xl font-bold text-center mb-4">Contact me</h2>
        <div className="section-sub scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Cultivating Connections: Reach Out And Connect With Me</div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Animated Contact Card */}
          <div className="scroll-reveal reveal-left">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
              <div className="mb-6">
                <div className="text-sm uppercase tracking-[0.3em] text-blue-200/80">Get in touch</div>
                <h3 className="text-3xl font-bold mt-4">Let's connect</h3>
                <p className="mt-2 text-blue-100/90">I'm always excited to work on new projects and collaborations.</p>
              </div>

              <div className="space-y-5">
                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Name</p>
                  <p className="mt-2 text-lg font-semibold">Suleman Farooq</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Email</p>
                  <p className="mt-2 text-lg font-semibold break-all">sulemanfarooq954@gmail.com</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Phone</p>
                  <p className="mt-2 text-lg font-semibold">+92 307 6315295</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Availability</p>
                  <p className="mt-2 text-lg font-semibold">✅ Freelance & Remote Work</p>
                  <p className="text-sm text-blue-100/80">Open for full-time opportunities as well</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-100/90">Address</p>
                  <p className="mt-2 text-lg font-semibold">Multan, Pakistan</p>
                </div>
              </div>

              <div className="mt-8 flex gap-4 justify-start">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition">
                  <i className="fab fa-github"></i>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition">
                  <i className="fab fa-twitter"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form scroll-reveal reveal-zoom bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
            <div className="flex justify-end mb-4">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input type="checkbox" checked={useWhatsApp} onChange={() => setUseWhatsApp(!useWhatsApp)} className="rounded" />
                Send via WhatsApp (instant)
              </label>
            </div>
            <form onSubmit={handleSubmit}>
              {formStatus.message && (
                <div className={`mb-4 p-3 rounded-lg text-center ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {formStatus.message}
                </div>
              )}
              <div className="form-group mb-4">
                <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
              </div>
              <div className="form-group mb-4">
                <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
              </div>
              <div className="form-group mb-4">
                <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
              </div>
              <div className="form-group mb-4">
                <select name="service" value={formData.service} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  <option>Web Development</option>
                  <option>QA Testing</option>
                  <option>UI/UX Design</option>
                  <option>Frontend Dev</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <input type="text" name="timeline" placeholder="Timeline (e.g., 2 weeks)" value={formData.timeline} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-full focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
              </div>
              <div className="form-group mb-4">
                <textarea name="message" rows="4" placeholder="Project Details..." required value={formData.message} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-blue-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"></textarea>
              </div>
              <button type="submit" disabled={isSending} className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {isSending ? (useWhatsApp ? 'Opening WhatsApp...' : 'Sending...') : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}