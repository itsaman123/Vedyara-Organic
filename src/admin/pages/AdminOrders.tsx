import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiEye, FiDownload, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";

const orders = [
  { id: "#VED-001", customer: "Priya Sharma", email: "priya@example.com", items: 2, amount: "₹848", status: "Delivered", payment: "Paid", date: "May 9, 2026" },
  { id: "#VED-002", customer: "Rahul Verma", email: "rahul@example.com", items: 1, amount: "₹149", status: "Processing", payment: "Paid", date: "May 9, 2026" },
  { id: "#VED-003", customer: "Ananya Patel", email: "ananya@example.com", items: 3, amount: "₹877", status: "Shipped", payment: "Paid", date: "May 8, 2026" },
  { id: "#VED-004", customer: "Deepak Nair", email: "deepak@example.com", items: 1, amount: "₹99", status: "Delivered", payment: "Paid", date: "May 8, 2026" },
  { id: "#VED-005", customer: "Meera Iyer", email: "meera@example.com", items: 2, amount: "₹578", status: "Pending", payment: "Awaiting", date: "May 7, 2026" },
  { id: "#VED-006", customer: "Arun Kumar", email: "arun@example.com", items: 1, amount: "₹699", status: "Delivered", payment: "Paid", date: "May 6, 2026" },
  { id: "#VED-007", customer: "Sita Devi", email: "sita@example.com", items: 4, amount: "₹1,076", status: "Processing", payment: "Paid", date: "May 6, 2026" },
  { id: "#VED-008", customer: "Vikram Singh", email: "vikram@example.com", items: 1, amount: "₹129", status: "Cancelled", payment: "Refunded", date: "May 5, 2026" },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Delivered": return "in-stock";
    case "Cancelled": return "out-of-stock";
    case "Processing": return "in-stock"; // Or a yellow one if defined
    default: return "";
  }
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders Management</h1>
          <p className="admin-page-subtitle">
            Monitor sales performance and process customer fulfillments.
          </p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-btn admin-btn-outline">
            <FiDownload size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Orders summary */}
      <div className="admin-overview-stats" style={{ marginBottom: 32 }}>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(0,0,0,0.05)" }}>
            <FiShoppingCart size={20} />
          </div>
          <span className="admin-overview-stat-label">TOTAL ORDERS</span>
          <span className="admin-overview-stat-value">254</span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(30,126,52,0.1)" }}>
            <FiShoppingCart size={20} style={{ color: "#1e7e34" }} />
          </div>
          <span className="admin-overview-stat-label">COMPLETED</span>
          <span className="admin-overview-stat-value" style={{ color: "#1e7e34" }}>198</span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(212,175,55,0.1)" }}>
            <FiShoppingCart size={20} style={{ color: "#b8961f" }} />
          </div>
          <span className="admin-overview-stat-label">IN PROGRESS</span>
          <span className="admin-overview-stat-value" style={{ color: "#b8961f" }}>42</span>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="admin-btn admin-btn-outline">
          <FiFilter size={14} /> Filter
        </button>
      </div>

      <motion.div
        className="admin-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td className="admin-table-id">{order.id}</td>
                  <td>
                    <div>
                      <p className="admin-product-cell-name" style={{ margin: 0 }}>{order.customer}</p>
                      <p className="admin-product-cell-sku" style={{ margin: 0 }}>{order.email}</p>
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{order.items} items</td>
                  <td className="admin-table-amount">{order.amount}</td>
                  <td>
                    <span className={`admin-stock-badge ${getStatusClass(order.status)}`}>
                      <span className="admin-stock-dot" />
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="admin-table-date">{order.date}</td>
                  <td>
                    <button className="admin-action-btn-round" title="View Details">
                      <FiEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
