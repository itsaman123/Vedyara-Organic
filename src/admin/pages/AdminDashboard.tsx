import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiUsers,
  FiBox,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowRight,
  FiMoreVertical,
} from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════
   STATS DATA
═══════════════════════════════════════════════════════════ */
const stats = [
  {
    label: "Total Revenue",
    value: "₹1,24,500",
    change: "+12.5%",
    trend: "up",
    icon: FiDollarSign,
    color: "#6B8E23",
    bg: "rgba(107,142,35,0.1)",
  },
  {
    label: "Total Orders",
    value: "356",
    change: "+8.2%",
    trend: "up",
    icon: FiShoppingCart,
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.1)",
  },
  {
    label: "Total Customers",
    value: "1,204",
    change: "+5.1%",
    trend: "up",
    icon: FiUsers,
    color: "#3E2F1C",
    bg: "rgba(62,47,28,0.08)",
  },
  {
    label: "Products Listed",
    value: "24",
    change: "-2",
    trend: "down",
    icon: FiBox,
    color: "#c0392b",
    bg: "rgba(192,57,43,0.08)",
  },
];

const recentOrders = [
  {
    id: "#VED-001",
    customer: "Priya Sharma",
    product: "Pure Natural Honey (1Kg)",
    amount: "₹699",
    status: "Delivered",
    date: "May 8, 2026",
  },
  {
    id: "#VED-002",
    customer: "Rahul Verma",
    product: "Natural Jaggery Powder",
    amount: "₹149",
    status: "Processing",
    date: "May 8, 2026",
  },
  {
    id: "#VED-003",
    customer: "Ananya Patel",
    product: "Turmeric Powder (Haldi)",
    amount: "₹129",
    status: "Shipped",
    date: "May 7, 2026",
  },
  {
    id: "#VED-004",
    customer: "Deepak Nair",
    product: "Coriander Powder",
    amount: "₹99",
    status: "Delivered",
    date: "May 7, 2026",
  },
  {
    id: "#VED-005",
    customer: "Meera Iyer",
    product: "Pure Natural Honey (500g)",
    amount: "₹449",
    status: "Pending",
    date: "May 6, 2026",
  },
];

const topProducts = [
  { name: "Pure Natural Honey", sales: 142, revenue: "₹68,958", pct: 85 },
  { name: "Natural Jaggery Powder", sales: 98, revenue: "₹14,602", pct: 62 },
  { name: "Turmeric Powder", sales: 76, revenue: "₹9,804", pct: 48 },
  { name: "Coriander Powder", sales: 64, revenue: "₹6,336", pct: 40 },
];

const statusColor: Record<string, { bg: string; text: string }> = {
  Delivered: { bg: "rgba(107,142,35,0.12)", text: "#6B8E23" },
  Processing: { bg: "rgba(212,175,55,0.12)", text: "#b8961f" },
  Shipped: { bg: "rgba(52,152,219,0.12)", text: "#2980b9" },
  Pending: { bg: "rgba(192,57,43,0.10)", text: "#c0392b" },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/* ═══════════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  return (
    <div className="admin-page">
      {/* Page header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">
            Welcome back! Here's an overview of your store.
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="admin-stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="admin-stat-card"
            {...fadeUp}
            transition={{ delay: i * 0.08 }}
          >
            <div className="admin-stat-header">
              <div
                className="admin-stat-icon"
                style={{ background: stat.bg, color: stat.color }}
              >
                <stat.icon size={20} />
              </div>
              <button className="admin-stat-more">
                <FiMoreVertical size={16} />
              </button>
            </div>
            <p className="admin-stat-value">{stat.value}</p>
            <div className="admin-stat-footer">
              <span className="admin-stat-label">{stat.label}</span>
              <span
                className={`admin-stat-change ${stat.trend === "up" ? "up" : "down"}`}
              >
                {stat.trend === "up" ? (
                  <FiTrendingUp size={13} />
                ) : (
                  <FiTrendingDown size={13} />
                )}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main grid: Orders table + Top Products */}
      <div className="admin-dashboard-grid">
        {/* Recent Orders */}
        <motion.div className="admin-card admin-orders-card" {...fadeUp} transition={{ delay: 0.3 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Orders</h2>
            <button className="admin-card-action">
              View All <FiArrowRight size={14} />
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="admin-table-id">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td className="admin-table-amount">{order.amount}</td>
                    <td>
                      <span
                        className="admin-status-badge"
                        style={{
                          background: statusColor[order.status]?.bg,
                          color: statusColor[order.status]?.text,
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="admin-table-date">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div className="admin-card" {...fadeUp} transition={{ delay: 0.4 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">Top Products</h2>
            <button className="admin-card-action">
              Details <FiArrowRight size={14} />
            </button>
          </div>
          <div className="admin-top-products">
            {topProducts.map((product, i) => (
              <div key={i} className="admin-top-product-row">
                <div className="admin-top-product-info">
                  <span className="admin-top-product-rank">#{i + 1}</span>
                  <div>
                    <p className="admin-top-product-name">{product.name}</p>
                    <p className="admin-top-product-meta">
                      {product.sales} sales · {product.revenue}
                    </p>
                  </div>
                </div>
                <div className="admin-progress-bar-wrap">
                  <div
                    className="admin-progress-bar"
                    style={{ width: `${product.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
