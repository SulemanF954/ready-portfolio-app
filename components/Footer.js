export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-10 mt-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="footer-content stagger-reveal flex flex-col justify-between items-center gap-6">
          <div className="footer-logo flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SF</span>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Sulemanfarooq</div>
          </div>
          <div className="footer-nav flex gap-6">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#portfolio" className="hover:text-white">Portfolio</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <div className="footer-social flex gap-4 text-2xl">
            <a href="https://www.linkedin.com/in/sulemanfarooq" className="hover:text-white"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/SulemanF954" className="hover:text-white"><i className="fab fa-github"></i></a>
            <a href="https://www.facebook.com/sulemanfarooq" className="hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/sulemanfarooq" className="hover:text-white"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="footer-contact flex gap-4">
            <p><i className="far fa-envelope"></i> sulemanfarooq954@gmail.com</p>
            <p><i className="fas fa-phone-alt"></i> +92307-6315295</p>
          </div>
        </div>
        <div className="copyright scroll-reveal reveal-up text-center text-sm border-t border-slate-800 pt-6 mt-6">
          Designed by @Suleman Farooq — QA Tester & Frontend Developer
        </div>
      </div>
    </footer>
  );
}