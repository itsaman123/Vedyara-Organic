import { motion } from "framer-motion";
import { FiTrendingUp, FiShoppingCart, FiUsers, FiDollarSign } from "react-icons/fi";

const monthlyData = [
  { month: "Jan", revenue: 12400, orders: 34 },
  { month: "Feb", revenue: 18600, orders: 52 },
  { month: "Mar", revenue: 15200, orders: 41 },
  { month: "Apr", revenue: 22800, orders: 68 },
  { month: "May", revenue: 28500, orders: 82 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

export default function AdminAnalytics() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Analytics</h1>
          <p className="admin-page-subtitle">Insights into your store performance.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        {[
          { label: "Total Revenue", value: "₹97,500", icon: FiDollarSign, change: "+24%", color: "#6B8E23", bg: "rgba(107,142,35,0.1)" },
          { label: "Total Orders", value: "277", icon: FiShoppingCart, change: "+18%", color: "#D4AF37", bg: "rgba(212,175,55,0.1)" },
          { label: "Avg Order Value", value: "₹352", icon: FiTrendingUp, change: "+5%", color: "#3E2F1C", bg: "rgba(62,47,28,0.08)" },
          { label: "Repeat Customers", value: "68%", icon: FiUsers, change: "+12%", color: "#2980b9", bg: "rgba(41,128,185,0.1)" },
        ].map((s, i) => (
          <motion.div key={s.label} className="admin-stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="admin-stat-header">
              <div className="admin-stat-icon" style={{ background: s.bg, color: s.color }}><s.icon size={20} /></div>
            </div>
            <p className="admin-stat-value">{s.value}</p>
            <div className="admin-stat-footer">
              <span className="admin-stat-label">{s.label}</span>
              <span className="admin-stat-change up"><FiTrendingUp size={13} /> {s.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="admin-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="admin-card-title" style={{ marginBottom: 24 }}>Monthly Revenue</h2>
        <div className="admin-chart-bars">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="admin-chart-col">
              <motion.div
                className="admin-chart-bar"
                initial={{ height: 0 }}
                animate={{ height: `${(d.revenue / maxRevenue) * 180}px` }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: "easeOut" }}
              />
              <span className="admin-chart-label">{d.month}</span>
              <span className="admin-chart-value">₹{(d.revenue / 1000).toFixed(1)}K</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
