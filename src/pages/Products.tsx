import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiSearch, FiX, FiFilter, FiGrid, FiList, FiArrowRight } from "react-icons/fi";
import { FaStar, FaLeaf } from "react-icons/fa";
import ProductModal from "../components/ProductModal";
import { products, categories } from "../data/products";
import type { Product } from "../data/products";
import { staggerContainer } from "../utils/animations";

/* ═══════════════════════════════════════════════════════════
   MORPHING BLOB
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
      scale: [1, 1.08, 0.95, 1],
    }}
    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
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
      y: [-200, -500, -200],
      opacity: [0, 0.5, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ═══════════════════════════════════════════════════════════
   ANIMATED PRODUCT CARD
═══════════════════════════════════════════════════════════ */
const AnimatedProductCard = ({
  product,
  index,
  onView,
  viewMode,
}: {
  product: Product;
  index: number;
  onView: (p: Product) => void;
  viewMode: "grid" | "list";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (viewMode === "list") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        whileHover={{ x: 8, scale: 1.01 }}
        className="bg-white rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-lg shadow-black/5 cursor-pointer group"
        onClick={() => onView(product)}
      >
        <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          {product.badge && (
            <div
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                color: "#3E2F1C",
              }}
            >
              {product.badge}
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "#6B8E23" }}
              >
                {product.category}
              </p>
              <h3 className="font-serif font-bold text-lg" style={{ color: "#3E2F1C" }}>
                {product.name}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-xl" style={{ color: "#3E2F1C" }}>
                {product.price}
              </p>
              {product.originalPrice && (
                <p className="text-xs line-through" style={{ color: "rgba(62,47,28,0.4)" }}>
                  {product.originalPrice}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.shortDesc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.benefits.slice(0, 3).map((b) => (
              <span
                key={b}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <FaStar size={14} style={{ color: "#D4AF37" }} />
              <span className="text-sm font-medium" style={{ color: "#3E2F1C" }}>
                {product.rating || "New"}
              </span>
              <span className="text-xs text-gray-400">({product.reviews || 0})</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                color: "#3E2F1C",
              }}
            >
              Quick View <FiArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer h-full flex flex-col"
      onClick={() => onView(product)}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-amber-900/10 flex flex-col h-full"
      >
        {/* Badge */}
        {product.badge && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
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
          className="relative flex-shrink-0 h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at center, rgba(212,175,55,0.4) 0%, transparent 70%)",
            }}
          />
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            style={{ filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.1))" }}
          />
        </motion.div>

        {/* Product Info */}
        <div className="p-6 flex flex-col flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "#6B8E23" }}
          >
            {product.category}
          </p>
          <h3 className="font-serif font-bold text-lg mb-2" style={{ color: "#3E2F1C" }}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.shortDesc}</p>

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
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div>
              <span className="text-2xl font-bold" style={{ color: "#3E2F1C" }}>
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
              whileHover={{ scale: 1.15, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiArrowRight className="text-brand-brown" size={16} />
            </motion.div>
          </div>
        </div>

        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: "linear-gradient(to top, rgba(212,175,55,0.08) 0%, transparent 50%)",
          }}
        />
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CATEGORY FILTER BUTTON
═══════════════════════════════════════════════════════════ */
const CategoryButton = ({
  category,
  isActive,
  onClick,
  count,
}: {
  category: { id: string; label: string; emoji: string };
  isActive: boolean;
  onClick: () => void;
  count: number;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
      isActive ? "text-white" : "text-gray-600"
    }`}
    style={{
      background: isActive
        ? "linear-gradient(135deg, #D4AF37, #e8c84a)"
        : "white",
      boxShadow: isActive
        ? "0 4px 15px rgba(212,175,55,0.4)"
        : "0 2px 8px rgba(0,0,0,0.05)",
      border: isActive ? "none" : "1px solid rgba(62,47,28,0.1)",
    }}
  >
    <span>{category.emoji}</span>
    <span>{category.label}</span>
    <span
      className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
      style={{
        background: isActive ? "rgba(255,255,255,0.25)" : "rgba(62,47,28,0.08)",
        color: isActive ? "white" : "rgba(62,47,28,0.6)",
      }}
    >
      {count}
    </span>
  </motion.button>
);

/* ═══════════════════════════════════════════════════════════
   PRODUCTS PAGE
═══════════════════════════════════════════════════════════ */
export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.benefits.some((b) => b.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-asc") {
      result.sort(
        (a, b) =>
          parseInt(a.price.replace(/[^\d]/g, "")) -
          parseInt(b.price.replace(/[^\d]/g, ""))
      );
    } else if (sortBy === "price-desc") {
      result.sort(
        (a, b) =>
          parseInt(b.price.replace(/[^\d]/g, "")) -
          parseInt(a.price.replace(/[^\d]/g, ""))
      );
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <main className="relative overflow-x-hidden bg-[#faf9f7]">
      {/* ════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16"
        style={{ background: "linear-gradient(135deg, #fef9f3 0%, #f5f0e8 50%, #ebe6d9 100%)" }}
      >
        {/* Animated Blobs */}
        <MorphingBlob color="rgba(212,175,55,0.2)" className="w-[500px] h-[500px] -top-32 -left-32" />
        <MorphingBlob color="rgba(107,142,35,0.15)" className="w-[400px] h-[400px] -bottom-20 -right-20" />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.7} x={10 + i * 15} size={5 + (i % 3) * 2} />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
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
                <FaLeaf size={16} style={{ color: "#6B8E23" }} />
                <span className="text-sm font-semibold" style={{ color: "#3E2F1C" }}>
                  Premium Organic Products
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-serif font-bold leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#3E2F1C" }}
              >
                Shop Our
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #6B8E23)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Organic Range
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-600 max-w-md"
              >
                From Himalayan wildflower honey to heritage millets — every product is
                farm-sourced, lab-tested, and delivered pure to your door.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  <FaStar size={16} style={{ color: "#D4AF37" }} />
                  <span className="text-sm font-medium" style={{ color: "#3E2F1C" }}>
                    4.8★ Rating
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: "#3E2F1C" }}>
                    Coming to Amazon
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
                  transform: "scale(1.2)",
                }}
              />
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src={products[0]?.image}
                  alt="Featured Product"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0 60 Q360 0 720 40 Q1080 80 1440 20 L1440 60 Z" fill="#faf9f7" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FILTERS & SEARCH
      ════════════════════════════════════════════════════ */}
      <div
        className="sticky top-16 z-30 py-5 px-4"
        style={{
          background: "rgba(250,249,247,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(62,47,28,0.08)",
          boxShadow: "0 4px 20px rgba(62,47,28,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <FiSearch
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(62,47,28,0.45)" }}
              />
              <input
                type="text"
                placeholder="Search products, benefits…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border bg-white text-sm transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: searchQuery ? "#D4AF37" : "rgba(62,47,28,0.14)",
                  boxShadow: searchQuery ? "0 0 0 3px rgba(212,175,55,0.15)" : "none",
                }}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full"
                    style={{ background: "rgba(62,47,28,0.1)" }}
                  >
                    <FiX size={13} style={{ color: "#3E2F1C" }} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <FiFilter size={15} style={{ color: "rgba(62,47,28,0.5)" }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm px-3 py-2.5 rounded-xl border bg-white cursor-pointer"
                  style={{ borderColor: "rgba(62,47,28,0.14)" }}
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <div
                className="flex items-center gap-1 p-1 rounded-xl"
                style={{ background: "rgba(62,47,28,0.07)" }}
              >
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="p-2 rounded-lg transition-all duration-200"
                    style={{
                      background: viewMode === mode ? "white" : "transparent",
                      boxShadow: viewMode === mode ? "0 1px 4px rgba(62,47,28,0.12)" : "none",
                    }}
                  >
                    {mode === "grid" ? <FiGrid size={15} /> : <FiList size={15} />}
                  </button>
                ))}
              </div>

              <p className="hidden md:block text-sm" style={{ color: "rgba(62,47,28,0.5)" }}>
                <span className="font-semibold" style={{ color: "#3E2F1C" }}>
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                category={cat}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                count={
                  cat.id === "all"
                    ? products.length
                    : products.filter((p) => p.category === cat.id).length
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          PRODUCT GRID
      ════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}-${sortBy}-${viewMode}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
                  : "flex flex-col gap-6"
              }
            >
              {filteredProducts.map((product, i) => (
                <AnimatedProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onView={handleQuickView}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                🌿
              </motion.div>
              <h3 className="font-serif font-bold mb-3" style={{ fontSize: "1.5rem", color: "#3E2F1C" }}>
                No Products Found
              </h3>
              <p className="text-sm mb-6 max-w-sm" style={{ color: "rgba(62,47,28,0.55)" }}>
                We couldn't find products matching "<strong>{searchQuery}</strong>". Try a different search.
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-3 rounded-full font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
                  color: "#3E2F1C",
                }}
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Note */}
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14 pt-10 border-t"
            style={{ borderColor: "rgba(62,47,28,0.08)" }}
          >
            <p className="text-sm mb-4" style={{ color: "rgba(62,47,28,0.45)" }}>
              Showing all <strong style={{ color: "#3E2F1C" }}>{filteredProducts.length}</strong> products
            </p>
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
              style={{
                background: "rgba(62,47,28,0.08)",
                color: "rgba(62,47,28,0.5)",
              }}
            >
              Coming Soon to Amazon India 🛒
            </div>
          </motion.div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════
          MOBILE STICKY CTA
      ════════════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 py-3 px-4 md:hidden"
        style={{
          background: "rgba(250,249,247,0.95)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(62,47,28,0.08)",
        }}
      >
        <div
          className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm"
          style={{
            background: "rgba(62,47,28,0.1)",
            color: "rgba(62,47,28,0.5)",
          }}
        >
          Coming Soon to Amazon India
        </div>
      </div>
      <div className="h-20 md:hidden" />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => setSelectedProduct(null), 350);
        }}
      />
    </main>
  );
}
