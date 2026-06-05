import { motion } from "framer-motion";

const steps = [
  {
    icon: "🐝",
    step: "01",
    title: "Bee Farm",
    desc: "Our bees forage pristine forests and meadows, collecting nectar at peak bloom from chemical-free environments.",
    accent: "#D4AF37",
  },
  {
    icon: "🌾",
    step: "02",
    title: "Harvest",
    desc: "Expert beekeepers hand-harvest with traditional techniques, preserving every enzyme and natural property.",
    accent: "#6B8E23",
  },
  {
    icon: "🔬",
    step: "03",
    title: "Lab Testing",
    desc: "Every single batch is sent to NABL-certified labs. No product ships without passing our purity benchmark.",
    accent: "#2D4A1E",
  },
  {
    icon: "📦",
    step: "04",
    title: "Packaging",
    desc: "Cold-filled in FSSAI-certified hygienic facilities. Zero heat treatment — every nutrient stays intact.",
    accent: "#8B6914",
  },
  {
    icon: "🚚",
    step: "05",
    title: "Your Door",
    desc: "Shipped directly from our facility to your home. No warehousing delays, no quality compromise.",
    accent: "#2D4A1E",
  },
];

export default function FarmToHome() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#0f1f08" }}>
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#D4AF37", letterSpacing: "0.22em" }}
          >
            Our Process
          </span>
          <h2
            className="font-serif font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Farm to{" "}
            <span style={{ color: "#D4AF37" }}>Your Home</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Five careful steps between nature's bounty and your table — no shortcuts, no compromises.
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-[52px] left-0 right-0 flex items-center px-[10%]" style={{ zIndex: 0 }}>
            <motion.div
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, #D4AF37, #6B8E23, #D4AF37)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div
                  className="w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center mb-6 relative"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `2px solid ${step.accent}`,
                    boxShadow: `0 0 24px ${step.accent}22`,
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{step.icon}</span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      color: step.accent,
                      letterSpacing: "0.12em",
                      marginTop: "2px",
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-10">
          {/* Vertical line */}
          <div
            className="absolute left-[20px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #D4AF37, #6B8E23, #D4AF37)" }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
                className="relative flex items-start gap-5"
              >
                {/* Dot on line */}
                <div
                  className="absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "#0f1f08",
                    border: `2px solid ${step.accent}`,
                    top: "2px",
                  }}
                >
                  <span style={{ fontSize: "0.95rem" }}>{step.icon}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: "0.6rem", color: step.accent, fontWeight: 800, letterSpacing: "0.14em" }}>
                      {step.step}
                    </span>
                    <h3 className="font-serif font-bold text-white text-base">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
