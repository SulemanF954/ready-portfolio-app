export default function Hero({ cvLoading, generateCV, darkMode }) {
  return (
    <section id="home" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="scroll-reveal reveal-left text-5xl font-extrabold leading-tight">
              Hi, I'm<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Suleman Farooq
              </span>
            </h1>
            <div className="subtitle scroll-reveal reveal-right text-slate-600 dark:text-slate-300 text-lg my-4">QA Tester | Software Quality Enthusiast & Frontend Developer</div>
            <div className="social-icons scroll-reveal reveal-up flex gap-5 my-6">
              <a href="https://www.linkedin.com/in/suleman-farooq-99254b18b/" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://github.com/SulemanF954" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-github"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 w-11 h-11 flex items-center justify-center rounded-full shadow hover:bg-blue-600 hover:text-white transition"><i className="fab fa-instagram"></i></a>
            </div>
            <div className="btn-group scroll-reveal reveal-zoom flex gap-4 my-4">
              <button
                id="hireMeBtn"
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 hover:bg-blue-700 active:scale-95 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Hire Me
              </button>
              <button
                onClick={generateCV}
                disabled={cvLoading}
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-full font-semibold bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-md active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {cvLoading ? 'Generating...' : 'Download CV'}
              </button>
            </div>
            <div id="statsContainer" className="stats stagger-reveal flex gap-6 mt-6">
              <div className="stat-card bg-white dark:bg-slate-800 p-4 rounded-2xl text-center min-w-[110px] shadow"><div className="stat-number text-3xl font-extrabold text-blue-600" id="expCount">0</div><div>Experience (yrs)</div></div>
              <div className="stat-card bg-white dark:bg-slate-800 p-4 rounded-2xl text-center min-w-[110px] shadow"><div className="stat-number text-3xl font-extrabold text-blue-600" id="projectCount">0</div><div>Projects done</div></div>
              <div className="stat-card bg-white dark:bg-slate-800 p-4 rounded-2xl text-center min-w-[110px] shadow"><div className="stat-number text-3xl font-extrabold text-blue-600" id="clientCount">0</div><div>Happy Clients</div></div>
            </div>
          </div>
          <div className="hero-right scroll-reveal reveal-zoom flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-blue-100 to-slate-300 dark:from-blue-900 dark:to-slate-700 rounded-[40%_60%_30%_70%/50%_40%_60%_50%] flex items-center justify-center shadow-xl backdrop-blur-sm">
              <img src={darkMode ? "/profile-dark.png" : "/profile-light.png"} alt="Suleman Farooq" className="w-[90%] h-[90%] object-cover rounded-[30%_70%_40%_60%/50%_40%_60%_50%] border-4 border-white dark:border-slate-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}