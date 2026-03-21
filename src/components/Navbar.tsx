import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import LogoBrand from "./LogoBrand";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={
          isScrolled
            ? {
              background: "rgba(248,245,240,0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 4px 30px rgba(62,47,28,0.1), 0 1px 0 rgba(212,175,55,0.15)",
            }
            : {
              background:
                "linear-gradient(to bottom, rgba(20,12,4,0.55) 0%, transparent 100%)",
            }
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between"
            style={{
              height: isScrolled ? "66px" : "78px",
              transition: "height 0.4s ease",
            }}
          >
            {/* ── LOGO ── */}
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex-shrink-0 flex items-center"
              style={{ lineHeight: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <LogoBrand
                  variant={isScrolled ? "dark" : "light"}
                  height={80}
                />
              </motion.div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `nav-link text-sm font-medium transition-colors duration-300 ${isActive ? "active" : ""
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isScrolled
                      ? isActive
                        ? "#3E2F1C"
                        : "#5a4532"
                      : isActive
                        ? "#D4AF37"
                        : "rgba(248,245,240,0.88)",
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── DESKTOP CTA ── */}
            <div className="hidden md:flex items-center gap-3">
              {/* Amazon badge — slides in when scrolled */}
              <motion.div
                animate={{
                  opacity: isScrolled ? 1 : 0,
                  x: isScrolled ? 0 : 10,
                  pointerEvents: isScrolled ? "auto" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(212,175,55,0.12)",
                  color: "#b8961f",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                <span>🛒</span>
                <span>Available on Amazon</span>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="btn-gold flex items-center gap-2 text-sm"
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <FiShoppingBag size={15} strokeWidth={2.2} />
                <span>Shop Now</span>
              </motion.button>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300 focus:outline-none"
              style={{
                background: isScrolled
                  ? "rgba(62,47,28,0.07)"
                  : "rgba(255,255,255,0.12)",
                color: isScrolled ? "#3E2F1C" : "#F8F5F0",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Gold underline accent on scroll */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)",
                transformOrigin: "center",
              }}
            />
          )}
        </AnimatePresence>
      </motion.header>

      {/* ════════════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{
                background: "rgba(20,12,4,0.52)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-40 flex flex-col md:hidden"
              style={{
                width: "min(85vw, 320px)",
                background: "#F8F5F0",
                boxShadow: "-8px 0 40px rgba(62,47,28,0.2)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5 border-b"
                style={{ borderColor: "rgba(62,47,28,0.1)" }}
              >
                <Link
                  to="/"
                  onClick={() => setIsMobileOpen(false)}
                  style={{ lineHeight: 0 }}
                >
                  <LogoBrand variant="dark" height={40} />
                </Link>

                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-brand-brown transition-colors hover:bg-brand-cream-dark focus:outline-none"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.32 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-base transition-all duration-200 ${isActive
                          ? "bg-brand-gold text-brand-brown shadow-gold-sm"
                          : "text-brand-brown hover:bg-brand-cream-dark"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                            style={{
                              background: isActive
                                ? "#3E2F1C"
                                : "rgba(212,175,55,0.5)",
                            }}
                          />
                          {link.label}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-4 pb-8 flex flex-col gap-3"
              >
                <div
                  className="divider-gold mb-1"
                  style={{ width: "100%", height: "1px" }}
                />
                <a
                  href="https://www.amazon.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-gold w-full text-center text-sm font-semibold py-4"
                >
                  🛒 &nbsp; Buy on Amazon
                </a>
                <p
                  className="text-center text-xs"
                  style={{ color: "rgba(62,47,28,0.42)" }}
                >
                  Fast delivery · Secure checkout · Easy returns
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
