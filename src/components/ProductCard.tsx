import { useState } from "react";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { FaAmazon } from "react-icons/fa";
import type { Product } from "../data/products";

/* ─────────────────────────────────────────────────────────────
   Badge config
───────────────────────────────────────────────────────────── */
const badgeConfig: Record<
  string,
  { bg: string; color: string; emoji: string }
> = {
  "Best Seller": {
    bg: "linear-gradient(135deg,#D4AF37,#e8c84a)",
    color: "#3E2F1C",
    emoji: "🏆",
  },
  Trending: {
    bg: "linear-gradient(135deg,#6B8E23,#7fa828)",
    color: "#fff",
    emoji: "🔥",
  },
  New: {
    bg: "linear-gradient(135deg,#3E2F1C,#5a4532)",
    color: "#D4AF37",
    emoji: "✨",
  },
  Limited: {
    bg: "linear-gradient(135deg,#c0392b,#e74c3c)",
    color: "#fff",
    emoji: "⚡",
  },
};

const categoryEmoji: Record<string, string> = {
  honey: "🍯",
  millets: "🌾",
  jaggery: "🟫",
  pulses: "🫘",
  grains: "🌿",
};

/* ─────────────────────────────────────────────────────────────
   Tiny inline star component (no external icon needed)
───────────────────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24">
          <path
            d="M12 2l2.9 8.7H23l-7.4 5.4 2.8 8.7L12 19.4l-6.4 5.4 2.8-8.7L1 10.7h8.1z"
            fill={s <= Math.round(rating) ? "#D4AF37" : "rgba(212,175,55,0.22)"}
          />
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════════════ */
interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

export default function ProductCard({
  product,
  onQuickView,
  index = 0,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        (1 -
          parseInt(product.price.replace(/\D/g, "")) /
            parseInt(product.originalPrice.replace(/\D/g, ""))) *
          100,
      )
    : null;

  const badge = product.badge ? badgeConfig[product.badge] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.48, delay: index * 0.065, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      /* Lift on hover via framer */
      whileHover={{ y: -8 }}
      style={{
        willChange: "transform",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#fff",
        position: "relative",
        cursor: "default",
        /* CSS transitions for shadow + border */
        boxShadow: hovered
          ? "0 20px 52px rgba(212,175,55,0.22), 0 6px 18px rgba(62,47,28,0.1)"
          : "0 2px 14px rgba(62,47,28,0.07), 0 1px 3px rgba(62,47,28,0.04)",
        border: hovered
          ? "1.5px solid rgba(212,175,55,0.38)"
          : "1.5px solid rgba(62,47,28,0.06)",
        transition: "box-shadow 0.38s ease, border-color 0.38s ease",
      }}
    >
      {/* ════════════════════
          IMAGE ZONE
      ════════════════════ */}
      <div
        style={{
          position: "relative",
          height: "210px",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,rgba(212,175,55,0.08),rgba(107,142,35,0.08))",
        }}
      >
        {/* Product image */}
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ) : (
          /* Fallback placeholder */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "3rem" }}>
              {categoryEmoji[product.category] ?? "🌿"}
            </span>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "rgba(62,47,28,0.38)",
              }}
            >
              {product.category}
            </span>
          </div>
        )}

        {/* Bottom scrim */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,transparent 45%,rgba(20,12,4,0.32) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Badge (top-left) ── */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 9px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: badge.bg,
              color: badge.color,
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            <span>{badgeConfig[product.badge!]?.emoji}</span>
            <span>{product.badge}</span>
          </motion.div>
        )}

        {/* ── Limited indicator (top-right) ── */}
        {product.limited && (
          <motion.div
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "3px 9px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              fontWeight: 700,
              background: "rgba(192,57,43,0.92)",
              color: "#fff",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#ff9a9a",
                display: "inline-block",
                animation: "pulse 1.5s infinite",
              }}
            />
            Limited
          </motion.div>
        )}

        {/* ── Discount badge (bottom-left) ── */}
        {discount !== null && !product.limited && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              padding: "2px 8px",
              borderRadius: "6px",
              fontSize: "0.68rem",
              fontWeight: 700,
              background: "rgba(107,142,35,0.92)",
              color: "#fff",
              backdropFilter: "blur(6px)",
            }}
          >
            {discount}% OFF
          </div>
        )}

        {/* ── Quick View (bottom-right, hover only) ── */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "0.7rem",
            fontWeight: 600,
            background: "rgba(248,245,240,0.93)",
            color: "#3E2F1C",
            backdropFilter: "blur(8px)",
            border: "none",
            cursor: "pointer",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(7px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <FiEye size={12} strokeWidth={2.2} />
          Quick View
        </button>
      </div>

      {/* ════════════════════
          CONTENT ZONE
      ════════════════════ */}
      <div style={{ padding: "14px 16px 16px" }}>
        {/* Category + weight */}
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "#6B8E23",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {product.category}
          <span
            style={{
              color: "rgba(62,47,28,0.38)",
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: "normal",
              fontSize: "0.67rem",
            }}
          >
            · {product.weight}
          </span>
        </p>

        {/* Product name */}
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.3,
            color: hovered ? "#b8961f" : "#3E2F1C",
            transition: "color 0.3s ease",
            marginBottom: "9px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>

        {/* Star rating row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "10px",
          }}
        >
          <Stars rating={product.rating} />
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#3E2F1C",
            }}
          >
            {product.rating}
          </span>
          <span
            style={{
              fontSize: "0.68rem",
              color: "rgba(62,47,28,0.42)",
            }}
          >
            ({product.reviews.toLocaleString()})
          </span>
          {/* Verified badge */}
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.62rem",
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: "999px",
              background: "rgba(107,142,35,0.1)",
              color: "#506a1a",
              border: "1px solid rgba(107,142,35,0.2)",
            }}
          >
            ✓ Pure
          </span>
        </div>

        {/* Benefit tags — max 2 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            marginBottom: "13px",
            minHeight: "26px",
          }}
        >
          {product.benefits.slice(0, 2).map((b) => (
            <span
              key={b}
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: "999px",
                background: "rgba(107,142,35,0.09)",
                color: "#506a1a",
                border: "1px solid rgba(107,142,35,0.18)",
                letterSpacing: "0.02em",
              }}
            >
              {b}
            </span>
          ))}
          {product.benefits.length > 2 && (
            <span
              style={{
                fontSize: "0.65rem",
                padding: "3px 8px",
                borderRadius: "999px",
                background: "rgba(62,47,28,0.05)",
                color: "rgba(62,47,28,0.45)",
              }}
            >
              +{product.benefits.length - 2}
            </span>
          )}
        </div>

        {/* ── Price + CTA row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1px solid rgba(62,47,28,0.08)",
          }}
        >
          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: "1.18rem",
                color: "#3E2F1C",
                lineHeight: 1,
              }}
            >
              {product.price}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: "0.72rem",
                  textDecoration: "line-through",
                  color: "rgba(62,47,28,0.35)",
                }}
              >
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Buy on Amazon CTA */}
          <motion.a
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "999px",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textDecoration: "none",
              background: "linear-gradient(135deg,#D4AF37,#e8c84a)",
              color: "#3E2F1C",
              boxShadow: hovered
                ? "0 6px 20px rgba(212,175,55,0.52)"
                : "0 3px 10px rgba(212,175,55,0.32)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <FaAmazon size={12} />
            Buy Now
          </motion.a>
        </div>
      </div>

      {/* ── Animated gold border sweep on hover ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "18px",
          pointerEvents: "none",
          background:
            "linear-gradient(135deg,rgba(212,175,55,0.08),transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.38s ease",
        }}
      />
    </motion.article>
  );
}
