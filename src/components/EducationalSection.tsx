import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const topics = [
  {
    id: "crystallization",
    icon: "❄️",
    title: "Why Honey Crystallizes",
    subtitle: "It's a sign of purity",
    shortDesc: "Real honey crystallizes. Fake honey doesn't.",
    content: {
      headline: "Crystallization = Purity",
      explanation:
        "Pure, raw honey naturally crystallizes over time — this is completely normal and actually a sign of quality. The glucose in honey forms crystals, especially at temperatures between 10°C–20°C. Honey that never crystallizes has likely been over-heated, over-filtered, or adulterated.",
      facts: [
        { icon: "✓", text: "Crystallized honey has 100% of its nutrients intact" },
        { icon: "✓", text: "Gently warm the jar in lukewarm water to restore liquid form" },
        { icon: "✓", text: "Avoid microwaving — it destroys enzymes and antioxidants" },
        { icon: "✓", text: "Vedyara honey may crystallize within 3–6 months — that's the proof" },
      ],
      tip: "To liquefy: place the sealed jar in warm water (40°C) for 15–20 minutes. Never boil.",
    },
  },
  {
    id: "purity",
    title: "Purity Test at Home",
    icon: "🔍",
    subtitle: "Know what's real",
    shortDesc: "Simple tests to verify your honey at home.",
    content: {
      headline: "3 Simple Purity Tests",
      explanation:
        "While lab testing is the gold standard (which we do for every Vedyara batch), here are three simple tests you can do at home to get a quick indication of honey purity.",
      facts: [
        { icon: "01", text: "Thumb Test: Drop a small amount on your thumb. Pure honey stays in place; adulterated honey spreads." },
        { icon: "02", text: "Water Test: Add a teaspoon to a glass of water. Pure honey settles at the bottom without dissolving immediately." },
        { icon: "03", text: "Flame Test: Dip a matchstick in honey. Pure honey ignites; honey with moisture or additives won't light easily." },
        { icon: "04", text: "Crystallization Check: Pure raw honey crystallizes naturally within weeks to months." },
      ],
      tip: "Note: These home tests are indicative, not definitive. Our Vedyara honey is NABL lab-certified for every batch.",
    },
  },
  {
    id: "benefits",
    title: "Why Choose Raw Honey",
    icon: "🌟",
    subtitle: "Over processed varieties",
    shortDesc: "Raw honey vs commercial honey — the real difference.",
    content: {
      headline: "Raw vs Processed Honey",
      explanation:
        "Commercial honey is typically heated to 70°C+ for easier bottling and longer shelf life. This process destroys the very compounds that make honey beneficial. Raw honey, like Vedyara's, preserves everything nature intended.",
      facts: [
        { icon: "🍯", text: "Enzymes: Raw honey contains diastase, invertase & glucose oxidase — all destroyed by heat" },
        { icon: "🌸", text: "Pollen: Natural bee pollen provides antioxidants and is filtered out of commercial honey" },
        { icon: "🔬", text: "Antioxidants: Raw honey has 4.3x more antioxidant activity than processed honey" },
        { icon: "💪", text: "Immunity: Raw honey's natural hydrogen peroxide content gives it antibacterial properties" },
      ],
      tip: "Vedyara honey is cold-extracted and minimally filtered — we only remove wax and debris, never nutrients.",
    },
  },
];

export default function EducationalSection() {
  const [active, setActive] = useState(topics[0].id);
  const current = topics.find((t) => t.id === active)!;

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#F4EDE0" }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#2D4A1E", letterSpacing: "0.22em" }}
          >
            Know Your Food
          </span>
          <h2
            className="font-serif font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f0a05" }}
          >
            Education Hub
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "rgba(15,10,5,0.5)" }}>
            Understanding your food is the first step to choosing it wisely.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Tab list — vertical always, side-by-side on lg */}
          <div className="lg:w-72 flex flex-col gap-2 lg:gap-3">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActive(topic.id)}
                className="w-full text-left px-4 py-3.5 lg:p-5 rounded-2xl transition-all duration-200"
                style={{
                  background: active === topic.id ? "#2D4A1E" : "rgba(255,255,255,0.7)",
                  border: `1.5px solid ${active === topic.id ? "#2D4A1E" : "rgba(62,47,28,0.1)"}`,
                  boxShadow: active === topic.id ? "0 8px 24px rgba(45,74,30,0.2)" : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "1.3rem" }}>{topic.icon}</span>
                  <div className="min-w-0">
                    <p
                      className="font-semibold text-sm"
                      style={{ color: active === topic.id ? "#fff" : "#0f0a05" }}
                    >
                      {topic.title}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: active === topic.id ? "rgba(255,255,255,0.65)" : "rgba(15,10,5,0.45)" }}
                    >
                      {topic.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-3xl p-7 lg:p-10 h-full"
                style={{ background: "#fff", boxShadow: "0 4px 30px rgba(0,0,0,0.07)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: "2rem" }}>{current.icon}</span>
                  <div>
                    <h3
                      className="font-serif font-bold text-xl"
                      style={{ color: "#0f0a05" }}
                    >
                      {current.content.headline}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(15,10,5,0.45)" }}>
                      {current.subtitle}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "rgba(15,10,5,0.6)" }}
                >
                  {current.content.explanation}
                </p>

                <ul className="space-y-3 mb-6">
                  {current.content.facts.map((fact, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: "rgba(45,74,30,0.1)", color: "#2D4A1E" }}
                      >
                        {fact.icon}
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: "rgba(15,10,5,0.7)" }}>
                        {fact.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <span style={{ fontSize: "1.1rem" }}>💡</span>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(15,10,5,0.6)" }}>
                    <strong style={{ color: "#8B6914" }}>Pro tip: </strong>
                    {current.content.tip}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
