import { motion } from "framer-motion";
import { useMemo } from "react";

interface LeafConfig {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  driftX: number;
}

const LeafSVG = ({
  size,
  color,
  rotate,
}: {
  size: number;
  color: string;
  rotate: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path
      d="M20 38 C10 38 3 29 3 20 C3 8 12 2 20 4 C28 2 37 8 37 20 C37 29 30 38 20 38 Z"
      fill={color}
      fillOpacity="0.85"
    />
    <path
      d="M20 38 C20 38 20 4 20 4"
      stroke={color}
      strokeWidth="1.2"
      strokeOpacity="0.5"
      fill="none"
    />
    <path
      d="M20 22 C14 18 8 16 6 12"
      stroke={color}
      strokeWidth="0.8"
      strokeOpacity="0.4"
      fill="none"
    />
    <path
      d="M20 22 C26 18 32 16 34 12"
      stroke={color}
      strokeWidth="0.8"
      strokeOpacity="0.4"
      fill="none"
    />
  </svg>
);

const SmallLeafSVG = ({
  size,
  color,
}: {
  size: number;
  color: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 28 C5 28 1 21 1 14 C1 5 7 1 12 3 C17 1 23 5 23 14 C23 21 19 28 12 28 Z"
      fill={color}
      fillOpacity="0.7"
    />
    <line
      x1="12"
      y1="28"
      x2="12"
      y2="3"
      stroke={color}
      strokeWidth="1"
      strokeOpacity="0.45"
    />
  </svg>
);

const GrainParticleSVG = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size}
    height={size * 2.5}
    viewBox="0 0 10 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="5" cy="12.5" rx="4" ry="11" fill={color} fillOpacity="0.6" />
  </svg>
);

export default function FloatingLeaves() {
  const leaves: LeafConfig[] = useMemo(
    () => [
      {
        id: 1,
        x: 5,
        size: 22,
        duration: 18,
        delay: 0,
        opacity: 0.18,
        rotate: 20,
        driftX: 40,
      },
      {
        id: 2,
        x: 15,
        size: 14,
        duration: 22,
        delay: 3,
        opacity: 0.14,
        rotate: -35,
        driftX: -30,
      },
      {
        id: 3,
        x: 28,
        size: 18,
        duration: 16,
        delay: 6,
        opacity: 0.16,
        rotate: 55,
        driftX: 25,
      },
      {
        id: 4,
        x: 42,
        size: 11,
        duration: 25,
        delay: 1.5,
        opacity: 0.12,
        rotate: -20,
        driftX: -45,
      },
      {
        id: 5,
        x: 58,
        size: 20,
        duration: 19,
        delay: 8,
        opacity: 0.15,
        rotate: 70,
        driftX: 35,
      },
      {
        id: 6,
        x: 70,
        size: 13,
        duration: 23,
        delay: 4,
        opacity: 0.13,
        rotate: -50,
        driftX: -20,
      },
      {
        id: 7,
        x: 82,
        size: 17,
        duration: 20,
        delay: 10,
        opacity: 0.17,
        rotate: 30,
        driftX: 50,
      },
      {
        id: 8,
        x: 92,
        size: 15,
        duration: 17,
        delay: 5,
        opacity: 0.12,
        rotate: -60,
        driftX: -35,
      },
      {
        id: 9,
        x: 35,
        size: 9,
        duration: 28,
        delay: 12,
        opacity: 0.1,
        rotate: 80,
        driftX: 20,
      },
      {
        id: 10,
        x: 75,
        size: 12,
        duration: 21,
        delay: 2,
        opacity: 0.11,
        rotate: -15,
        driftX: -28,
      },
    ],
    []
  );

  const grains = useMemo(
    () => [
      { id: 1, x: 10, size: 6, duration: 14, delay: 0, opacity: 0.12 },
      { id: 2, x: 30, size: 5, duration: 17, delay: 4, opacity: 0.1 },
      { id: 3, x: 55, size: 7, duration: 12, delay: 7, opacity: 0.13 },
      { id: 4, x: 78, size: 5, duration: 19, delay: 2, opacity: 0.09 },
      { id: 5, x: 88, size: 6, duration: 15, delay: 9, opacity: 0.11 },
    ],
    []
  );

  const leafColors = ["#6B8E23", "#7fa828", "#506a1a", "#5d7d1f", "#4a6b15"];
  const grainColors = ["#D4AF37", "#b8961f", "#c9a22e"];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Large leaves */}
      {leaves.map((leaf, i) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            bottom: "-60px",
            opacity: leaf.opacity,
            willChange: "transform",
          }}
          animate={{
            y: [0, -(window.innerHeight + 120)],
            x: [0, leaf.driftX, leaf.driftX * 0.6, leaf.driftX * 1.2, 0],
            rotate: [leaf.rotate, leaf.rotate + 180, leaf.rotate + 360],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {i % 3 === 0 ? (
            <LeafSVG
              size={leaf.size}
              color={leafColors[i % leafColors.length]}
              rotate={0}
            />
          ) : (
            <SmallLeafSVG
              size={leaf.size}
              color={leafColors[i % leafColors.length]}
            />
          )}
        </motion.div>
      ))}

      {/* Grain particles */}
      {grains.map((grain, i) => (
        <motion.div
          key={`grain-${grain.id}`}
          className="absolute"
          style={{
            left: `${grain.x}%`,
            bottom: "-20px",
            opacity: grain.opacity,
            willChange: "transform",
          }}
          animate={{
            y: [0, -(window.innerHeight + 60)],
            rotate: [0, 180, 360],
            scale: [1, 0.85, 0.7],
          }}
          transition={{
            duration: grain.duration,
            delay: grain.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <GrainParticleSVG
            size={grain.size}
            color={grainColors[i % grainColors.length]}
          />
        </motion.div>
      ))}

      {/* Subtle ambient circles / pollen */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`pollen-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 14}%`,
            bottom: `-8px`,
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            background: `rgba(212,175,55,${0.08 + (i % 3) * 0.03})`,
            willChange: "transform",
          }}
          animate={{
            y: [0, -(window.innerHeight + 40)],
            x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 8)],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: 20 + i * 4,
            delay: i * 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
