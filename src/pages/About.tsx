import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FarmImage from "../../public/farm-image.jpg";
import BeeFarm from "../../public/bee-farm.jpg";
import HoneyBottle from '../../public/honey-bottle.png';
import {
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiGlobe,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import { FaLeaf, FaQuoteLeft } from "react-icons/fa";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer as stagger,
} from "../utils/animations";

/* ─────────────────────────────────────────────────────────────
   Section eyebrow tag
───────────────────────────────────────────────────────────── */
const SectionTag = ({
  label,
  light = false,
}: {
  label: string;
  light?: boolean;
}) => (
  <div className="inline-flex items-center gap-2 mb-4">
    <div
      className="w-6 h-px"
      style={{
        background: `linear-gradient(to right, transparent, ${light ? "#F8F5F0" : "#D4AF37"})`,
      }}
    />
    <span
      className="text-xs font-semibold uppercase tracking-widest"
      style={{
        color: light ? "rgba(248,245,240,0.7)" : "#D4AF37",
        letterSpacing: "0.22em",
      }}
    >
      {label}
    </span>
    <div
      className="w-6 h-px"
      style={{
        background: `linear-gradient(to left, transparent, ${light ? "#F8F5F0" : "#D4AF37"})`,
      }}
    />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Leaf SVG
───────────────────────────────────────────────────────────── */
const LeafSVG = ({
  size = 40,
  opacity = 0.2,
}: {
  size?: number;
  opacity?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    style={{ opacity }}
  >
    <path
      d="M20 38 C9 38 2 28 2 18 C2 6 11 1 20 3 C29 1 38 6 38 18 C38 28 31 38 20 38Z"
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
);

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */
const values = [
  {
    icon: "🌿",
    title: "Purity First",
    description:
      "Every product we offer is certified organic, free from synthetic pesticides, chemicals, or artificial additives. Purity is non-negotiable.",
    color: "rgba(107,142,35,0.12)",
    border: "rgba(107,142,35,0.2)",
  },
  {
    icon: "🤝",
    title: "Farmer First",
    description:
      "We pay our farmers fair prices, cut out middlemen, and build long-term partnerships that empower rural communities to thrive.",
    color: "rgba(212,175,55,0.1)",
    border: "rgba(212,175,55,0.2)",
  },
  {
    icon: "🔬",
    title: "Science Backed",
    description:
      "Every batch is tested in certified laboratories for purity, nutritional content, and safety — before it ever reaches your family.",
    color: "rgba(62,47,28,0.07)",
    border: "rgba(62,47,28,0.12)",
  },
  {
    icon: "♻️",
    title: "Earth Friendly",
    description:
      "Our packaging is eco-conscious and minimal. We believe what's good for your body should also be good for the planet.",
    color: "rgba(107,142,35,0.1)",
    border: "rgba(107,142,35,0.18)",
  },
  {
    icon: "🏡",
    title: "Community Driven",
    description:
      "Every purchase supports small-scale organic farmers, women's cooperatives, and rural livelihoods across India.",
    color: "rgba(212,175,55,0.08)",
    border: "rgba(212,175,55,0.16)",
  },
  {
    icon: "💛",
    title: "Trusted by Families",
    description:
      "Over 10,000 families across India choose Vedyara Organic for their daily nutrition — and we carry that trust with pride.",
    color: "rgba(62,47,28,0.06)",
    border: "rgba(62,47,28,0.1)",
  },
];

const milestones = [
  {
    year: "2019",
    event:
      "Vedyara Organic founded with a vision to bring pure food to every Indian home",
  },
  {
    year: "2020",
    event:
      "First products launched — Himalayan Wild Honey and Organic Jaggery Powder",
  },
  {
    year: "2021",
    event: "Launched on Amazon India; crossed 1,000 orders in first 3 months",
  },
  {
    year: "2022",
    event:
      "Expanded to millets & pulses range; reached 200+ farmer partnerships",
  },
  {
    year: "2023",
    event: "Launched women farmer empowerment initiative across 5 states",
  },
  {
    year: "2024",
    event:
      "10,000+ happy customers; planning NGO for organic farming education",
  },
];

const teamValues = [
  { icon: <FiHeart size={18} />, label: "Passion for Purity" },
  { icon: <FiGlobe size={18} />, label: "Farm Transparency" },
  { icon: <FiUsers size={18} />, label: "Rural Empowerment" },
  { icon: <FiAward size={18} />, label: "Quality Standards" },
];

/* ═══════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <main
      className="relative overflow-x-hidden"
      style={{ background: "#F8F5F0" }}
    >
      {/* ════════════════════════════════════════════════════
          1. HERO BANNER
      ════════════════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1a1208 0%, #2a1f12 45%, #3e2f1c 75%, #2a1f12 100%)",
        }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(107,142,35,0.07) 0%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-24 left-10 opacity-15 pointer-events-none">
          <motion.div
            animate={{ rotate: [-8, 8, -8], y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafSVG size={60} opacity={1} />
          </motion.div>
        </div>
        <div className="absolute top-16 right-12 opacity-10 pointer-events-none">
          <motion.div
            animate={{ rotate: [6, -6, 6], y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafSVG size={44} opacity={1} />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: Text */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              {/* Breadcrumb */}
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{
                  color: "rgba(212,175,55,0.65)",
                  letterSpacing: "0.2em",
                }}
              >
                Vedyara Organic &nbsp;/&nbsp; About Us
              </motion.p>

              <SectionTag label="Our Story" light />

              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="font-serif font-bold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
              >
                Rooted in Nature. <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #D4AF37, #f0d060, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Built on Trust.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-base leading-relaxed mb-5"
                style={{ color: "rgba(248,245,240,0.65)" }}
              >
                Vedyara Organic was born from a deep belief that every Indian
                family deserves food that is truly pure — grown without
                chemicals, processed without shortcuts, and delivered with
                complete transparency.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={0.3}
                className="text-base leading-relaxed mb-8"
                style={{ color: "rgba(248,245,240,0.55)" }}
              >
                We started small, with two products and a handful of farmer
                partners. Today, we work with 200+ organic farms across India
                and reach thousands of homes — but our promise has never
                changed.
              </motion.p>

              {/* Quick stats */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {[
                  { value: "2019", label: "Founded" },
                  { value: "200+", label: "Farm Partners" },
                  { value: "10K+", label: "Families Served" },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    variants={fadeUp}
                    custom={0.1}
                    className="text-center p-4 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(212,175,55,0.15)",
                    }}
                  >
                    <p
                      className="font-serif font-bold text-xl leading-none mb-1"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(248,245,240,0.45)" }}
                    >
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.5}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                    color: "#3E2F1C",
                    boxShadow: "0 8px 28px rgba(212,175,55,0.4)",
                  }}
                >
                  <span>Explore Our Products</span>
                  <FiArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(248,245,240,0.85)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                  }}
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Image mosaic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative hidden lg:block"
            >
              {/* Main image */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ paddingBottom: "110%" }}
              >
                <img
                  src={FarmImage}
                  alt="Organic farm landscape"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(26,18,8,0.6) 100%)",
                  }}
                />
              </div>

              {/* Floating overlay card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -bottom-6 -left-8 p-5 rounded-2xl"
                style={{
                  background: "white",
                  boxShadow: "0 12px 40px rgba(62,47,28,0.18)",
                  minWidth: "180px",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#6B8E23", letterSpacing: "0.15em" }}
                >
                  Our Commitment
                </p>
                <p
                  className="font-serif font-bold text-lg leading-tight"
                  style={{ color: "#3E2F1C" }}
                >
                  Zero
                  <br />
                  Compromise
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <FaLeaf size={12} color="#6B8E23" />
                  <span
                    className="text-xs"
                    style={{ color: "rgba(62,47,28,0.55)" }}
                  >
                    100% Organic Always
                  </span>
                </div>
              </motion.div>

              {/* Small secondary image */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -top-5 -right-6 w-32 h-32 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 8px 24px rgba(62,47,28,0.22)",
                  border: "3px solid rgba(248,245,240,0.15)",
                }}
              >
                <img
                  src={BeeFarm}
                  alt="Pure honey"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ lineHeight: 0 }}
        >
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "70px" }}
          >
            <path
              d="M0 70 Q360 10 720 50 Q1080 90 1440 20 L1440 70 Z"
              fill="#F8F5F0"
            />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. MISSION STATEMENT
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#F8F5F0" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <SectionTag label="Our Mission" />

            <motion.blockquote
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold leading-tight mb-8 relative"
              style={{
                fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)",
                color: "#3E2F1C",
              }}
            >
              {/* Big quote mark */}
              <FaQuoteLeft
                size={40}
                style={{
                  color: "rgba(212,175,55,0.2)",
                  position: "absolute",
                  top: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
              <span className="relative z-10 block mt-8">
                "To make pure, honest food accessible to every Indian family —
                by empowering the farmers who grow it and{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  honouring the land
                </span>{" "}
                that sustains us."
              </span>
            </motion.blockquote>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-base leading-relaxed max-w-2xl mx-auto"
              style={{ color: "rgba(62,47,28,0.62)" }}
            >
              We believe that organic food shouldn't be a luxury. With direct
              farm partnerships and a no-middleman model, we keep prices fair
              while keeping quality uncompromisingly high.
            </motion.p>

            {/* Team values row */}
            <motion.div
              variants={stagger}
              className="flex flex-wrap items-center justify-center gap-4 mt-10"
            >
              {teamValues.map(({ icon, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={0.1}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full"
                  style={{
                    background: "white",
                    border: "1.5px solid rgba(212,175,55,0.2)",
                    boxShadow: "0 4px 14px rgba(62,47,28,0.07)",
                    color: "#3E2F1C",
                  }}
                >
                  <span style={{ color: "#D4AF37" }}>{icon}</span>
                  <span className="text-sm font-semibold">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. BRAND STORY — Two-column
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#EDE8E0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              variants={fadeRight}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ paddingBottom: "75%" }}
              >
                <img
                  src={HoneyBottle}
                  alt="Organic farm worker"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 60%, rgba(22,14,5,0.45) 100%)",
                  }}
                />
              </div>

              {/* Stat card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -top-5 -right-5 sm:-right-8 p-5 rounded-2xl"
                style={{
                  background: "white",
                  boxShadow: "0 10px 36px rgba(62,47,28,0.15)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: "#D4AF37" }}
                >
                  Impact
                </p>
                <p
                  className="font-serif font-bold text-2xl"
                  style={{ color: "#3E2F1C" }}
                >
                  200+
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(62,47,28,0.55)" }}
                >
                  Farmer Partnerships
                </p>
              </motion.div>

              {/* Bottom quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="absolute -bottom-5 left-4 sm:left-8 right-4 sm:right-16 p-4 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #3E2F1C, #5a4532)",
                  boxShadow: "0 8px 28px rgba(62,47,28,0.3)",
                }}
              >
                <p
                  className="text-sm italic font-medium"
                  style={{ color: "rgba(248,245,240,0.85)" }}
                >
                  "Every grain tells the story of the farmer who grew it."
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(212,175,55,0.7)" }}
                >
                  — Vedyara Organic Founding Principle
                </p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionTag label="How We Started" />

              <motion.h2
                variants={fadeUp}
                custom={0.1}
                className="font-serif font-bold leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                  color: "#3E2F1C",
                }}
              >
                A Small Dream,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  A Powerful Purpose
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-base leading-relaxed mb-5"
                style={{ color: "rgba(62,47,28,0.68)" }}
              >
                It began with a simple question: why is it so hard to find food
                that's genuinely pure? Our founder, raised in a household where
                fresh, whole foods from local farms were the norm, noticed how
                industrialisation had stripped nutrition and authenticity from
                everyday ingredients.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={0.3}
                className="text-base leading-relaxed mb-8"
                style={{ color: "rgba(62,47,28,0.68)" }}
              >
                In 2019, Vedyara Organic launched with just two SKUs — a jar of
                Himalayan wild honey and a pack of stone-ground jaggery powder.
                Both sold out in weeks. The response confirmed what we believed:
                people were hungry for something real.
              </motion.p>

              {/* Timeline dots */}
              <motion.div variants={stagger} className="space-y-4">
                {milestones.slice(0, 4).map((m) => (
                  <motion.div
                    key={m.year}
                    variants={fadeUp}
                    custom={0.08}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                        style={{
                          background:
                            "linear-gradient(135deg, #D4AF37, #e8c84a)",
                          color: "#3E2F1C",
                        }}
                      >
                        {m.year.slice(2)}
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <p
                        className="text-xs font-bold mb-0.5"
                        style={{ color: "#D4AF37" }}
                      >
                        {m.year}
                      </p>
                      <p
                        className="text-sm leading-snug"
                        style={{ color: "rgba(62,47,28,0.68)" }}
                      >
                        {m.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. OUR VALUES GRID
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#F8F5F0" }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <SectionTag label="Our Values" />
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Principles We Never{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Compromise On
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="max-w-xl mx-auto text-sm"
              style={{ color: "rgba(62,47,28,0.58)" }}
            >
              These aren't just brand statements. They are the principles that
              guide every sourcing decision, every product launch, and every
              partnership we build.
            </motion.p>
          </motion.div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-3xl bg-white transition-all duration-400"
                style={{
                  boxShadow: "0 2px 20px rgba(62,47,28,0.07)",
                  border: `1px solid ${v.border}`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                  style={{
                    background: v.color,
                    border: `1px solid ${v.border}`,
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  className="font-serif font-bold text-lg mb-3"
                  style={{ color: "#3E2F1C" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(62,47,28,0.62)" }}
                >
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. JOURNEY / FULL TIMELINE
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1a1208 0%, #2a1f12 45%, #3e2f1c 100%)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <SectionTag label="Our Journey" light />
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-white"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              5 Years of{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Growing Together
              </span>
            </motion.h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div
              className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(212,175,55,0.5), rgba(212,175,55,0.1))",
                transform: "translateX(-50%)",
              }}
            />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                >
                  {/* Content card */}
                  <div
                    className={`ml-14 sm:ml-0 sm:w-[calc(50%-32px)] ${i % 2 === 0
                        ? "sm:pr-10 sm:text-right"
                        : "sm:pl-10 sm:text-left"
                      }`}
                  >
                    <div
                      className="inline-block p-5 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(212,175,55,0.14)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-2"
                        style={{ color: "#D4AF37" }}
                      >
                        {m.year}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(248,245,240,0.65)" }}
                      >
                        {m.event}
                      </p>
                    </div>
                  </div>

                  {/* Centre dot */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-4 sm:top-5 z-10">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                        boxShadow: "0 0 0 4px rgba(212,175,55,0.15)",
                      }}
                    />
                  </div>

                  {/* Spacer for alternating side */}
                  <div className="hidden sm:block sm:w-[calc(50%-32px)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. NGO VISION SECTION
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#F8F5F0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionTag label="Beyond Business" />

              <motion.h2
                variants={fadeUp}
                custom={0.1}
                className="font-serif font-bold leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                  color: "#3E2F1C",
                }}
              >
                A Vision for{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Rural India
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-base leading-relaxed mb-5"
                style={{ color: "rgba(62,47,28,0.68)" }}
              >
                Vedyara Organic has always been more than a food brand. From day
                one, our mission has been intertwined with the people who grow
                our food — India's small-scale, organic farmers.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={0.3}
                className="text-base leading-relaxed mb-8"
                style={{ color: "rgba(62,47,28,0.68)" }}
              >
                We are actively building toward the launch of a not-for-profit
                foundation that will provide organic farming education, soil
                health support, and fair-trade infrastructure to farming
                communities across rural India.
              </motion.p>

              {/* NGO pillars */}
              <motion.div variants={stagger} className="space-y-3 mb-8">
                {[
                  "Free organic farming workshops in 10 states",
                  "Soil health testing & regenerative farming support",
                  "Scholarships for children of farmer partners",
                  "Women-led farming cooperative empowerment",
                  "Digital market access for small organic farms",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    custom={0.07}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(107,142,35,0.15)" }}
                    >
                      <FiCheck
                        size={11}
                        style={{ color: "#506a1a" }}
                        strokeWidth={3}
                      />
                    </div>
                    <span
                      className="text-sm leading-snug"
                      style={{ color: "rgba(62,47,28,0.72)" }}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.5}
                className="flex items-center gap-3 p-5 rounded-2xl"
                style={{
                  background: "rgba(107,142,35,0.08)",
                  border: "1.5px solid rgba(107,142,35,0.18)",
                }}
              >
                <span className="text-3xl">🌱</span>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#3E2F1C" }}
                  >
                    Foundation Launch: 2025
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(62,47,28,0.55)" }}
                  >
                    Every Vedyara purchase contributes to this mission
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image grid */}
            <motion.div
              variants={fadeLeft}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  src: FarmImage,
                  alt: "Farm landscape",
                  className: "col-span-2 row-span-1",
                  height: "220px",
                },
                {
                  src: BeeFarm,
                  alt: "Millet field",
                  className: "col-span-1",
                  height: "180px",
                },
                {
                  src: HoneyBottle,
                  alt: "Organic lentils",
                  className: "col-span-1",
                  height: "180px",
                },
              ].map((img) => (
                <div
                  key={img.alt}
                  className={`${img.className} rounded-2xl overflow-hidden img-zoom-wrap`}
                  style={{ height: img.height }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{ minHeight: "100%" }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. TRUST / CERTIFICATIONS SECTION
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ background: "#EDE8E0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs font-semibold uppercase tracking-widest mb-8"
              style={{ color: "rgba(62,47,28,0.45)", letterSpacing: "0.2em" }}
            >
              Certifications & Standards
            </motion.p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                {
                  icon: "🏆",
                  label: "FSSAI Certified",
                  sublabel: "Food Safety Approved",
                },
                {
                  icon: "🌿",
                  label: "Organic Certified",
                  sublabel: "Chemical Free",
                },
                {
                  icon: "🔬",
                  label: "Lab Verified",
                  sublabel: "3rd Party Tested",
                },
                {
                  icon: "🚜",
                  label: "Farm Traced",
                  sublabel: "100% Transparent",
                },
                { icon: "♻️", label: "Eco Packaging", sublabel: "Sustainable" },
                { icon: "🤝", label: "Fair Trade", sublabel: "Farmer First" },
              ].map((cert, i) => (
                <motion.div
                  key={cert.label}
                  variants={fadeUp}
                  custom={0.06 * i}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white transition-all duration-300"
                  style={{
                    boxShadow: "0 2px 14px rgba(62,47,28,0.07)",
                    minWidth: "110px",
                  }}
                >
                  <span className="text-2xl">{cert.icon}</span>
                  <p
                    className="font-semibold text-xs text-center"
                    style={{ color: "#3E2F1C" }}
                  >
                    {cert.label}
                  </p>
                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(62,47,28,0.45)" }}
                  >
                    {cert.sublabel}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          8. CTA BANNER
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-24 overflow-hidden cta-banner">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src={FarmImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <SectionTag label="Join the Movement" light />

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Be Part of the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Pure Food Revolution
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-base mb-10 max-w-xl mx-auto"
              style={{ color: "rgba(248,245,240,0.62)", fontWeight: 300 }}
            >
              Every purchase you make supports organic farmers, funds rural
              education, and brings us one step closer to a healthier, more
              honest food ecosystem.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.35}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                className="flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base"
                style={{
                  background: "rgba(248,245,240,0.15)",
                  color: "rgba(248,245,240,0.5)",
                  cursor: "not-allowed",
                  userSelect: "none",
                }}
              >
                <span>Coming Soon</span>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 group"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(248,245,240,0.85)",
                    border: "1.5px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span>Partner with Us</span>
                  <FiArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
