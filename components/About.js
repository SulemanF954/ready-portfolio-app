export default function About({ cvLoading, generateCV, darkMode }) {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="scroll-reveal reveal-left">
            <img src={darkMode ? "/profile-dark.png" : "/profile-light.png"} alt="About me" className="rounded-2xl shadow-2xl" />
          </div>
          <div className="scroll-reveal reveal-right">
            <h2 className="text-4xl dark:text-slate-300 font-bold mb-4">About Me</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm Suleman Farooq, a QA Tester with 1.5 years of hands-on experience, currently transitioning into Frontend Development. I specialize in manual testing, creating detailed test cases, identifying critical bugs, and ensuring high product quality across applications.

              Alongside my QA expertise, I actively build responsive and user-friendly interfaces using modern technologies like React and Next.js. I bring a unique perspective by combining quality assurance with development, allowing me to create applications that are both functional and reliable.

              I'm passionate about continuous learning, improving user experience, and staying aligned with industry best practices. I thrive in environments where I can solve real-world problems, collaborate with teams, and contribute to building impactful digital products.

              Currently, I'm seeking opportunities where I can grow as a Frontend Developer while leveraging my QA background to deliver high-quality solutions.
            </p>
            <button onClick={generateCV} disabled={cvLoading} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 font-semibold shadow mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
              {cvLoading ? 'Generating...' : 'Download CV'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}