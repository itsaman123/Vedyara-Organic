import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiBox,
  FiPlusCircle,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiLayers,
  FiTag,
  FiBarChart2,
  FiStar,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════
   SIDEBAR NAV ITEMS
═══════════════════════════════════════════════════════════ */
const navItems = [
  { to: "/admin", icon: FiGrid, label: "Dashboard", end: true },
  { to: "/admin/products", icon: FiBox, label: "Products" },
  { to: "/admin/add-product", icon: FiPlusCircle, label: "Add Product" },
  { to: "/admin/inventory", icon: FiPackage, label: "Inventory" },
  { to: "/admin/orders", icon: FiShoppingCart, label: "Orders" },
  { to: "/admin/customers", icon: FiUsers, label: "Customers" },
  { to: "/admin/categories", icon: FiLayers, label: "Categories" },
  { to: "/admin/coupons", icon: FiTag, label: "Coupons" },
  { to: "/admin/analytics", icon: FiBarChart2, label: "Analytics" },
  { to: "/admin/reviews", icon: FiStar, label: "Reviews" },
  { to: "/admin/settings", icon: FiSettings, label: "Settings" },
];

/* ═══════════════════════════════════════════════════════════
   ADMIN LAYOUT
═══════════════════════════════════════════════════════════ */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="admin-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-inner">
          {/* Brand */}
          <div className="admin-sidebar-brand">
            <h1 className="admin-brand-title">Vedyara Admin</h1>
            <p className="admin-brand-sub">Premium Organic Wellness</p>
            <button
              className="admin-sidebar-close"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="admin-sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="admin-sidebar-footer">
            <button
              className="admin-nav-link admin-logout-btn"
              onClick={() => navigate("/")}
            >
              <FiLogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-hamburger"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={22} />
            </button>
            <div className="admin-search-bar">
              <FiSearch size={16} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search orders, products, customers..."
                className="admin-search-input"
              />
            </div>
          </div>

          <div className="admin-header-right">
            <button className="admin-header-icon-btn">
              <FiBell size={18} />
              <span className="admin-notif-dot" />
            </button>
            <button className="admin-header-icon-btn">
              <FiHelpCircle size={18} />
            </button>
            <div className="admin-header-divider" />
            <div className="admin-header-profile">
              <div className="admin-header-profile-info">
                <span className="admin-profile-name">Admin User</span>
                <span className="admin-profile-role">ADMINISTRATOR</span>
              </div>
              <div className="admin-avatar">
                <span>AU</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
