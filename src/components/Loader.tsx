import { motion, AnimatePresence } from "framer-motion";
import LogoBrand from "./LogoBrand";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#F8F5F0" }}
        >
          {/* Radial ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212,175,55,0.09) 0%, transparent 70%)",
            }}
          />

          {/* Corner leaf accents */}
          {[
            { pos: "top-6 left-6", rotate: "-30deg" },
            { pos: "top-6 right-6", rotate: "30deg" },
            { pos: "bottom-6 left-6", rotate: "-150deg" },
            { pos: "bottom-6 right-6", rotate: "150deg" },
          ].map(({ pos, rotate }, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} pointer-events-none`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 40 40"
                fill="none"
                style={{ transform: `rotate(${rotate})` }}
              >
                <path
                  d="M20 38C9 38 2 28 2 18C2 6 11 1 20 3C29 1 38 6 38 18C38 28 31 38 20 38Z"
                  fill="#6B8E23"
                />
                <line
                  x1="20"
                  y1="38"
                  x2="20"
                  y2="3"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          ))}

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center gap-7">
            {/* Logo — grows from tiny with a spring bounce */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
                delay: 0.15,
              }}
            >
              {/* Glow ring behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.8, 1.5], opacity: [0, 0.28, 0] }}
                transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(107,142,35,0.45) 0%, transparent 70%)",
                }}
              />

              <LogoBrand variant="dark" height={130} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.52, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.74rem",
                fontStyle: "italic",
                letterSpacing: "0.06em",
                color: "#3E2F1C",
              }}
            >
              Pure. Natural. Trusted by Tradition.
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              style={{ width: "200px" }}
            >
              {/* Track */}
              <div
                style={{
                  width: "100%",
                  height: "3px",
                  borderRadius: "999px",
                  background: "rgba(62,47,28,0.1)",
                  overflow: "hidden",
                }}
              >
                {/* Fill */}
                <motion.div
                  style={{
                    height: "100%",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(to right, #D4AF37, #6B8E23, #D4AF37)",
                    backgroundSize: "200% 100%",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2.1,
                    delay: 0.85,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Honey-drip dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    width: i === 1 || i === 2 ? "8px" : "6px",
                    height: i === 1 || i === 2 ? "8px" : "6px",
                    borderRadius: "50%",
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg,#D4AF37,#b8961f)"
                        : "linear-gradient(135deg,#6B8E23,#506a1a)",
                  }}
                  animate={{ y: [0, -9, 0] }}
                  transition={{
                    duration: 0.82,
                    repeat: Infinity,
                    delay: i * 0.13,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
