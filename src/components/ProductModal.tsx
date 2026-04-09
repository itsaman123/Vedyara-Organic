import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar, FiShoppingBag, FiCheck, FiPackage } from "react-icons/fi";

import type { Product } from "../data/products";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Star Rating ──────────────────────────────────────────── */
const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
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
            transition={{ delay: 0.35 + star * 0.06, type: "spring", stiffness: 320, damping: 18 }}
          >
            {partial ? (
              <span className="relative inline-block w-4 h-4">
                <FiStar size={16} style={{ color: "rgba(212,175,55,0.25)" }} className="absolute inset-0" />
                <span className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
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
    <span className="font-bold text-sm" style={{ color: "#3E2F1C" }}>{rating}</span>
    <span className="text-xs" style={{ color: "rgba(62,47,28,0.5)" }}>({reviews.toLocaleString()} reviews)</span>
  </div>
);

/* ─── Config maps ──────────────────────────────────────────── */
const badgeStyleMap: Record<string, React.CSSProperties> = {
  "Best Seller": { background: "linear-gradient(135deg, #D4AF37, #e8c84a)", color: "#3E2F1C" },
  Trending:      { background: "linear-gradient(135deg, #6B8E23, #7fa828)", color: "white" },
  New:           { background: "linear-gradient(135deg, #3E2F1C, #5a4532)", color: "#D4AF37" },
  Limited:       { background: "linear-gradient(135deg, #c0392b, #e74c3c)", color: "white" },
};

const categoryLabels: Record<string, string> = {
  honey:   "🍯 Honey",
  millets: "🌾 Millets",
  jaggery: "🟫 Jaggery",
  grains:  "🌿 Grains",
};

/* ═══════════════════════════════════════════════════════════
   PRODUCT MODAL — Premium redesign
═══════════════════════════════════════════════════════════ */
export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  /* Escape key */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
            style={{
              background: "rgba(14,8,2,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={onClose}
          >
            {/* ── Modal Panel ── */}
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.86, y: 48 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 32 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl"
              style={{
                maxHeight: "90vh",
                background: "#F8F5F0",
                boxShadow: "0 48px 120px rgba(14,8,2,0.65), 0 12px 32px rgba(14,8,2,0.4)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close Button ── */}
              <motion.button
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 320 }}
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full focus:outline-none"
                style={{
                  background: "rgba(62,47,28,0.12)",
                  color: "#3E2F1C",
                  border: "1px solid rgba(62,47,28,0.15)",
                }}
              >
                <FiX size={17} strokeWidth={2.5} />
              </motion.button>

              {/* ═══════════════════════════════════════════
                  BODY: flex column on mobile → row on desktop
              ═══════════════════════════════════════════ */}
              <div
                className="flex flex-col md:flex-row"
                style={{ minHeight: "min(90vh, 560px)" }}
              >

                {/* ════════════════════
                    LEFT — IMAGE HERO
                ════════════════════ */}
                <div
                  className="relative md:w-[44%] flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{
                    minHeight: "300px",
                    background: "linear-gradient(150deg, #fef8ef 0%, #f5e9d5 45%, #eddcc0 100%)",
                  }}
                >
                  {/* Dot pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.045] pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(circle at 2px 2px, #6B4C2A 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Large gold radial glow */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: "340px",
                      height: "340px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 68%)",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />

                  {/* Secondary green glow */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(107,142,35,0.12) 0%, transparent 70%)",
                      top: "20%",
                      right: "-10%",
                    }}
                  />

                  {/* ★ PRODUCT IMAGE — large & centered ★ */}
                  <motion.img
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    className="relative z-10"
                    style={{
                      width: "78%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "contain",
                      filter:
                        "drop-shadow(0 32px 64px rgba(62,47,28,0.26)) drop-shadow(0 10px 20px rgba(62,47,28,0.12))",
                    }}
                    initial={{ scale: 1.08, opacity: 0, y: 12 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.72, ease: [0.34, 1.1, 0.64, 1] }}
                  />

                  {/* Badge (top-left) */}
                  {product.badge && (
                    <motion.div
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.32 }}
                      className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={badgeStyleMap[product.badge] ?? {}}
                    >
                      {product.badge === "Best Seller" && "⭐ "}
                      {product.badge === "Trending" && "🔥 "}
                      {product.badge === "Limited" && "⚡ "}
                      {product.badge}
                    </motion.div>
                  )}

                  {/* Limited pill (top-right) */}
                  {product.limited && (
                    <motion.div
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.36 }}
                      className="absolute top-4 right-10 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: "rgba(192,57,43,0.88)", color: "white" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse" />
                      Limited Stock
                    </motion.div>
                  )}

                  {/* Weight + category pill (bottom-center) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42 }}
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
                    style={{
                      background: "rgba(62,47,28,0.08)",
                      color: "#5a4532",
                      border: "1px solid rgba(62,47,28,0.12)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <FiPackage size={11} />
                    {product.weight} · {categoryLabels[product.category]}
                  </motion.div>
                </div>

                {/* ════════════════════
                    RIGHT — DETAILS
                ════════════════════ */}
                <div
                  className="flex-1 overflow-y-auto"
                  style={{ maxHeight: "min(90vh, 560px)" }}
                >
                  <div className="p-6 md:p-8 flex flex-col gap-4">

                    {/* Category label */}
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "#6B8E23", letterSpacing: "0.16em" }}
                    >
                      {categoryLabels[product.category]}
                    </motion.p>

                    {/* Product name */}
                    <motion.h2
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-serif font-bold leading-tight"
                      style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", color: "#3E2F1C" }}
                    >
                      {product.name}
                    </motion.h2>

                    {/* Stars */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                      <StarRating rating={product.rating} reviews={product.reviews} />
                    </motion.div>

                    {/* Price block */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl flex-wrap"
                      style={{
                        background: "rgba(212,175,55,0.08)",
                        border: "1px solid rgba(212,175,55,0.18)",
                      }}
                    >
                      <span
                        className="font-serif font-bold"
                        style={{ fontSize: "2.1rem", color: "#3E2F1C", lineHeight: 1 }}
                      >
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span
                            className="text-sm line-through"
                            style={{ color: "rgba(62,47,28,0.38)" }}
                          >
                            {product.originalPrice}
                          </span>
                          <span
                            className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{
                              background: "rgba(107,142,35,0.14)",
                              color: "#506a1a",
                            }}
                          >
                            {Math.round(
                              (1 -
                                parseFloat(product.price.replace("₹", "")) /
                                  parseFloat(product.originalPrice.replace("₹", ""))) *
                                100
                            )}% off
                          </span>
                        </>
                      )}
                    </motion.div>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        background: "linear-gradient(to right, rgba(62,47,28,0.14), transparent)",
                      }}
                    />

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.36 }}
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(62,47,28,0.72)" }}
                    >
                      {product.description}
                    </motion.p>

                    {/* Benefits grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.42 }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-2.5"
                        style={{ color: "#3E2F1C", letterSpacing: "0.14em" }}
                      >
                        Key Benefits
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {product.benefits.map((benefit, i) => (
                          <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.46 + i * 0.05 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl"
                            style={{
                              background: "rgba(107,142,35,0.08)",
                              border: "1px solid rgba(107,142,35,0.16)",
                            }}
                          >
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "rgba(107,142,35,0.2)" }}
                            >
                              <FiCheck size={10} style={{ color: "#506a1a" }} strokeWidth={3} />
                            </div>
                            <span className="text-xs font-medium" style={{ color: "#3E2F1C" }}>
                              {benefit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Trust pills */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.56 }}
                      className="flex flex-wrap gap-2"
                    >
                      {[
                        { icon: "🌿", label: "100% Organic" },
                        { icon: "🔬", label: "Lab Tested" },
                        { icon: "🚫", label: "No Additives" },
                        { icon: "🏆", label: "FSSAI Certified" },
                      ].map(({ icon, label }) => (
                        <div
                          key={label}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{
                            background: "rgba(62,47,28,0.06)",
                            color: "rgba(62,47,28,0.62)",
                            border: "1px solid rgba(62,47,28,0.08)",
                          }}
                        >
                          <span>{icon}</span>
                          <span>{label}</span>
                        </div>
                      ))}
                    </motion.div>

                    {/* CTA row */}
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.62, type: "spring", stiffness: 200 }}
                      className="flex gap-3 pt-1"
                    >
                      {/* Coming soon — disabled */}
                      <div
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm"
                        style={{
                          background: "rgba(62,47,28,0.07)",
                          color: "rgba(62,47,28,0.42)",
                          cursor: "not-allowed",
                          userSelect: "none",
                          border: "1.5px solid rgba(62,47,28,0.08)",
                        }}
                      >
                        🛒&nbsp; Coming Soon
                      </div>

                      {/* Close / More */}
                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm focus:outline-none"
                        style={{
                          background: "rgba(62,47,28,0.07)",
                          color: "#3E2F1C",
                          border: "1.5px solid rgba(62,47,28,0.13)",
                        }}
                      >
                        <FiShoppingBag size={15} strokeWidth={2} />
                        <span>More</span>
                      </motion.button>
                    </motion.div>

                    {/* Amazon note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.72 }}
                      className="text-xs text-center pb-2"
                      style={{ color: "rgba(62,47,28,0.32)" }}
                    >
                      🚀 Coming soon on Amazon India
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
