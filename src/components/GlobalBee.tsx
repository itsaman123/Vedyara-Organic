import { motion } from "framer-motion";

export default function GlobalBee() {
  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      initial={{ x: "-10vw", y: 0 }}
      animate={{
        x: ["-10vw", "110vw"],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        top: "25%",
      }}
    >
      <motion.div
        animate={{
          y: [-25, 25],
          rotate: [-5, 5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Bee body */}
          <ellipse cx="24" cy="24" rx="14" ry="10" fill="#F5D033" />

          {/* Stripes */}
          <path d="M16 20h4v8h-4z" fill="#1A1A1A" />
          <path d="M24 19h4v10h-4z" fill="#1A1A1A" />
          <path d="M32 20h2v8h-2z" fill="#1A1A1A" />

          {/* Back Wing */}
          <motion.ellipse
            cx="14"
            cy="18"
            rx="8"
            ry="5"
            fill="rgba(255,255,255,0.7)"
            stroke="rgba(200,200,200,0.5)"
            strokeWidth="0.5"
            style={{ originX: "22px", originY: "24px" }}
            animate={{ rotate: [-20, 20] }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
          />

          {/* Front Wing */}
          <motion.ellipse
            cx="14"
            cy="30"
            rx="8"
            ry="5"
            fill="rgba(255,255,255,0.9)"
            stroke="rgba(200,200,200,0.5)"
            strokeWidth="0.5"
            style={{ originX: "22px", originY: "24px" }}
            animate={{ rotate: [20, -20] }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
          />

          {/* Eyes */}
          <circle cx="32" cy="22" r="2" fill="#1A1A1A" />
          <circle cx="36" cy="21" r="1.5" fill="white" opacity="0.6" />

          {/* Antennae */}
          <path
            d="M34 18 Q36 14 35 11"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M36 18 Q38 14 37 11"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
