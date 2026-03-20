import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiArrowRight,
  FiShoppingBag,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import { FaAmazon, FaStar, FaQuoteLeft } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import {
  featuredProducts,
  testimonials,
  whyChooseUs,
  stats,
} from "../data/products";
import type { Product } from "../data/products";
import { fadeUp, fadeRight, staggerContainer } from "../utils/animations";

/* ─────────────────────────────────────────────────────────────
   Hero grain particles
───────────────────────────────────────────────────────────── */
const grainConfigs = [
  { x: "12%", delay: 0, duration: 7 },
  { x: "28%", delay: 1.2, duration: 9 },
  { x: "44%", delay: 0.5, duration: 6 },
  { x: "61%", delay: 2, duration: 8 },
  { x: "76%", delay: 0.8, duration: 10 },
  { x: "88%", delay: 1.6, duration: 7 },
];

/* ─────────────────────────────────────────────────────────────
   Leaf SVG decoration
───────────────────────────────────────────────────────────── */
const LeafAccent = ({
  size = 40,
  opacity = 0.25,
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
   Section divider with leaf
───────────────────────────────────────────────────────────── */
const SectionTag = ({ label }: { label: string }) => (
  <motion.div
    variants={fadeUp}
    custom={0}
    className="inline-flex items-center gap-2 mb-4"
  >
    <div
      className="w-6 h-px"
      style={{ background: "linear-gradient(to right, transparent, #D4AF37)" }}
    />
    <span
      className="text-xs font-semibold uppercase tracking-widest"
      style={{ color: "#D4AF37", letterSpacing: "0.22em" }}
    >
      {label}
    </span>
    <div
      className="w-6 h-px"
      style={{ background: "linear-gradient(to left, transparent, #D4AF37)" }}
    />
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   Animated star row
───────────────────────────────────────────────────────────── */
const AnimatedStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <motion.span
        key={s}
        initial={{ scale: 0, rotate: -120 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: s * 0.07,
          type: "spring",
          stiffness: 280,
          damping: 18,
        }}
      >
        <FaStar
          size={14}
          style={{
            color: s <= rating ? "#D4AF37" : "rgba(212,175,55,0.25)",
          }}
        />
      </motion.span>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <main className="relative overflow-x-hidden">
      {/* ════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: heroY, scale: heroScale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85')",
            }}
          />
          {/* Multi-layer gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(22,14,5,0.7) 0%, rgba(22,14,5,0.42) 45%, rgba(22,14,5,0.68) 100%)",
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,2,0.55) 100%)",
            }}
          />
        </motion.div>

        {/* Grain overlay texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
            zIndex: 1,
          }}
        />

        {/* Floating grain particles */}
        {grainConfigs.map((g, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 pointer-events-none"
            style={{ left: g.x, zIndex: 2 }}
            animate={{ y: [0, -80, -160], opacity: [0, 0.6, 0] }}
            transition={{
              duration: g.duration,
              delay: g.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <svg width="6" height="14" viewBox="0 0 6 14" fill="none">
              <ellipse
                cx="3"
                cy="7"
                rx="2.5"
                ry="6"
                fill="#D4AF37"
                fillOpacity="0.7"
              />
            </svg>
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          {/* Pre-heading pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{
              background: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#D4AF37", letterSpacing: "0.2em" }}
            >
              🌿 &nbsp; 100% Organic · Farm to Home
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              className="font-serif font-bold text-white leading-[1.08]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
            >
              Pure.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37, #f0d060, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Natural.
              </span>
              <br />
              Trusted by Tradition.
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(248,245,240,0.78)", fontWeight: 300 }}
          >
            Handpicked millets, golden honey, organic jaggery, pulses & grains —
            straight from India's farms to your kitchen.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {/* Primary CTA */}
            <motion.a
              href="https://www.amazon.in"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37, #e8c84a, #D4AF37)",
                backgroundSize: "200% 200%",
                color: "#3E2F1C",
                boxShadow: "0 10px 35px rgba(212,175,55,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              <FaAmazon size={18} />
              <span>Shop on Amazon</span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/products"
                className="flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(248,245,240,0.92)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  letterSpacing: "0.03em",
                }}
              >
                <FiShoppingBag size={18} strokeWidth={2} />
                <span>Explore Products</span>
                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex items-center justify-center gap-6 flex-wrap"
          >
            {[
              "🌿 100% Organic",
              "🔬 Lab Tested",
              "🚜 Farm Direct",
              "🚫 No Chemicals",
            ].map((item) => (
              <span
                key={item}
                className="text-xs font-medium"
                style={{ color: "rgba(248,245,240,0.55)" }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={() => {
            document
              .getElementById("featured")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "rgba(212,175,55,0.6)", letterSpacing: "0.22em" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiChevronDown
              size={22}
              style={{ color: "rgba(212,175,55,0.6)" }}
            />
          </motion.div>
        </motion.div>

        {/* Corner decorative leaves */}
        <div
          className="absolute bottom-12 left-8 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={52} opacity={0.18} />
          </motion.div>
        </div>
        <div
          className="absolute top-32 right-8 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <motion.div
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={36} opacity={0.14} />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. STATS STRIP
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2a1f12 0%, #3e2f1c 50%, #2a1f12 100%)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center justify-center py-5 px-4 text-center"
              >
                <span
                  className="font-serif font-bold leading-none mb-1"
                  style={{
                    fontSize: "1.75rem",
                    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{
                    color: "rgba(248,245,240,0.5)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. FEATURED PRODUCTS
      ════════════════════════════════════════════════════ */}
      <section
        id="featured"
        className="relative py-20 lg:py-28 bg-texture-cream overflow-hidden"
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <SectionTag label="Featured Products" />
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Nature's Best,{" "}
              <span className="text-gradient-gold">Carefully Curated</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="max-w-xl mx-auto text-base leading-relaxed"
              style={{ color: "rgba(62,47,28,0.6)" }}
            >
              From golden wild honey to ancient grain millets — each product is
              sourced directly from trusted organic farms across India.
            </motion.p>
          </motion.div>

          {/* Product cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
            {featuredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
                index={idx}
              />
            ))}
          </div>

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 group hover:-translate-y-1"
              style={{
                border: "1.5px solid rgba(62,47,28,0.15)",
                color: "#3E2F1C",
                background: "white",
                boxShadow: "0 4px 14px rgba(62,47,28,0.06)",
              }}
            >
              <FiShoppingBag size={16} strokeWidth={2.2} />
              <span>View All Products</span>
              <FiArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. WHY CHOOSE US
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1a1208 0%, #2a1f12 40%, #3e2f1c 70%, #2a1f12 100%)",
        }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Leaf decorations */}
        <div className="absolute top-8 left-8 opacity-10 pointer-events-none">
          <motion.div
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={70} opacity={1} />
          </motion.div>
        </div>
        <div className="absolute bottom-8 right-8 opacity-8 pointer-events-none">
          <motion.div
            animate={{ rotate: [6, -6, 6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={55} opacity={0.8} />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <SectionTag label="Our Promise" />
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Why Choose{" "}
              <span className="text-gradient-gold">Vedyara Organic</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="max-w-lg mx-auto text-base"
              style={{ color: "rgba(248,245,240,0.55)" }}
            >
              No shortcuts. No compromise. Every product upholds our four core
              pillars of purity.
            </motion.p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-7 rounded-3xl text-center cursor-default group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.14)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 relative"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
                    border: "1px solid rgba(212,175,55,0.22)",
                  }}
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </motion.div>

                {/* Title */}
                <h3
                  className="font-serif font-bold mb-3 text-lg"
                  style={{ color: "#F8F5F0" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(248,245,240,0.5)" }}
                >
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(to right, #D4AF37, #6B8E23)",
                    transformOrigin: "center",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom certifications row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: "🏆", label: "FSSAI Certified" },
              { icon: "🌿", label: "Organic Certified" },
              { icon: "🔬", label: "Lab Verified" },
              { icon: "🚜", label: "Direct Farm" },
              { icon: "♻️", label: "Eco Packaging" },
            ].map((cert) => (
              <div
                key={cert.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                <span className="text-sm">{cert.icon}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "rgba(248,245,240,0.6)" }}
                >
                  {cert.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. STORY SECTION — From Farm to Your Home
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 bg-texture-cream overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(212,175,55,0.04), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image column */}
            <motion.div
              variants={fadeRight}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative order-2 lg:order-1"
            >
              {/* Main image */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ paddingBottom: "120%" }}
              >
                <div className="absolute inset-0 img-zoom-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80"
                    alt="Organic farm fields"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{
                      minHeight: "100%",
                      transition: "transform 0.7s ease",
                    }}
                  />
                  {/* Image overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 50%, rgba(22,14,5,0.5) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Floating "100% Organic" card */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-6 -right-4 sm:-right-8 p-5 rounded-2xl"
                style={{
                  background: "white",
                  boxShadow: "0 12px 40px rgba(62,47,28,0.15)",
                  minWidth: "160px",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#6B8E23", letterSpacing: "0.16em" }}
                >
                  Since 2019
                </p>
                <p
                  className="font-serif font-bold text-lg leading-tight"
                  style={{ color: "#3E2F1C" }}
                >
                  Trusted by
                  <br />
                  10,000+ families
                </p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={11} color="#D4AF37" />
                  ))}
                </div>
              </motion.div>

              {/* Secondary image (offset) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.65 }}
                className="absolute -top-6 -left-4 sm:-left-8 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 8px 24px rgba(62,47,28,0.18)",
                  border: "3px solid white",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80"
                  alt="Pure honey jar"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Text column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2"
            >
              <SectionTag label="Our Story" />

              <motion.h2
                variants={fadeUp}
                custom={0.1}
                className="font-serif font-bold leading-tight mb-6"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  color: "#3E2F1C",
                }}
              >
                From Farm to{" "}
                <span className="text-gradient-gold">Your Home</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-base leading-relaxed mb-5"
                style={{ color: "rgba(62,47,28,0.68)" }}
              >
                Vedyara Organic was born from a simple belief — that every
                family deserves food that is as pure and honest as nature
                intended. We work directly with small-scale farmers across
                India, paying fair prices and eliminating middlemen so that
                quality reaches your plate without compromise.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={0.3}
                className="text-base leading-relaxed mb-8"
                style={{ color: "rgba(62,47,28,0.68)" }}
              >
                From the Himalayan beehives to the millet fields of Rajasthan —
                every product carries the story of the land it grew on and the
                hands that nurtured it.
              </motion.p>

              {/* Values list */}
              <motion.div
                variants={staggerContainer}
                className="space-y-3 mb-10"
              >
                {[
                  "Direct partnerships with 200+ organic farmers",
                  "Zero middlemen — fresher products, better prices",
                  "Every batch lab-tested for purity & quality",
                  "Empowering rural communities & women farmers",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    custom={0.1}
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
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 group hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, #3E2F1C, #5a4532)",
                    color: "#F8F5F0",
                    boxShadow: "0 8px 24px rgba(62,47,28,0.25)",
                    letterSpacing: "0.03em",
                  }}
                >
                  <span>Read Our Story</span>
                  <FiArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href="https://www.amazon.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: "1.5px solid rgba(62,47,28,0.15)",
                    color: "#3E2F1C",
                    background: "transparent",
                    letterSpacing: "0.03em",
                  }}
                >
                  <FaAmazon size={15} />
                  <span>Shop Now</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. TESTIMONIALS
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#EDE8E0" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <SectionTag label="Customer Love" />
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              What Our Customers{" "}
              <span className="text-gradient-gold">Are Saying</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="max-w-lg mx-auto text-sm"
              style={{ color: "rgba(62,47,28,0.55)" }}
            >
              Thousands of families across India have made Vedyara Organic a
              part of their daily life. Here's what they love.
            </motion.p>
          </motion.div>

          {/* Testimonial cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -6 }}
                className="testimonial-card relative"
              >
                {/* Quote icon */}
                <div
                  className="absolute -top-3 -left-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                    boxShadow: "0 4px 12px rgba(212,175,55,0.35)",
                  }}
                >
                  <FaQuoteLeft size={11} color="#3E2F1C" />
                </div>

                {/* Stars */}
                <div className="mb-3 mt-2">
                  <AnimatedStars rating={t.rating} />
                </div>

                {/* Review text */}
                <p
                  className="text-sm leading-relaxed mb-5 italic"
                  style={{ color: "rgba(62,47,28,0.72)" }}
                >
                  "{t.review}"
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(to right, rgba(62,47,28,0.1), transparent)",
                    marginBottom: "14px",
                  }}
                />

                {/* Customer info */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                      color: "#3E2F1C",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm leading-none mb-0.5"
                      style={{ color: "#3E2F1C" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(62,47,28,0.45)" }}
                    >
                      {t.location} · {t.date}
                    </p>
                  </div>
                </div>

                {/* Product tag */}
                <div
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(107,142,35,0.1)",
                    color: "#506a1a",
                    border: "1px solid rgba(107,142,35,0.18)",
                  }}
                >
                  {t.product}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Amazon reviews note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-10"
          >
            <a
              href="https://www.amazon.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "white",
                color: "#3E2F1C",
                boxShadow: "0 4px 14px rgba(62,47,28,0.08)",
                border: "1px solid rgba(62,47,28,0.1)",
              }}
            >
              <FaAmazon size={16} color="#D4AF37" />
              <span>See 1,000+ reviews on Amazon</span>
              <FiArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. HONEY DRIP PROCESS SECTION
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-24 overflow-hidden"
        style={{ background: "#F8F5F0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <SectionTag label="How It Works" />
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Our <span className="text-gradient-gold">Simple Promise</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div
              className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, #D4AF37, #6B8E23, #D4AF37, transparent)",
              }}
            />

            {[
              {
                step: "01",
                icon: "🌾",
                title: "Farm Sourced",
                desc: "Direct from certified organic farms across India",
              },
              {
                step: "02",
                icon: "🔬",
                title: "Lab Tested",
                desc: "Every batch rigorously tested for purity & quality",
              },
              {
                step: "03",
                icon: "📦",
                title: "Packed Fresh",
                desc: "Eco-friendly packaging, no artificial preservatives",
              },
              {
                step: "04",
                icon: "🏠",
                title: "Your Home",
                desc: "Delivered to your door via Amazon's trusted network",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: i * 0.14,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step number */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10 text-2xl"
                  style={{
                    background: "white",
                    border: "2px solid rgba(212,175,55,0.3)",
                    boxShadow: "0 6px 20px rgba(212,175,55,0.15)",
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-xs font-bold mb-2 tracking-wider"
                  style={{ color: "#D4AF37", letterSpacing: "0.14em" }}
                >
                  Step {step.step}
                </span>
                <h4
                  className="font-serif font-bold mb-2 text-lg"
                  style={{ color: "#3E2F1C" }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(62,47,28,0.6)", maxWidth: "180px" }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          8. CTA BANNER
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden cta-banner py-20 lg:py-28">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=1600&q=80"
            alt="Organic fields background"
            className="w-full h-full object-cover"
            style={{ opacity: 0.12 }}
          />
        </div>

        {/* Decorative rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(212,175,55,0.06)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        />

        {/* Floating leaves in dark background */}
        <div className="absolute top-8 left-12 opacity-20 pointer-events-none">
          <motion.div
            animate={{ rotate: [-6, 6, -6], y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={48} opacity={1} />
          </motion.div>
        </div>
        <div className="absolute bottom-8 right-12 opacity-15 pointer-events-none">
          <motion.div
            animate={{ rotate: [5, -5, 5], y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={60} opacity={1} />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <SectionTag label="Start Your Journey" />

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Switch to Organic. <br className="hidden sm:block" />
              <span className="text-gradient-gold">
                No Chemicals. No Compromise.
              </span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-lg mb-10 max-w-xl mx-auto"
              style={{ color: "rgba(248,245,240,0.65)", fontWeight: 300 }}
            >
              Join 10,000+ families who have already made the switch to
              healthier, purer, organic living with Vedyara.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              custom={0.35}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="https://www.amazon.in"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37, #e8c84a, #D4AF37)",
                  backgroundSize: "200% 200%",
                  color: "#3E2F1C",
                  boxShadow: "0 12px 40px rgba(212,175,55,0.55)",
                  letterSpacing: "0.04em",
                }}
              >
                <FaAmazon size={20} />
                <span>Buy on Amazon</span>
              </motion.a>

              <motion.div whileHover={{ scale: 1.03, y: -2 }}>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(248,245,240,0.88)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <FiShoppingBag size={17} strokeWidth={2} />
                  <span>Explore All Products</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust micro-row */}
            <motion.div
              variants={fadeUp}
              custom={0.5}
              className="mt-10 flex flex-wrap items-center justify-center gap-8"
            >
              {[
                {
                  icon: <FaStar size={14} color="#D4AF37" />,
                  text: "4.8★ Amazon Rating",
                },
                { icon: "🌿", text: "100% Organic Certified" },
                { icon: "🔒", text: "Secure Amazon Checkout" },
                { icon: "🚚", text: "Pan-India Delivery" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: "rgba(248,245,240,0.5)" }}
                >
                  <span style={{ color: "#D4AF37" }}>
                    {typeof item.icon === "string" ? item.icon : item.icon}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MOBILE STICKY CTA
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 2, type: "spring", stiffness: 200, damping: 24 }}
          className="fixed bottom-0 left-0 right-0 z-30 mobile-sticky-cta px-4 py-3 md:hidden"
          style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
        >
          <a
            href="https://www.amazon.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
              color: "#3E2F1C",
              boxShadow: "0 -4px 20px rgba(212,175,55,0.3)",
            }}
          >
            <FaAmazon size={18} />
            <span>Buy Now on Amazon</span>
            <FiArrowRight size={16} />
          </a>
        </motion.div>
      </AnimatePresence>

      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </main>
  );
}
