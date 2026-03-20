import type { Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Properly-typed, reusable Framer Motion animation variants
   All ease values use named strings to satisfy TS strict checks
───────────────────────────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: "easeOut" },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 55 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -55 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: "easeOut" },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: "easeOut" },
  }),
};
