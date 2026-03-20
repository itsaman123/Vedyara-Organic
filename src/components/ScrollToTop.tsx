import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollPercent(Math.min(percent, 100));
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full focus:outline-none group"
          style={{
            background: "linear-gradient(135deg, #3E2F1C, #5a4532)",
            boxShadow: "0 6px 24px rgba(62,47,28,0.35)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* SVG progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            {/* Track ring */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="rgba(212,175,55,0.2)"
              strokeWidth="2.5"
            />
            {/* Progress ring */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.25s ease" }}
            />
          </svg>

          {/* Arrow icon */}
          <motion.span
            className="relative z-10 text-brand-gold"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <FiArrowUp size={20} strokeWidth={2.5} color="#D4AF37" />
          </motion.span>

          {/* Tooltip */}
          <span
            className="absolute right-full mr-3 px-2.5 py-1 rounded-lg text-xs font-medium text-brand-cream whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
            style={{ background: "rgba(62,47,28,0.9)" }}
          >
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
