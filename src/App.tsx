import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import FloatingLeaves from "./components/FloatingLeaves";
import GlobalBee from "./components/GlobalBee";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";

/* ─────────────────────────────────────────────────────────────
   Page transition wrapper — fades + slides each page in/out
───────────────────────────────────────────────────────────── */
const pageEnter = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const pageTransition = {
  enter: { duration: 0.5, ease: "easeOut" as const },
  exit: { duration: 0.3, ease: "easeIn" as const },
};

/* ─────────────────────────────────────────────────────────────
   Animated routes — must be a child of <Router> to use
   useLocation
───────────────────────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/products"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Products />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Contact />
            </motion.div>
          }
        />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Simple 404 page
───────────────────────────────────────────────────────────── */
function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "#F8F5F0", paddingTop: "80px" }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="text-8xl mb-6"
      >
        🌿
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-serif font-bold mb-3"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#3E2F1C" }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-base mb-8 max-w-sm"
        style={{ color: "rgba(62,47,28,0.6)" }}
      >
        Looks like this page wandered off into the fields. Let's bring you back
        home.
      </motion.p>

      <motion.a
        href="/"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base"
        style={{
          background: "linear-gradient(135deg, #D4AF37, #e8c84a)",
          color: "#3E2F1C",
          boxShadow: "0 10px 30px rgba(212,175,55,0.4)",
          textDecoration: "none",
        }}
      >
        ← Back to Home
      </motion.a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scroll restoration — scrolls to top on every route change
───────────────────────────────────────────────────────────── */
function RouteScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return null;
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2.8 seconds on first load
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* Scroll restoration on page change */}
      <RouteScrollToTop />

      {/* ── Fullscreen loader (first load only) ── */}
      <Loader isLoading={isLoading} />

      {/* ── Floating leaves background layer ── */}
      <FloatingLeaves />
      <GlobalBee />

      {/* ── Main layout ── */}
      <div
        className="relative flex flex-col min-h-screen"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Sticky top navbar */}
        <Navbar />

        {/* Page content with transitions */}
        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* ── (removed) Scroll to top button replaced by page restore only ── */}
    </Router>
  );
}
