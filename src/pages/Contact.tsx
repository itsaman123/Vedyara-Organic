import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheck,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaAmazon,
} from "react-icons/fa";
import {
  fadeUp,
  staggerContainer as stagger,
  slideRight,
} from "../utils/animations";

/* ─────────────────────────────────────────────────────────────
   Leaf SVG decoration
───────────────────────────────────────────────────────────── */
const LeafAccent = ({
  size = 36,
  opacity = 0.2,
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
   Contact info items
───────────────────────────────────────────────────────────── */
const contactItems = [
  {
    icon: FiMail,
    label: "Email Us",
    value: "vedyaraorg@gmail.com",
    href: "mailto:vedyaraorg@gmail.com",
    desc: "We reply within 24 hours",
    color: "#D4AF37",
  },
  {
    icon: FiPhone,
    label: "Call Us",
    value: "+91 9509628400",
    href: "tel:+91 9509628400",
    desc: "Mon-Sun, 9am-10pm IST",
    color: "#6B8E23",
  },
  {
    icon: FiMapPin,
    label: "Sourced From",
    value: "Uttar Pradesh | Uttarakhand | Bihar",
    href: null,
    desc: "Direct from organic farms",
    color: "#D4AF37",
  },
];

const socialLinks = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/919509628400?text=Hi%20Vedyara%20Organic!",
    color: "#25D366",
    bg: "rgba(37,211,102,0.12)",
    border: "rgba(37,211,102,0.25)",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/vedyara.organic",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    border: "rgba(225,48,108,0.2)",
  },
  // {
  //   icon: FaFacebookF,
  //   label: "Facebook",
  //   href: "https://facebook.com",
  //   color: "#1877F2",
  //   bg: "rgba(24,119,242,0.08)",
  //   border: "rgba(24,119,242,0.2)",
  // },
  // {
  //   icon: FaYoutube,
  //   label: "YouTube",
  //   href: "https://youtube.com",
  //   color: "#FF0000",
  //   bg: "rgba(255,0,0,0.08)",
  //   border: "rgba(255,0,0,0.18)",
  // },
  // {
  //   icon: FaAmazon,
  //   label: "Amazon",
  //   href: "https://www.amazon.in",
  //   color: "#D4AF37",
  //   bg: "rgba(212,175,55,0.1)",
  //   border: "rgba(212,175,55,0.25)",
  // },
];

const faqs = [
  {
    q: "Where are your products sourced from?",
    a: "All our products are sourced directly from certified organic farms across India — including the Uttar Pradesh, Uttarakhand and Bihar.",
  },
  {
    q: "Where can I buy Vedyara Organic products?",
    a: "Our products are available exclusively on Amazon India. Click any 'Buy on Amazon' button on our site to be redirected to our store.",
  },
  {
    q: "Are your products certified organic?",
    a: "Yes. All products are FSSAI certified and lab-tested for purity, quality, and safety before being packaged and dispatched.",
  },
  {
    q: "Do you offer bulk or wholesale orders?",
    a: "Absolutely! Please reach out via email or WhatsApp for bulk pricing and partnership inquiries.",
  },
];

/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════════════════════════ */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: "sf_1523fb872fc7b7a279b5bba5",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success !== false) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      setSubmitError(err?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
      {/* ════════════════════════════════════════════════════
          PAGE HERO BANNER
      ════════════════════════════════════════════════════ */}
      <div
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1a1208 0%, #2a1f12 40%, #3e2f1c 70%, #2a1f12 100%)",
        }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/3 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(107,142,35,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Floating decorative emojis */}
        {["🌿", "🍯", "🌾", "💬"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl pointer-events-none select-none"
            style={{
              left: `${10 + i * 25}%`,
              top: `${25 + (i % 2) * 35}%`,
              opacity: 0.1,
            }}
            animate={{ y: [0, -12, 0], rotate: [0, 8, -6, 0] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}

        {/* Decorative leaves */}
        <div className="absolute top-24 right-10 pointer-events-none">
          <motion.div
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={60} opacity={0.12} />
          </motion.div>
        </div>
        <div className="absolute bottom-16 left-8 pointer-events-none">
          <motion.div
            animate={{ rotate: [6, -6, 6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <LeafAccent size={44} opacity={0.09} />
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(212,175,55,0.7)", letterSpacing: "0.22em" }}
          >
            Vedyara Organic &nbsp;/&nbsp; Contact Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif font-bold mb-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F8F5F0" }}
          >
            Let's{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37, #e8c84a, #D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Connect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(248,245,240,0.62)" }}
          >
            Have a question about our products, want to place a bulk order, or
            just want to share your organic journey? We'd love to hear from you.
          </motion.p>
        </div>

        {/* Wave bottom */}
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

      {/* ════════════════════════════════════════════════════
          MAIN CONTENT GRID
      ════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ── LEFT COLUMN: Info + WhatsApp + Social ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Section heading */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 mb-3">
                <div
                  className="w-6 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #D4AF37)",
                  }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#D4AF37", letterSpacing: "0.22em" }}
                >
                  Reach Us
                </span>
                <div
                  className="w-6 h-px"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, #D4AF37)",
                  }}
                />
              </div>
              <h2
                className="font-serif font-bold leading-tight mb-3"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "#3E2F1C",
                }}
              >
                We're Here to Help
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(62,47,28,0.62)" }}
              >
                Whether you have product questions, need help with your Amazon
                order, or want to explore bulk/wholesale pricing — drop us a
                message and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            {/* Contact info cards */}
            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={slideRight}
                  custom={i * 0.08}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-2xl group transition-all duration-300"
                      style={{
                        background: "white",
                        border: "1px solid rgba(62,47,28,0.07)",
                        boxShadow: "0 2px 12px rgba(62,47,28,0.06)",
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `rgba(${item.color === "#D4AF37" ? "212,175,55" : "107,142,35"},0.12)`,
                        }}
                      >
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                          style={{
                            color: "rgba(62,47,28,0.45)",
                            letterSpacing: "0.14em",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="font-semibold text-sm truncate transition-colors duration-300 group-hover:text-brand-gold"
                          style={{ color: "#3E2F1C" }}
                        >
                          {item.value}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "rgba(62,47,28,0.45)" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div
                      className="flex items-start gap-4 p-4 rounded-2xl"
                      style={{
                        background: "white",
                        border: "1px solid rgba(62,47,28,0.07)",
                        boxShadow: "0 2px 12px rgba(62,47,28,0.06)",
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(212,175,55,0.12)" }}
                      >
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                          style={{
                            color: "rgba(62,47,28,0.45)",
                            letterSpacing: "0.14em",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "#3E2F1C" }}
                        >
                          {item.value}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "rgba(62,47,28,0.45)" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA — prominent */}
            {/* <motion.div variants={fadeUp} custom={0.3}>
              <a
                href="https://wa.me/919509628400?text=Hi%20Vedyara%20Organic!%20I%20have%20a%20question%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  background: "linear-gradient(135deg, #25D366, #1da851)",
                  boxShadow: "0 8px 28px rgba(37,211,102,0.35)",
                  animation: "whatsappPulse 2.5s ease-in-out infinite",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <FaWhatsapp size={24} color="white" />
                </div>
                <div>
                  <p className="font-bold text-white text-base leading-none mb-1">
                    Chat on WhatsApp
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    Instant replies · Mon–Sat, 9am–7pm IST
                  </p>
                </div>
                <div className="ml-auto">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10H16M11 5L16 10L11 15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </a>
            </motion.div> */}

            {/* Social media links */}
            <motion.div variants={fadeUp} custom={0.4}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{
                  color: "rgba(62,47,28,0.45)",
                  letterSpacing: "0.16em",
                }}
              >
                Follow & Shop
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(
                  ({ icon: Icon, label, href, color, bg, border }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300"
                      style={{
                        background: bg,
                        border: `1px solid ${border}`,
                        color: color,
                      }}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>

            {/* Business hours */}
            <motion.div
              variants={fadeUp}
              custom={0.5}
              className="p-5 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid rgba(62,47,28,0.07)",
                boxShadow: "0 2px 12px rgba(62,47,28,0.06)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{
                  color: "rgba(62,47,28,0.45)",
                  letterSpacing: "0.14em",
                }}
              >
                Business Hours
              </p>
              {[
                { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
                { day: "Saturday", time: "9:00 AM – 4:00 PM" },
                { day: "Sunday", time: "Closed (orders accepted)" },
              ].map(({ day, time }) => (
                <div
                  key={day}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                  style={{ borderColor: "rgba(62,47,28,0.06)" }}
                >
                  <span
                    className="text-sm"
                    style={{ color: "rgba(62,47,28,0.65)" }}
                  >
                    {day}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#3E2F1C" }}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
              style={{
                background: "white",
                boxShadow:
                  "0 8px 40px rgba(62,47,28,0.1), 0 2px 8px rgba(62,47,28,0.06)",
                border: "1px solid rgba(62,47,28,0.06)",
              }}
            >
              {/* Decorative corner gradient */}
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-bl-full"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(212,175,55,0.07) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none rounded-tr-full"
                style={{
                  background:
                    "radial-gradient(circle at bottom left, rgba(107,142,35,0.05) 0%, transparent 70%)",
                }}
              />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  /* ── FORM ── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                    className="relative z-10"
                  >
                    {/* Form heading */}
                    <div className="mb-8">
                      <h2
                        className="font-serif font-bold mb-2"
                        style={{ fontSize: "1.75rem", color: "#3E2F1C" }}
                      >
                        Send us a Message
                      </h2>
                      <p
                        className="text-sm"
                        style={{ color: "rgba(62,47,28,0.55)" }}
                      >
                        Fill out the form below and we'll get back to you within
                        24 hours.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name field */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                            style={{
                              color: "rgba(62,47,28,0.6)",
                              letterSpacing: "0.12em",
                            }}
                          >
                            Full Name *
                          </label>
                          <div className="relative">
                            <FiUser
                              size={15}
                              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                              style={{
                                color: errors.name
                                  ? "#e74c3c"
                                  : "rgba(62,47,28,0.35)",
                              }}
                            />
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none"
                              style={{
                                borderColor: errors.name
                                  ? "#e74c3c"
                                  : formData.name
                                    ? "#D4AF37"
                                    : "rgba(62,47,28,0.14)",
                                color: "#3E2F1C",
                                background: "#FAFAF9",
                                boxShadow: errors.name
                                  ? "0 0 0 3px rgba(231,76,60,0.12)"
                                  : formData.name
                                    ? "0 0 0 3px rgba(212,175,55,0.12)"
                                    : "none",
                              }}
                            />
                          </div>
                          <AnimatePresence>
                            {errors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs mt-1.5"
                                style={{ color: "#e74c3c" }}
                              >
                                {errors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Email field */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                            style={{
                              color: "rgba(62,47,28,0.6)",
                              letterSpacing: "0.12em",
                            }}
                          >
                            Email Address *
                          </label>
                          <div className="relative">
                            <FiMail
                              size={15}
                              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                              style={{
                                color: errors.email
                                  ? "#e74c3c"
                                  : "rgba(62,47,28,0.35)",
                              }}
                            />
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              className="w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none"
                              style={{
                                borderColor: errors.email
                                  ? "#e74c3c"
                                  : formData.email
                                    ? "#D4AF37"
                                    : "rgba(62,47,28,0.14)",
                                color: "#3E2F1C",
                                background: "#FAFAF9",
                                boxShadow: errors.email
                                  ? "0 0 0 3px rgba(231,76,60,0.12)"
                                  : formData.email
                                    ? "0 0 0 3px rgba(212,175,55,0.12)"
                                    : "none",
                              }}
                            />
                          </div>
                          <AnimatePresence>
                            {errors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs mt-1.5"
                                style={{ color: "#e74c3c" }}
                              >
                                {errors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                          style={{
                            color: "rgba(62,47,28,0.6)",
                            letterSpacing: "0.12em",
                          }}
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none cursor-pointer"
                          style={{
                            borderColor: formData.subject
                              ? "#D4AF37"
                              : "rgba(62,47,28,0.14)",
                            color: formData.subject
                              ? "#3E2F1C"
                              : "rgba(62,47,28,0.45)",
                            background: "#FAFAF9",
                            boxShadow: formData.subject
                              ? "0 0 0 3px rgba(212,175,55,0.12)"
                              : "none",
                          }}
                        >
                          <option value="" disabled>
                            Select a topic…
                          </option>
                          <option value="product-inquiry">
                            Product Inquiry
                          </option>
                          <option value="bulk-order">
                            Bulk / Wholesale Order
                          </option>
                          <option value="amazon-order">
                            Amazon Order Help
                          </option>
                          <option value="quality-feedback">
                            Quality Feedback
                          </option>
                          <option value="partnership">
                            Farm / Business Partnership
                          </option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                          style={{
                            color: "rgba(62,47,28,0.6)",
                            letterSpacing: "0.12em",
                          }}
                        >
                          Message *
                        </label>
                        <div className="relative">
                          <FiMessageSquare
                            size={15}
                            className="absolute left-4 top-4 pointer-events-none"
                            style={{
                              color: errors.message
                                ? "#e74c3c"
                                : "rgba(62,47,28,0.35)",
                            }}
                          />
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us how we can help you…"
                            className="w-full pl-10 pr-4 pt-3.5 pb-3.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none resize-none"
                            style={{
                              borderColor: errors.message
                                ? "#e74c3c"
                                : formData.message
                                  ? "#D4AF37"
                                  : "rgba(62,47,28,0.14)",
                              color: "#3E2F1C",
                              background: "#FAFAF9",
                              boxShadow: errors.message
                                ? "0 0 0 3px rgba(231,76,60,0.12)"
                                : formData.message
                                  ? "0 0 0 3px rgba(212,175,55,0.12)"
                                  : "none",
                              lineHeight: "1.65",
                            }}
                          />
                          {/* Character count */}
                          <span
                            className="absolute bottom-3 right-4 text-xs"
                            style={{
                              color:
                                formData.message.length > 450
                                  ? "#D4AF37"
                                  : "rgba(62,47,28,0.3)",
                            }}
                          >
                            {formData.message.length}/500
                          </span>
                        </div>
                        <AnimatePresence>
                          {errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs mt-1.5"
                              style={{ color: "#e74c3c" }}
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-400 focus:outline-none"
                        style={{
                          background: isSubmitting
                            ? "rgba(212,175,55,0.7)"
                            : "linear-gradient(135deg, #D4AF37 0%, #e8c84a 50%, #D4AF37 100%)",
                          backgroundSize: "200% 200%",
                          color: "#3E2F1C",
                          boxShadow: isSubmitting
                            ? "none"
                            : "0 10px 32px rgba(212,175,55,0.45)",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            {/* Spinner */}
                            <motion.div
                              className="w-5 h-5 border-2 border-current rounded-full"
                              style={{ borderTopColor: "transparent" }}
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.85,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <FiSend size={18} strokeWidth={2.2} />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>

                      {/* Submission error */}
                      {submitError && (
                        <p
                          className="text-xs text-center mt-2"
                          style={{ color: "#e74c3c" }}
                        >
                          {submitError}
                        </p>
                      )}

                      {/* Privacy note */}
                      <p
                        className="text-xs text-center"
                        style={{ color: "rgba(62,47,28,0.38)" }}
                      >
                        🔒 Your information is safe with us. We never share your
                        data with third parties.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center py-16"
                  >
                    {/* Success icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(107,142,35,0.15), rgba(107,142,35,0.05))",
                        border: "2px solid rgba(107,142,35,0.3)",
                      }}
                    >
                      <FiCheck
                        size={34}
                        style={{ color: "#6B8E23" }}
                        strokeWidth={3}
                      />
                    </motion.div>

                    {/* Confetti-like dots */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full pointer-events-none"
                        style={{
                          background: i % 2 === 0 ? "#D4AF37" : "#6B8E23",
                          top: `${20 + Math.random() * 60}%`,
                          left: `${10 + Math.random() * 80}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 0.8, 0],
                          y: [-20, 20],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 0.2 + i * 0.1,
                          ease: "easeOut",
                        }}
                      />
                    ))}

                    <motion.h3
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="font-serif font-bold mb-3"
                      style={{ fontSize: "1.8rem", color: "#3E2F1C" }}
                    >
                      Message Sent! 🌿
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="text-sm leading-relaxed mb-8 max-w-sm"
                      style={{ color: "rgba(62,47,28,0.62)" }}
                    >
                      Thank you, <strong>{formData.name}</strong>! We've
                      received your message and will reply to{" "}
                      <strong>{formData.email}</strong> within 24 hours.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
                    >
                      <button
                        onClick={resetForm}
                        className="flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background:
                            "linear-gradient(135deg, #D4AF37, #e8c84a)",
                          color: "#3E2F1C",
                          boxShadow: "0 8px 24px rgba(212,175,55,0.35)",
                        }}
                      >
                        Send Another
                      </button>
                      <a
                        href="https://wa.me/919509628400"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background:
                            "linear-gradient(135deg, #25D366, #1da851)",
                          color: "white",
                          boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
                        }}
                      >
                        <FaWhatsapp size={17} />
                        WhatsApp Us
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          FAQ SECTION
      ════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24" style={{ background: "#EDE8E0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-6 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, #D4AF37)",
                }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#D4AF37", letterSpacing: "0.22em" }}
              >
                FAQs
              </span>
              <div
                className="w-6 h-px"
                style={{
                  background: "linear-gradient(to left, transparent, #D4AF37)",
                }}
              />
            </div>
            <h2
              className="font-serif font-bold mb-3"
              style={{
                fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
                color: "#3E2F1C",
              }}
            >
              Frequently Asked{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #b8961f, #D4AF37, #e8c84a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Questions
              </span>
            </h2>
            <p
              className="text-sm max-w-md mx-auto"
              style={{ color: "rgba(62,47,28,0.55)" }}
            >
              Can't find your answer? Reach out on WhatsApp for the fastest
              response.
            </p>
          </motion.div>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  border:
                    openFaq === i
                      ? "1.5px solid rgba(212,175,55,0.4)"
                      : "1px solid rgba(62,47,28,0.07)",
                  boxShadow:
                    openFaq === i
                      ? "0 8px 30px rgba(212,175,55,0.12)"
                      : "0 2px 12px rgba(62,47,28,0.05)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 focus:outline-none"
                  style={{ background: "transparent" }}
                >
                  <span
                    className="font-semibold text-base pr-4 leading-snug"
                    style={{
                      color: openFaq === i ? "#3E2F1C" : "rgba(62,47,28,0.82)",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        openFaq === i
                          ? "linear-gradient(135deg, #D4AF37, #e8c84a)"
                          : "rgba(62,47,28,0.07)",
                      color: openFaq === i ? "#3E2F1C" : "rgba(62,47,28,0.5)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 2V12M2 7H12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-6 pb-5"
                        style={{
                          borderTop: "1px solid rgba(212,175,55,0.12)",
                          paddingTop: "16px",
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(62,47,28,0.65)" }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10"
          >
            <p className="text-sm mb-4" style={{ color: "rgba(62,47,28,0.5)" }}>
              Still have questions?
            </p>
            <a
              href="https://wa.me/919509628400"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #25D366, #1da851)",
                color: "white",
                boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
              }}
            >
              <FaWhatsapp size={18} />
              Chat With Us on WhatsApp
            </a>
          </motion.div> */}
        </div>
      </section>
      {/* Floating WhatsApp quick action */}
      <a
        href="https://wa.me/919509628400?text=Hi%20Vedyara%20Organic!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105"
        style={{ background: "#25D366", color: "white" }}
      >
        <FaWhatsapp size={22} />
      </a>
    </div>
  );
}
