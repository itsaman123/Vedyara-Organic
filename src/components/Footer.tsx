import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import LogoBrand from "./LogoBrand";
import {
  FaInstagram,
  // FaFacebookF,
  // FaYoutube,

  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";

const footerLinks = {
  quickLinks: [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  products: [
    { label: "Himalayan Wild Honey", to: "/products" },
    { label: "Organic Jaggery Powder", to: "/products" },
    { label: "Foxtail Millet", to: "/products" },
    { label: "Pearl Millet (Bajra)", to: "/products" },
    { label: "Red Lentils (Masoor)", to: "/products" },
    { label: "Finger Millet (Ragi)", to: "/products" },
  ],
  certifications: [
    "FSSAI Certified",
    "Organic India Certified",
    "Lab Tested & Verified",
    "No Artificial Additives",
  ],
};

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/vedyara.organic",
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  // {
  //   icon: FaFacebookF,
  //   href: "https://facebook.com",
  //   label: "Facebook",
  //   color: "hover:text-blue-400",
  // },
  // {
  //   icon: FaYoutube,
  //   href: "https://youtube.com",
  //   label: "YouTube",
  //   color: "hover:text-red-400",
  // },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/919509628400",
    label: "WhatsApp",
    color: "hover:text-green-400",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1a1208 0%, #2a1f12 40%, #3e2f1c 70%, #2a1f12 100%)",
      }}
    >
      {/* Decorative top border */}
      <div
        className="w-full"
        style={{
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #D4AF37, #6B8E23, #D4AF37, transparent)",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(107,142,35,0.05) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── Amazon CTA Banner ── */}
      <div
        className="relative py-10 px-4 text-center border-b"
        style={{ borderColor: "rgba(212,175,55,0.12)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#D4AF37", letterSpacing: "0.22em" }}
          >
            Coming Soon On
          </p>
          <h3
            className="font-serif font-bold mb-5"
            style={{ color: "#F8F5F0", fontSize: "1.65rem" }}
          >
            Vedyara Organic on Amazon
          </h3>
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 group"
            style={{
              background: "rgba(248,245,240,0.15)",
              color: "rgba(248,245,240,0.5)",
              cursor: "not-allowed",
              userSelect: "none",
            }}
          >
            <span>Coming Soon</span>
          </div>
          <p
            className="mt-4 text-xs"
            style={{ color: "rgba(248,245,240,0.4)" }}
          >
            Fast delivery · Easy returns · Amazon-verified seller
          </p>
        </motion.div>
      </div>

      {/* ── Main Footer Grid ── */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Col 1: Brand ── */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            {/* Logo */}
            <Link
              to="/"
              className="inline-block mb-5"
              style={{ lineHeight: 0 }}
            >
              <LogoBrand variant="light" height={52} />
            </Link>

            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(248,245,240,0.55)", maxWidth: "240px" }}
            >
              Pure, natural, and trusted by tradition. Bringing the goodness of
              India's farms directly to your home — no shortcuts, no chemicals.
            </p>

            {/* Certifications */}
            <div className="space-y-2 mb-7">
              {footerLinks.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#6B8E23" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "rgba(248,245,240,0.45)" }}
                  >
                    {cert}
                  </span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${color} hover:-translate-y-1`}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(248,245,240,0.55)",
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Quick Links ── */}
          <motion.div variants={itemVariants}>
            <h4
              className="font-serif font-bold mb-5 text-base"
              style={{ color: "#F8F5F0" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm transition-colors duration-300"
                    style={{ color: "rgba(248,245,240,0.5)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(248,245,240,0.5)";
                    }}
                  >
                    <FiArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
                      style={{ color: "#D4AF37" }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-8 space-y-2.5">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{
                  color: "rgba(248,245,240,0.35)",
                  letterSpacing: "0.15em",
                }}
              >
                We Promise
              </p>
              {[
                "100% Organic",
                "No Chemicals",
                "Farm Direct",
                "Lab Tested",
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: "rgba(107,142,35,0.1)",
                    border: "1px solid rgba(107,142,35,0.15)",
                  }}
                >
                  <span style={{ color: "#6B8E23" }}>✓</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "rgba(248,245,240,0.6)" }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Col 3: Our Products ── */}
          <motion.div variants={itemVariants}>
            <h4
              className="font-serif font-bold mb-5 text-base"
              style={{ color: "#F8F5F0" }}
            >
              Our Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm transition-colors duration-300"
                    style={{ color: "rgba(248,245,240,0.5)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(248,245,240,0.5)";
                    }}
                  >
                    <FiArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
                      style={{ color: "#D4AF37" }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Amazon logo badge */}
            <div
              className="mt-8 p-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <p
                className="text-xs mb-2"
                style={{ color: "rgba(248,245,240,0.4)" }}
              >
                All products will be available on
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="font-bold text-sm"
                  style={{ color: "#F8F5F0" }}
                >
                  amazon.in
                </span>
              </div>
              <div
                className="mt-3 text-xs inline-flex items-center gap-1 font-semibold"
                style={{ color: "rgba(248,245,240,0.4)", cursor: "not-allowed" }}
              >
                Coming soon
              </div>
            </div>
          </motion.div>

          {/* ── Col 4: Contact ── */}
          <motion.div variants={itemVariants}>
            <h4
              className="font-serif font-bold mb-5 text-base"
              style={{ color: "#F8F5F0" }}
            >
              Get In Touch
            </h4>

            <div className="space-y-4 mb-7">
              <a
                href="mailto:vedyaraorg@gmail.com.com"
                className="flex items-start gap-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 group-hover:bg-opacity-20"
                  style={{ background: "rgba(212,175,55,0.12)" }}
                >
                  <FiMail size={14} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: "rgba(248,245,240,0.35)" }}
                  >
                    Email Us
                  </p>
                  <span
                    className="text-sm transition-colors duration-300 group-hover:text-yellow-300"
                    style={{ color: "rgba(248,245,240,0.6)" }}
                  >
                    vedyaraorg@gmail.com.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+919509628400"
                className="flex items-start gap-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(212,175,55,0.12)" }}
                >
                  <FiPhone size={14} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: "rgba(248,245,240,0.35)" }}
                  >
                    Call Us
                  </p>
                  <span
                    className="text-sm transition-colors duration-300 group-hover:text-yellow-300"
                    style={{ color: "rgba(248,245,240,0.6)" }}
                  >
                    +91 9509628400
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(212,175,55,0.12)" }}
                >
                  <FiMapPin size={14} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: "rgba(248,245,240,0.35)" }}
                  >
                    Sourced From
                  </p>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(248,245,240,0.6)" }}
                  >
                    Uttar Pradesh | Uttarakhand | Bihar
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            {/* <a
              href="https://wa.me/919509628400?text=Hi%20Vedyara%20Organic!%20I%20want%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #25D366, #1da851)",
                color: "white",
                boxShadow: "0 6px 20px rgba(37,211,102,0.3)",
              }}
            >
              <FaWhatsapp size={20} />
              <div>
                <span className="block leading-none">Chat on WhatsApp</span>
                <span className="text-xs block mt-0.5" style={{ opacity: 0.8 }}>
                  Quick response guaranteed
                </span>
              </div>
            </a> */}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom Bar ── */}
      <div className="border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p style={{ color: "rgba(248,245,240,0.35)" }}>
              © {currentYear}{" "}
              <span style={{ color: "rgba(248,245,240,0.5)" }}>
                Vedyara Organic
              </span>
              . All rights reserved. Made with 🌿 for a healthier India.
            </p>

            <div
              className="flex items-center gap-5"
              style={{ color: "rgba(248,245,240,0.35)" }}
            >
              <a
                href="#"
                className="hover:text-brand-gold transition-colors duration-200"
                style={{ color: "rgba(248,245,240,0.35)" }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#D4AF37")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(248,245,240,0.35)")
                }
              >
                Privacy Policy
              </a>
              <span style={{ color: "rgba(248,245,240,0.15)" }}>·</span>
              <a
                href="#"
                className="hover:text-brand-gold transition-colors duration-200"
                style={{ color: "rgba(248,245,240,0.35)" }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#D4AF37")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(248,245,240,0.35)")
                }
              >
                Terms of Use
              </a>
              <span style={{ color: "rgba(248,245,240,0.15)" }}>·</span>
              <a
                href="#"
                className="hover:text-brand-gold transition-colors duration-200"
                style={{ color: "rgba(248,245,240,0.35)" }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#D4AF37")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(248,245,240,0.35)")
                }
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
