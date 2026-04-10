import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import HoneyBottle from "../../public/honey-bottle.webp";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  FiArrowRight,
  FiShoppingBag,
  FiChevronDown,
  FiPackage,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { FaStar, FaQuoteLeft, FaLeaf, FaHandHoldingHeart } from "react-icons/fa";
import ProductModal from "../components/ProductModal";
import {
  featuredProducts,
  testimonials,
  whyChooseUs,
  stats,
  categories,
} from "../data/products";
import type { Product } from "../data/products";
import { fadeUp, staggerContainer } from "../utils/animations";

/* ═══════════════════════════════════════════════════════════
   MORPHING BLOB BACKGROUND
═══════════════════════════════════════════════════════════ */
const MorphingBlob = ({ color, className }: { color: string; className?: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    style={{ background: color }}
    animate={{
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
      ],
      scale: [1, 1.05, 0.98, 1],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* ═══════════════════════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════════════════════ */
const FloatingParticle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: "100%",
      width: size,
      height: size,
      background: "linear-gradient(135deg, #D4AF37, #6B8E23)",
    }}
    animate={{
      y: [-200, -600, -200],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 180],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* ═══════════════════════════════════════════════════════════
   PRODUCT SHOWCASE CARD
═══════════════════════════════════════════════════════════ */
const ProductShowcaseCard = ({
  product,
  index,
  onView,
}: {
  product: Product;
  index: number;
  onView: (p: Product) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -12,
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      className="group relative cursor-pointer h-full flex flex-col"
      onClick={() => onView(product)}
    >
      <div
        className="relative bg-white rounded-3xl p-6 shadow-lg shadow-black/5 overflow-hidden transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-amber-900/10 flex flex-col h-full"
      >
        {/* Badge */}
        {product.badge && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + 0.3 }}
            className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
              color: "#3E2F1C",
            }}
          >
            {product.badge}
          </motion.div>
        )}

        {/* Product Image */}
        <motion.div
          className="relative flex-shrink-0 h-48 flex items-center justify-center mb-6 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(212,175,55,0.3) 0%, transparent 70%)",
            }}
          />
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
          />
        </motion.div>

        {/* Product Info */}
        <div className="flex flex-col flex-1">
          <h3 className="font-serif font-bold text-lg text-brand-brown mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {product.shortDesc}
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.benefits.slice(0, 2).map((benefit) => (
              <span
                key={benefit}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-100"
              >
                {benefit}
              </span>
            ))}
          </div>

          {/* Price & CTA — pinned to bottom */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div>
              <span className="text-2xl font-bold text-brand-brown">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D4AF37, #e8c84a)" }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiArrowRight className="text-brand-brown" />
            </motion.div>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "linear-gradient(to top, rgba(212,175,55,0.05) 0%, transparent 50%)",
          }}
        />
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CATEGORY CARD
═══════════════════════════════════════════════════════════ */
const CategoryCard = ({
  category,
  index,
}: {
  category: { id: string; label: string; emoji: string };
  index: number;
}) => {
  const icons: Record<string, React.ReactNode> = {
    all: <FaLeaf size={28} />,
    honey: <span className="text-3xl">🍯</span>,
    millets: <span className="text-3xl">🌾</span>,
    jaggery: <span className="text-3xl">🟫</span>,
    grains: <FiPackage size={28} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div
        className="relative p-8 rounded-3xl bg-white shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-xl"
        style={{
          background: "linear-gradient(145deg, #ffffff 0%, #faf9f7 100%)",
        }}
      >
        {/* Animated Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(107,142,35,0.1) 100%)",
          }}
        />

        <div className="relative z-10 text-center space-y-4">
          <motion.div
            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-2xl">{icons[category.id]}</span>
          </motion.div>
          <h3 className="font-serif font-bold text-lg text-brand-brown">
            {category.label}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════ */
const AnimatedCounter = ({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          delay: index * 0.1 + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{
          background: "linear-gradient(135deg, #D4AF37, #6B8E23)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </motion.div>
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TESTIMONIAL CARD
═══════════════════════════════════════════════════════════ */
const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-black/5 relative overflow-hidden group"
    >
      {/* Quote Icon */}
      <motion.div
        className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ background: "linear-gradient(135deg, #D4AF37, #e8c84a)" }}
      >
        <FaQuoteLeft className="text-brand-brown" size={16} />
      </motion.div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.12 + i * 0.05,
              type: "spring",
              stiffness: 300,
            }}
          >
            <FaStar
              size={14}
              style={{ color: i < testimonial.rating ? "#D4AF37" : "#ddd" }}
            />
          </motion.span>
        ))}
      </div>

      {/* Review */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
        "{testimonial.review}"
      </p>

      {/* Divider */}
      <div
        className="h-px w-full mb-4"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)",
        }}
      />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
            color: "#3E2F1C",
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-brand-brown">{testimonial.name}</p>
          <p className="text-xs text-gray-400">
            {testimonial.location} · {testimonial.date}
          </p>
        </div>
      </div>

      {/* Product Tag */}
      <div
        className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
        style={{
          background: "rgba(107,142,35,0.1)",
          color: "#506a1a",
        }}
      >
        {testimonial.product}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <main ref={containerRef} className="relative overflow-x-hidden bg-[#faf9f7] pt-12 md:pt-0">
      {/* ════════════════════════════════════════════════════
          1. MODERN HERO SECTION
      ════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen pt-12 md:pt-0 flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fef9f3 0%, #f5f0e8 50%, #ebe6d9 100%)" }}
      >
        {/* Animated Background Blobs */}
        <MorphingBlob
          color="rgba(212,175,55,0.15)"
          className="w-[600px] h-[600px] -top-48 -left-48"
        />
        <MorphingBlob
          color="rgba(107,142,35,0.12)"
          className="w-[500px] h-[500px] -bottom-32 -right-32"
        />
        <MorphingBlob
          color="rgba(212,175,55,0.08)"
          className="w-[400px] h-[400px] top-1/4 right-1/4"
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.8}
            x={10 + i * 12}
            size={6 + (i % 3) * 2}
          />
        ))}

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌿
                </motion.span>
                <span className="text-sm font-semibold text-brand-brown">
                  100% Organic · Farm to Home
                </span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="font-serif font-bold leading-[1.1]"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: "#3E2F1C",
                  }}
                >
                  Pure & Natural
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #6B8E23)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Organic Products
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg text-gray-600 max-w-md leading-relaxed"
                >
                  Handpicked millets, golden honey, organic jaggery, and more —
                  straight from India's finest organic farms to your kitchen.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base"
                  style={{
                    background: "rgba(248,245,240,0.5)",
                    color: "rgba(62,47,28,0.5)",
                    cursor: "not-allowed",
                  }}
                >
                  <span>Coming Soon</span>
                </motion.div>

                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-amber-900/20"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                      color: "#3E2F1C",
                    }}
                  >
                    <FiShoppingBag size={18} />
                    <span>Shop Now</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FiArrowRight size={18} />
                    </motion.span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                {[
                  { icon: <FaHandHoldingHeart size={18} />, text: "Lab Tested" },
                  { icon: <FiShield size={18} />, text: "FSSAI Certified" },
                  { icon: <FiTrendingUp size={18} />, text: "4.8★ Rating" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-500"
                  >
                    <span style={{ color: "#D4AF37" }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Product Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
                  transform: "scale(1.3)",
                }}
              />

              {/* Main Product Image */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <img
                  src={HoneyBottle}
                  alt="Pure Honey"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.2))" }}
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-4 top-1/4 px-4 py-3 rounded-2xl bg-white shadow-xl"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Starting at
                </p>
                <p className="text-2xl font-bold text-brand-brown">₹199</p>
              </motion.div>

              {/* Floating Rating */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-4 top-1/3 px-4 py-3 rounded-2xl bg-white shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <FaStar size={18} color="#D4AF37" />
                  <span className="font-bold text-brand-brown">4.8</span>
                </div>
                <p className="text-xs text-gray-400">10K+ Reviews</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FiChevronDown size={24} className="text-amber-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. STATS SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-16 bg-white overflow-hidden">
        {/* Decorative Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(to right, transparent, #D4AF37, #6B8E23, #D4AF37, transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <AnimatedCounter
                key={stat.id}
                value={stat.value}
                label={stat.label}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. CATEGORIES SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden bg-[#faf9f7]">
        {/* Background Accents */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-4"
            >
              Explore
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Shop by Category
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. FEATURED PRODUCTS
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3E2F1C 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-4"
            >
              Our Bestsellers
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Featured Products
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="max-w-2xl mx-auto text-gray-500"
            >
              Handpicked organic essentials — from pure Himalayan honey to
              farm-fresh jaggery. Every product tells a story of purity.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <ProductShowcaseCard
                key={product.id}
                product={product}
                index={i}
                onView={handleQuickView}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #3E2F1C, #5a4532)",
                  color: "white",
                }}
              >
                <FiShoppingBag size={18} />
                <span>View All Products</span>
                <FiArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. WHY CHOOSE US
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #3E2F1C 0%, #2a1f12 50%, #1a1208 100%)",
        }}
      >
        {/* Decorative Elements */}
        <MorphingBlob
          color="rgba(212,175,55,0.08)"
          className="w-[500px] h-[500px] top-0 right-0"
        />
        <MorphingBlob
          color="rgba(107,142,35,0.06)"
          className="w-[400px] h-[400px] bottom-0 left-0"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4"
            >
              Our Promise
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Why Choose{" "}
              <span style={{ color: "#D4AF37" }}>Vedyara Organic</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="max-w-lg mx-auto text-gray-400"
            >
              No shortcuts. No compromise. Every product upholds our four core
              pillars of purity.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-8 rounded-3xl text-center group cursor-default"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)",
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))",
                    border: "1px solid rgba(212,175,55,0.25)",
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </motion.div>

                <h3 className="font-serif font-bold text-lg text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Line */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(to right, #D4AF37, #6B8E23)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: "🏆", label: "FSSAI Certified" },
              { icon: "🌿", label: "Organic Certified" },
              { icon: "🔬", label: "Lab Verified" },
              { icon: "🚜", label: "Farm Direct" },
              { icon: "♻️", label: "Eco Packaging" },
            ].map((cert) => (
              <motion.div
                key={cert.label}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <span className="text-lg">{cert.icon}</span>
                <span className="text-sm font-medium text-gray-300">
                  {cert.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. TESTIMONIALS
      ════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#faf9f7] overflow-hidden">
        {/* Background Accents */}
        <div
          className="absolute top-0 left-0 w-full h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(212,175,55,0.05), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-4"
            >
              Customer Love
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              What Our Customers Say
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
              style={{
                background: "rgba(62,47,28,0.08)",
                color: "rgba(62,47,28,0.5)",
              }}
            >
              Coming Soon to Amazon India
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. CTA SECTION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #fef9f3 0%, #f5f0e8 50%, #ebe6d9 100%)",
          }}
        />

        {/* Decorative Elements */}
        <MorphingBlob
          color="rgba(212,175,55,0.15)"
          className="w-[600px] h-[600px] -top-48 -left-48"
        />
        <MorphingBlob
          color="rgba(107,142,35,0.1)"
          className="w-[500px] h-[500px] -bottom-32 -right-32"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-6"
            >
              Start Your Journey
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-serif font-bold text-brand-brown mb-6 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Switch to Organic.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #6B8E23)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Live Healthier.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-lg text-gray-600 mb-10 max-w-xl mx-auto"
            >
              Join 10,000+ families who have made the switch to purer, healthier
              organic living with Vedyara.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div
                className="flex items-center gap-3 px-9 py-4 rounded-full font-bold"
                style={{
                  background: "rgba(62,47,28,0.1)",
                  color: "rgba(62,47,28,0.5)",
                  cursor: "not-allowed",
                }}
              >
                Coming Soon
              </motion.div>

              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-9 py-4 rounded-full font-bold shadow-lg shadow-amber-900/20"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                    color: "#3E2F1C",
                  }}
                >
                  <FiShoppingBag size={18} />
                  <span>Explore Products</span>
                  <FiArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              custom={0.5}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              {[
                { icon: <FaStar size={16} />, text: "4.8★ Rating" },
                { icon: <FaLeaf size={16} />, text: "100% Organic" },
                { icon: <FiShield size={16} />, text: "Secure Checkout" },
                { icon: <FiPackage size={16} />, text: "Pan-India Delivery" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <span style={{ color: "#D4AF37" }}>{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          8. MOBILE STICKY CTA
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ delay: 2, type: "spring", stiffness: 200, damping: 24 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-lg px-4 py-3 md:hidden border-t border-gray-100"
        >
          <div
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm"
            style={{
              background: "rgba(62,47,28,0.1)",
              color: "rgba(62,47,28,0.5)",
              cursor: "not-allowed",
            }}
          >
            Coming Soon
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Product Modal */}
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
