/**
 * Shared floating action button with tooltip and pulse ring.
 *
 * Used by FloatingWhatsApp (left) and ScrollToTop (right).
 */
export default function FloatingButton({
  position = 'right',
  tooltipIcon,
  tooltipText,
  pulseColor = 'bg-blue-500',
  gradientClasses = 'from-blue-500 to-indigo-600',
  ringClasses = 'focus:ring-blue-400/50',
  shadowClasses = 'shadow-blue-500/30 hover:shadow-blue-500/50',
  icon,
  ariaLabel,
  href,
  onClick,
  visible = true,
}) {
  if (!visible) return null;

  const isLeft = position === 'left';
  const posClass = isLeft ? 'left-6' : 'right-6';

  // Tooltip positioning mirrors on each side
  const tooltipPos = isLeft
    ? 'left-full ml-4 -translate-x-2 group-hover:translate-x-0'
    : 'right-full mr-4 translate-x-2 group-hover:translate-x-0';
  const arrowPos = isLeft
    ? '-left-1.5 border-l border-t rotate-45'
    : '-right-1.5 border-r border-t rotate-45';

  const buttonClasses = `flex items-center justify-center w-12 h-12 rounded-full
    bg-gradient-to-br ${gradientClasses}
    text-white shadow-2xl ${shadowClasses}
    transition-all duration-300 hover:scale-110 active:scale-95
    focus:outline-none focus:ring-4 ${ringClasses}`;

  const sharedContent = (
    <>
      {/* Tooltip */}
      <div
        className={`absolute ${tooltipPos} top-1/2 -translate-y-1/2 whitespace-nowrap
          bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
          text-slate-800 dark:text-white text-sm font-medium
          px-4 py-2 rounded-xl shadow-lg
          border border-white/20 dark:border-slate-700/50
          opacity-0 group-hover:opacity-100 transition-all duration-300
          pointer-events-none`}
      >
        <span className="flex items-center gap-2">
          <i className={`${tooltipIcon} text-base`}></i>
          {tooltipText}
        </span>
        <div
          className={`absolute ${arrowPos} top-1/2 -translate-y-1/2 w-3 h-3
            bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
            border-white/20 dark:border-slate-700/50`}
        ></div>
      </div>

      {/* Pulse ring */}
      <div className={`absolute inset-0 rounded-full ${pulseColor} -z-10 animate-ping opacity-30`}></div>
    </>
  );

  // Render as <a> when href is provided, otherwise <button>
  if (href) {
    return (
      <div className={`fixed bottom-6 ${posClass} z-50 group`}>
        {sharedContent}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          aria-label={ariaLabel}
        >
          <i className={`${icon} text-2xl`}></i>
        </a>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 ${posClass} z-50 group`}>
      {sharedContent}
      <button onClick={onClick} className={buttonClasses} aria-label={ariaLabel}>
        <i className={`${icon} text-2xl`}></i>
      </button>
    </div>
  );
}
