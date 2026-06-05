import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

const rows = [
  {
    feature: "Processing Method",
    vedyara: "Cold-extracted / Stone-ground",
    regular: "Heat-processed & refined",
  },
  {
    feature: "Additives & Preservatives",
    vedyara: "Absolutely zero additives",
    regular: "Added preservatives & fillers",
  },
  {
    feature: "Sourcing",
    vedyara: "Direct from verified partner farms",
    regular: "Multiple unverified middlemen",
  },
  {
    feature: "Lab Testing",
    vedyara: "Every batch, NABL-certified labs",
    regular: "Rare or self-declared",
  },
  {
    feature: "Purity",
    vedyara: "100% raw — never diluted",
    regular: "Often blended or diluted",
  },
  {
    feature: "FSSAI Certification",
    vedyara: "Fully certified & compliant",
    regular: "Compliance varies widely",
  },
  {
    feature: "Nutrient Retention",
    vedyara: "Full enzymes & antioxidants intact",
    regular: "Mostly destroyed by heat",
  },
];

export default function ProductComparison() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#faf9f7" }}>
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#2D4A1E", letterSpacing: "0.22em" }}
          >
            The Vedyara Difference
          </span>
          <h2
            className="font-serif font-bold"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#0f0a05" }}
          >
            Vedyara vs{" "}
            <span style={{ color: "rgba(15,10,5,0.35)" }}>Regular Brands</span>
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "rgba(15,10,5,0.5)" }}>
            The difference isn't just marketing — it's every step of the process.
          </p>
        </motion.div>

        {/* ── Mobile: stacked cards ── */}
        <div className="md:hidden space-y-3">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(62,47,28,0.08)", background: "#fff" }}
            >
              {/* Feature label */}
              <div
                className="px-4 py-2.5"
                style={{ background: "rgba(62,47,28,0.04)", borderBottom: "1px solid rgba(62,47,28,0.06)" }}
              >
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "rgba(15,10,5,0.5)" }}>
                  {row.feature}
                </span>
              </div>

              <div className="grid grid-cols-2 divide-x" style={{ divideColor: "rgba(62,47,28,0.06)" }}>
                {/* Vedyara */}
                <div className="px-3 py-3 flex flex-col gap-1.5" style={{ background: "rgba(45,74,30,0.03)" }}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(45,74,30,0.15)" }}
                    >
                      <FiCheck size={9} strokeWidth={3} style={{ color: "#2D4A1E" }} />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: "#2D4A1E" }}>Vedyara</span>
                  </div>
                  <p className="text-[11px] leading-snug" style={{ color: "rgba(15,10,5,0.65)" }}>
                    {row.vedyara}
                  </p>
                </div>

                {/* Regular */}
                <div className="px-3 py-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(220,53,69,0.1)" }}
                    >
                      <FiX size={9} strokeWidth={3} style={{ color: "#dc3545" }} />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: "rgba(15,10,5,0.4)" }}>Regular</span>
                  </div>
                  <p className="text-[11px] leading-snug" style={{ color: "rgba(15,10,5,0.4)" }}>
                    {row.regular}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Mobile score row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(45,74,30,0.07)", border: "1px solid rgba(45,74,30,0.15)" }}
            >
              <p className="font-serif font-bold text-2xl" style={{ color: "#2D4A1E" }}>7/7</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(15,10,5,0.5)" }}>Vedyara passes</p>
            </div>
            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(62,47,28,0.03)", border: "1px solid rgba(62,47,28,0.08)" }}
            >
              <p className="font-serif font-bold text-2xl" style={{ color: "rgba(15,10,5,0.2)" }}>0/7</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(15,10,5,0.4)" }}>Regular passes</p>
            </div>
          </div>
        </div>

        {/* ── Desktop: table ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="hidden md:block rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(62,47,28,0.08)" }}
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-white border-b" style={{ borderColor: "rgba(62,47,28,0.08)" }}>
            <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(15,10,5,0.35)" }}>
              Feature
            </div>
            <div className="px-5 py-4 text-center" style={{ background: "linear-gradient(135deg, #2D4A1E, #3d6b2a)" }}>
              <span className="text-sm font-bold text-white">Vedyara</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#D4AF37", color: "#3E2F1C" }}>
                Pure
              </span>
            </div>
            <div className="px-5 py-4 text-center bg-gray-50">
              <span className="text-sm font-semibold" style={{ color: "rgba(15,10,5,0.45)" }}>Regular Brands</span>
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-b cursor-default transition-colors duration-200"
              style={{
                borderColor: "rgba(62,47,28,0.06)",
                background: hoveredRow === i ? "rgba(45,74,30,0.03)" : i % 2 === 0 ? "#fff" : "#fcfcfb",
              }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className="px-5 py-4 flex items-center">
                <span className="text-sm font-semibold" style={{ color: "#0f0a05" }}>{row.feature}</span>
              </div>
              <div className="px-5 py-4 flex items-center gap-2.5" style={{ borderLeft: "1px solid rgba(45,74,30,0.1)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(45,74,30,0.1)" }}>
                  <FiCheck size={11} strokeWidth={3} style={{ color: "#2D4A1E" }} />
                </div>
                <span className="text-xs leading-snug font-semibold" style={{ color: "#2D4A1E" }}>{row.vedyara}</span>
              </div>
              <div className="px-5 py-4 flex items-center gap-2.5" style={{ borderLeft: "1px solid rgba(62,47,28,0.06)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(220,53,69,0.08)" }}>
                  <FiX size={11} strokeWidth={3} style={{ color: "#dc3545" }} />
                </div>
                <span className="text-xs leading-snug" style={{ color: "rgba(15,10,5,0.45)" }}>{row.regular}</span>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-3 bg-white" style={{ borderTop: "2px solid rgba(45,74,30,0.08)" }}>
            <div className="px-5 py-4" />
            <div className="px-5 py-5 text-center" style={{ background: "rgba(45,74,30,0.03)", borderLeft: "1px solid rgba(45,74,30,0.1)" }}>
              <div className="text-2xl font-bold font-serif mb-0.5" style={{ color: "#2D4A1E" }}>7/7</div>
              <div className="text-xs" style={{ color: "rgba(15,10,5,0.5)" }}>Quality checks passed</div>
            </div>
            <div className="px-5 py-5 text-center" style={{ borderLeft: "1px solid rgba(62,47,28,0.06)" }}>
              <div className="text-2xl font-bold font-serif mb-0.5" style={{ color: "rgba(15,10,5,0.25)" }}>0/7</div>
              <div className="text-xs" style={{ color: "rgba(15,10,5,0.4)" }}>Quality checks passed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
