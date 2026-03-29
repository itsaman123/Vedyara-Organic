import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiFilter, FiGrid, FiList } from "react-icons/fi";

import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { products, categories } from "../data/products";
import type { Product } from "../data/products";
import { staggerContainerFast, itemVariants } from "../utils/animations";

const containerVariants = staggerContainerFast;

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc" | "rating"
  >("default");

  // Filtered + sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.benefits.some((b) => b.toLowerCase().includes(q)),
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort(
        (a, b) =>
          parseInt(a.price.replace(/[^\d]/g, "")) -
          parseInt(b.price.replace(/[^\d]/g, "")),
      );
    } else if (sortBy === "price-desc") {
      result.sort(
        (a, b) =>
          parseInt(b.price.replace(/[^\d]/g, "")) -
          parseInt(a.price.replace(/[^\d]/g, "")),
      );
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 350);
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <>
      <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
        {/* ============================================================
            PAGE HERO BANNER
            ============================================================ */}
        <div
          className="relative pt-32 pb-20 overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #2a1f12 0%, #3e2f1c 45%, #4d3820 75%, #2a1f12 100%)",
          }}
        >
          {/* Ambient blobs */}
          <div
            className="absolute top-0 left-1/3 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(107,142,35,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Decorative floating elements */}
          {["🍯", "🌾", "🫘", "🌿"].map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl select-none pointer-events-none"
              style={{
                left: `${12 + i * 24}%`,
                top: `${20 + (i % 2) * 40}%`,
                opacity: 0.12,
              }}
              animate={{ y: [0, -12, 0], rotate: [0, 10, -5, 0] }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(212,175,55,0.7)", letterSpacing: "0.22em" }}
            >
              Vedyara Organic &nbsp;/&nbsp; All Products
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif font-bold mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F8F5F0" }}
            >
              Our Premium{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37, #e8c84a, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Organic Range
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base max-w-xl mx-auto mb-8"
              style={{ color: "rgba(248,245,240,0.65)" }}
            >
              From Himalayan wildflower honey to heritage millets — every
              product is farm-sourced, lab-tested, and delivered pure.
            </motion.p>

            {/* Amazon trust strip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🛒</span>
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(248,245,240,0.75)" }}
              >
                Coming soon on{" "}
                <span
                  className="font-bold"
                  style={{ color: "#D4AF37" }}
                >
                  Amazon India
                </span>
              </span>
            </motion.div>
          </div>

          {/* Bottom wave */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ lineHeight: 0 }}
          >
            <svg
              viewBox="0 0 1440 60"
              fill="none"
              preserveAspectRatio="none"
              style={{ display: "block", width: "100%", height: "60px" }}
            >
              <path
                d="M0 60 Q360 0 720 40 Q1080 80 1440 20 L1440 60 Z"
                fill="#F8F5F0"
              />
            </svg>
          </div>
        </div>

        {/* ============================================================
            FILTERS & SEARCH BAR
            ============================================================ */}
        <div
          className="sticky top-16 z-30 py-5 px-4"
          style={{
            background: "rgba(248,245,240,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(62,47,28,0.08)",
            boxShadow: "0 4px 20px rgba(62,47,28,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Top row: search + sort + view toggle */}
            <div className="flex items-center gap-3 mb-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "rgba(62,47,28,0.45)" }}
                />
                <input
                  type="text"
                  placeholder="Search products, benefits…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border bg-white text-sm transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: searchQuery
                      ? "#D4AF37"
                      : "rgba(62,47,28,0.14)",
                    color: "#3E2F1C",
                    boxShadow: searchQuery
                      ? "0 0 0 3px rgba(212,175,55,0.15)"
                      : "none",
                  }}
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full"
                      style={{ background: "rgba(62,47,28,0.1)" }}
                    >
                      <FiX size={13} style={{ color: "#3E2F1C" }} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort dropdown */}
              <div className="hidden sm:flex items-center gap-2">
                <FiFilter size={15} style={{ color: "rgba(62,47,28,0.5)" }} />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "default"
                        | "price-asc"
                        | "price-desc"
                        | "rating",
                    )
                  }
                  className="text-sm px-3 py-2.5 rounded-xl border bg-white cursor-pointer transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: "rgba(62,47,28,0.14)",
                    color: "#3E2F1C",
                  }}
                >
                  <option value="default">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div
                className="hidden sm:flex items-center gap-1 p-1 rounded-xl"
                style={{ background: "rgba(62,47,28,0.07)" }}
              >
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="p-2 rounded-lg transition-all duration-200"
                    style={{
                      background: viewMode === mode ? "white" : "transparent",
                      color:
                        viewMode === mode ? "#3E2F1C" : "rgba(62,47,28,0.45)",
                      boxShadow:
                        viewMode === mode
                          ? "0 1px 4px rgba(62,47,28,0.12)"
                          : "none",
                    }}
                    aria-label={`${mode} view`}
                  >
                    {mode === "grid" ? (
                      <FiGrid size={15} />
                    ) : (
                      <FiList size={15} />
                    )}
                  </button>
                ))}
              </div>

              {/* Result count */}
              <p
                className="hidden md:block text-sm ml-auto whitespace-nowrap"
                style={{ color: "rgba(62,47,28,0.5)" }}
              >
                <span className="font-semibold" style={{ color: "#3E2F1C" }}>
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {/* Category filter tabs — horizontally scrollable on mobile */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={`filter-tab flex-shrink-0 flex items-center gap-1.5 ${
                    activeCategory === cat.id ? "active" : ""
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  {/* Count badge */}
                  <span
                    className="ml-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background:
                        activeCategory === cat.id
                          ? "rgba(62,47,28,0.2)"
                          : "rgba(62,47,28,0.07)",
                      color:
                        activeCategory === cat.id
                          ? "#3E2F1C"
                          : "rgba(62,47,28,0.5)",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {cat.id === "all"
                      ? products.length
                      : products.filter((p) => p.category === cat.id).length}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            PRODUCT GRID
            ============================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}-${sortBy}-${viewMode}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col gap-5"
                }
              >
                {filteredProducts.map((product, i) =>
                  viewMode === "grid" ? (
                    <motion.div key={product.id} variants={itemVariants}>
                      <ProductCard
                        product={product}
                        onQuickView={handleQuickView}
                        index={i}
                      />
                    </motion.div>
                  ) : (
                    /* List view card */
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all duration-400"
                      style={{
                        boxShadow: "0 2px 20px rgba(62,47,28,0.07)",
                      }}
                      whileHover={{
                        y: -4,
                        boxShadow:
                          "0 12px 40px rgba(212,175,55,0.2), 0 4px 12px rgba(62,47,28,0.12)",
                      }}
                    >
                      {/* List image */}
                      <div
                        className="relative overflow-hidden flex-shrink-0"
                        style={{ width: "160px", minHeight: "160px" }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          style={{ minHeight: "160px" }}
                        />
                        {product.badge && (
                          <div
                            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold uppercase"
                            style={{
                              background:
                                product.badge === "Best Seller"
                                  ? "linear-gradient(135deg,#D4AF37,#e8c84a)"
                                  : product.badge === "Trending"
                                    ? "linear-gradient(135deg,#6B8E23,#7fa828)"
                                    : product.badge === "Limited"
                                      ? "linear-gradient(135deg,#c0392b,#e74c3c)"
                                      : "linear-gradient(135deg,#3E2F1C,#5a4532)",
                              color:
                                product.badge === "Best Seller"
                                  ? "#3E2F1C"
                                  : "white",
                            }}
                          >
                            {product.badge}
                          </div>
                        )}
                      </div>

                      {/* List content */}
                      <div className="flex flex-col flex-1 p-5 gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p
                              className="text-xs font-semibold uppercase tracking-widest mb-1"
                              style={{
                                color: "#6B8E23",
                                letterSpacing: "0.15em",
                              }}
                            >
                              {product.category} · {product.weight}
                            </p>
                            <h3
                              className="font-serif font-bold"
                              style={{ fontSize: "1.1rem", color: "#3E2F1C" }}
                            >
                              {product.name}
                            </h3>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p
                              className="font-serif font-bold"
                              style={{ fontSize: "1.25rem", color: "#3E2F1C" }}
                            >
                              {product.price}
                            </p>
                            {product.originalPrice && (
                              <p
                                className="text-xs line-through"
                                style={{ color: "rgba(62,47,28,0.35)" }}
                              >
                                {product.originalPrice}
                              </p>
                            )}
                          </div>
                        </div>

                        <p
                          className="text-sm line-clamp-2"
                          style={{ color: "rgba(62,47,28,0.6)" }}
                        >
                          {product.shortDesc}
                        </p>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-1.5">
                          {product.benefits.slice(0, 4).map((b) => (
                            <span key={b} className="benefit-tag">
                              {b}
                            </span>
                          ))}
                        </div>

                        {/* Footer row */}
                        <div
                          className="flex items-center justify-between mt-auto pt-2 border-t"
                          style={{ borderColor: "rgba(62,47,28,0.07)" }}
                        >
                          {/* Rating */}
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-xs font-bold"
                              style={{ color: "#D4AF37" }}
                            >
                              ★ {product.rating}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "rgba(62,47,28,0.45)" }}
                            >
                              ({product.reviews})
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuickView(product)}
                              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                              style={{
                                background: "rgba(62,47,28,0.07)",
                                color: "#3E2F1C",
                                border: "1px solid rgba(62,47,28,0.1)",
                              }}
                            >
                              Quick View
                            </button>
                            <div
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300"
                              style={{
                                background: "rgba(62,47,28,0.08)",
                                color: "rgba(62,47,28,0.5)",
                                cursor: "not-allowed",
                                userSelect: "none",
                              }}
                            >
                              Coming Soon
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ),
                )}
              </motion.div>
            ) : (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-7xl mb-6"
                >
                  🌿
                </motion.div>
                <h3
                  className="font-serif font-bold mb-3"
                  style={{ fontSize: "1.5rem", color: "#3E2F1C" }}
                >
                  No Products Found
                </h3>
                <p
                  className="text-sm mb-6 max-w-sm"
                  style={{ color: "rgba(62,47,28,0.55)" }}
                >
                  We couldn't find products matching "
                  <strong>{searchQuery}</strong>". Try a different search or
                  browse all categories.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearSearch}
                    className="btn-gold text-sm px-6 py-3"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      clearSearch();
                    }}
                    className="btn-brown text-sm px-6 py-3"
                  >
                    View All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── "Load More" / All products shown note ── */}
          {filteredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-14 pt-10 border-t"
              style={{ borderColor: "rgba(62,47,28,0.08)" }}
            >
              <p
                className="text-sm mb-4"
                style={{ color: "rgba(62,47,28,0.45)" }}
              >
                Showing all{" "}
                <strong style={{ color: "#3E2F1C" }}>
                  {filteredProducts.length}
                </strong>{" "}
                products
              </p>
              <div
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm"
                style={{
                  background: "rgba(62,47,28,0.08)",
                  color: "rgba(62,47,28,0.5)",
                  cursor: "not-allowed",
                  userSelect: "none",
                }}
              >
                Coming Soon to Amazon India
              </div>
            </motion.div>
          )}
        </div>

        {/* ============================================================
            MOBILE STICKY CTA
            ============================================================ */}
        <div className="fixed bottom-0 left-0 right-0 z-40 py-3 px-4 flex items-center justify-between md:hidden mobile-sticky-cta pb-safe">
          <div>
            <p
              className="text-xs font-semibold"
              style={{ color: "rgba(248,245,240,0.7)" }}
            >
              Coming soon on
            </p>
            <p className="text-sm font-bold" style={{ color: "#F8F5F0" }}>
              Amazon India 🛒
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm"
            style={{
              background: "rgba(248,245,240,0.2)",
              color: "rgba(248,245,240,0.5)",
              cursor: "not-allowed",
              userSelect: "none",
            }}
          >
            Coming Soon
          </div>
        </div>

        {/* Bottom padding for mobile CTA */}
        <div className="h-20 md:hidden" />
      </div>

      {/* ============================================================
          PRODUCT MODAL
          ============================================================ */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
