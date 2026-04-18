import { services } from '../utils/data';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="section-title scroll-reveal reveal-up dark:text-slate-300 text-4xl font-bold text-center mb-4">Services</h2>
        <div className="section-sub scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Empowering digital experiences with quality & creativity</div>
        <div className="services-grid stagger-reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="service-card p-8 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow hover:-translate-y-2 hover:bg-white dark:hover:bg-slate-700 transition">
              <i className={`${service.icon} text-4xl text-blue-600 mb-4`}></i>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}