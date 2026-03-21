import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar, FiShoppingBag, FiCheck, FiExternalLink } from "react-icons/fi";
import { FaAmazon } from "react-icons/fa";
import type { Product } from "../data/products";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star === Math.ceil(rating) && rating % 1 !== 0;
          return (
            <motion.span
              key={star}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.4 + star * 0.07,
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
            >
              {partial ? (
                <span className="relative inline-block w-4 h-4">
                  <FiStar size={16} style={{ color: "rgba(212,175,55,0.25)" }} className="absolute inset-0" />
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${(rating % 1) * 100}%` }}
                  >
                    <FiStar size={16} style={{ color: "#D4AF37", fill: "#D4AF37" }} />
                  </span>
                </span>
              ) : (
                <FiStar
                  size={16}
                  style={{
                    color: filled ? "#D4AF37" : "rgba(212,175,55,0.25)",
                    fill: filled ? "#D4AF37" : "transparent",
                  }}
                />
              )}
            </motion.span>
          );
        })}
      </div>
      <span
        className="font-bold text-sm"
        style={{ color: "#3E2F1C" }}
      >
        {rating}
      </span>
      <span className="text-xs" style={{ color: "rgba(62,47,28,0.5)" }}>
        ({reviews} reviews)
      </span>
    </div>
  );
};

const badgeStyleMap: Record<string, React.CSSProperties> = {
  "Best Seller": {
    background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
    color: "#3E2F1C",
  },
  Trending: {
    background: "linear-gradient(135deg, #6B8E23, #7fa828)",
    color: "white",
  },
  New: {
    background: "linear-gradient(135deg, #3E2F1C, #5a4532)",
    color: "#D4AF37",
  },
  Limited: {
    background: "linear-gradient(135deg, #c0392b, #e74c3c)",
    color: "white",
  },
};

const categoryLabels: Record<string, string> = {
  honey: "🍯 Honey",
  millets: "🌾 Millets",
  jaggery: "🟫 Jaggery",
  grains: "🌿 Grains",
};

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{
              background: "rgba(20,12,4,0.78)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={onClose}
          >
            {/* ── Modal Panel ── */}
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl"
              style={{
                background: "#F8F5F0",
                boxShadow:
                  "0 32px 80px rgba(20,12,4,0.55), 0 8px 24px rgba(20,12,4,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close Button ── */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
                style={{
                  background: "rgba(62,47,28,0.08)",
                  color: "#3E2F1C",
                  border: "1px solid rgba(62,47,28,0.1)",
                }}
              >
                <FiX size={18} strokeWidth={2.5} />
              </motion.button>

              {/* ── Scrollable Content ── */}
              <div className="overflow-y-auto max-h-[92vh]">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* ── Left: Image ── */}
                  <div className="relative overflow-hidden bg-brand-cream-dark" style={{ minHeight: "320px" }}>
                    {/* Image */}
                    <motion.img
                      key={product.id}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "320px" }}
                      initial={{ scale: 1.12, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    />

                    {/* Gradient overlay at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(30,20,10,0.55) 0%, transparent 100%)",
                      }}
                    />

                    {/* Badge */}
                    {product.badge && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                        style={badgeStyleMap[product.badge] ?? {}}
                      >
                        {product.badge === "Best Seller" && "⭐ "}
                        {product.badge === "Trending" && "🔥 "}
                        {product.badge === "Limited" && "⚡ "}
                        {product.badge}
                      </motion.div>
                    )}

                    {/* Limited stock banner */}
                    {product.limited && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(192,57,43,0.9)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <span className="text-white text-xs font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-300 animate-pulse" />
                          Limited Stock — Order Soon!
                        </span>
                      </motion.div>
                    )}

                    {/* Category pill at bottom */}
                    {!product.limited && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          background: "rgba(248,245,240,0.88)",
                          color: "#3E2F1C",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {categoryLabels[product.category]}
                      </motion.div>
                    )}
                  </div>

                  {/* ── Right: Details ── */}
                  <div className="p-6 md:p-8 flex flex-col gap-5 overflow-y-auto">
                    {/* Category + weight row */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between"
                    >
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "#6B8E23", letterSpacing: "0.16em" }}
                      >
                        {categoryLabels[product.category]}
                      </span>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: "rgba(62,47,28,0.08)",
                          color: "#5a4532",
                        }}
                      >
                        {product.weight}
                      </span>
                    </motion.div>

                    {/* Product name */}
                    <motion.h2
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="font-serif font-bold leading-tight"
                      style={{ fontSize: "1.65rem", color: "#3E2F1C" }}
                    >
                      {product.name}
                    </motion.h2>

                    {/* Star rating */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <StarRating rating={product.rating} reviews={product.reviews} />
                    </motion.div>

                    {/* Price row */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="flex items-baseline gap-3"
                    >
                      <span
                        className="font-serif font-bold"
                        style={{ fontSize: "2rem", color: "#3E2F1C" }}
                      >
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span
                            className="text-base line-through"
                            style={{ color: "rgba(62,47,28,0.38)" }}
                          >
                            {product.originalPrice}
                          </span>
                          <span
                            className="text-sm font-semibold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: "rgba(107,142,35,0.15)",
                              color: "#506a1a",
                            }}
                          >
                            {Math.round(
                              (1 -
                                parseFloat(product.price.replace("₹", "")) /
                                  parseFloat(
                                    product.originalPrice.replace("₹", "")
                                  )) *
                                100
                            )}
                            % off
                          </span>
                        </>
                      )}
                    </motion.div>

                    {/* Thin divider */}
                    <div
                      style={{
                        height: "1px",
                        background:
                          "linear-gradient(to right, rgba(62,47,28,0.12), transparent)",
                      }}
                    />

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(62,47,28,0.7)" }}
                    >
                      {product.description}
                    </motion.p>

                    {/* Benefits */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "#3E2F1C", letterSpacing: "0.14em" }}
                      >
                        Key Benefits
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {product.benefits.map((benefit, i) => (
                          <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.06 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl"
                            style={{
                              background: "rgba(107,142,35,0.09)",
                              border: "1px solid rgba(107,142,35,0.18)",
                            }}
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "rgba(107,142,35,0.2)" }}
                            >
                              <FiCheck size={11} style={{ color: "#506a1a" }} strokeWidth={3} />
                            </div>
                            <span
                              className="text-xs font-medium"
                              style={{ color: "#3E2F1C" }}
                            >
                              {benefit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Trust row */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-4 flex-wrap"
                    >
                      {[
                        { icon: "🌿", label: "100% Organic" },
                        { icon: "🔬", label: "Lab Tested" },
                        { icon: "🚫", label: "No Additives" },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5">
                          <span className="text-sm">{icon}</span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: "rgba(62,47,28,0.6)" }}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, type: "spring", stiffness: 200 }}
                      className="flex flex-col sm:flex-row gap-3 pt-1"
                    >
                      {/* Primary: Buy on Amazon */}
                      <motion.a
                        href={product.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 focus:outline-none"
                        style={{
                          background:
                            "linear-gradient(135deg, #D4AF37 0%, #e8c84a 50%, #D4AF37 100%)",
                          backgroundSize: "200% 200%",
                          color: "#3E2F1C",
                          boxShadow: "0 8px 28px rgba(212,175,55,0.4)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        <FaAmazon size={17} />
                        <span>Buy on Amazon</span>
                        <FiExternalLink size={14} strokeWidth={2.5} />
                      </motion.a>

                      {/* Secondary: View all products */}
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onClose}
                        className="sm:flex-none flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 focus:outline-none"
                        style={{
                          background: "rgba(62,47,28,0.07)",
                          color: "#3E2F1C",
                          border: "1.5px solid rgba(62,47,28,0.12)",
                        }}
                      >
                        <FiShoppingBag size={16} strokeWidth={2} />
                        <span>More</span>
                      </motion.button>
                    </motion.div>

                    {/* Amazon trust note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                      className="text-xs text-center pb-1"
                      style={{ color: "rgba(62,47,28,0.38)" }}
                    >
                      🔒 Secure checkout on Amazon · Easy returns · Fast delivery
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
