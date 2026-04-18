import { projects } from '../utils/data';

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="section-title scroll-reveal reveal-up text-4xl dark:text-slate-300 font-bold text-center mb-4">Portfolio</h2>
        <div className="section-sub scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Creative projects, real impact</div>
        <div className="portfolio-grid stagger-reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card relative rounded-2xl overflow-hidden h-64 bg-cover bg-center transition hover:scale-[1.02]" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${proj.bg})` }}>
              <div className="project-overlay absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition text-white text-center p-4">
                <h3 className="text-2xl font-bold">{proj.name}</h3>
                <p>{proj.category}</p>
                <i className="fas fa-eye mt-2"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}