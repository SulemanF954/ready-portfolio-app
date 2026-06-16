import { useSkillCircles } from '../hooks/useSkillCircles';

export default function Skills() {
  const containerRef = useSkillCircles();
  return (
    <section id="skills" className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="scroll-reveal reveal-up text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent">Technical Mastery</h2>
        <div className="scroll-reveal reveal-up text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-12">Colorful icons &amp; animated progress on scroll</div>
        <div className="skills-container stagger-reveal flex flex-wrap justify-center gap-8" ref={containerRef}></div>
      </div>
    </section>
  );
}
