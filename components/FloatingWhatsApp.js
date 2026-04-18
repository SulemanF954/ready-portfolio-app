// components/FloatingWhatsApp.js
export default function FloatingWhatsApp() {
  const phoneNumber = '923076315295';
  const message = 'Hi Suleman, I visited your portfolio and would like to connect.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Modern Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap
                      bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
                      text-slate-800 dark:text-white text-sm font-medium
                      px-4 py-2 rounded-xl shadow-lg
                      border border-white/20 dark:border-slate-700/50
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      pointer-events-none translate-x-2 group-hover:translate-x-0">
        <span className="flex items-center gap-2">
          <i className="fab fa-whatsapp text-green-500 text-base"></i>
          Chat with me
        </span>
        {/* Arrow */}
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 
                        bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
                        border-r border-t border-white/20 dark:border-slate-700/50
                        rotate-45"></div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full 
                   bg-gradient-to-br from-green-400 to-green-600 
                   text-white shadow-2xl shadow-green-500/30 
                   hover:shadow-green-500/50 transition-all duration-300 
                   hover:scale-110 active:scale-95 
                   focus:outline-none focus:ring-4 focus:ring-green-400/50"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>

      {/* Subtle pulse ring animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 -z-10 animate-ping opacity-30"></div>
    </div>
  );
}