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
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

/* ── Admin imports ── */
import "./admin/admin.css";
import "./admin/admin-components.css";
import "./admin/admin-pages.css";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminAddProduct from "./admin/pages/AdminAddProduct";
import AdminInventory from "./admin/pages/AdminInventory";
import AdminOrders from "./admin/pages/AdminOrders";

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
        <Route
          path="/product/:id"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <ProductDetail />
            </motion.div>
          }
        />
        <Route
          path="/cart"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Cart />
            </motion.div>
          }
        />
        <Route
          path="/wishlist"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Wishlist />
            </motion.div>
          }
        />
        <Route
          path="/checkout"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Checkout />
            </motion.div>
          }
        />
        <Route
          path="/orders"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Profile />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div
              initial={pageEnter.initial}
              animate={{
                ...pageEnter.animate,
                transition: pageTransition.enter,
              }}
              exit={{ ...pageEnter.exit, transition: pageTransition.exit }}
            >
              <Profile />
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
   LAYOUT WRAPPER — hides public chrome on /admin routes
═══════════════════════════════════════════════════════════ */
function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    );
  }

  return (
    <>
      <FloatingLeaves />
      <div
        className="relative flex flex-col min-h-screen"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <RouteScrollToTop />
      <Loader isLoading={isLoading} />
      <AppShell />
    </Router>
  );
}
