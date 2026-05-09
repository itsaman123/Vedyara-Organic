import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiEye } from "react-icons/fi";
import { useState } from "react";

const orders = [
  { id: "#VED-001", customer: "Priya Sharma", email: "priya@example.com", items: 2, amount: "₹848", status: "Delivered", payment: "Paid", date: "May 8, 2026" },
  { id: "#VED-002", customer: "Rahul Verma", email: "rahul@example.com", items: 1, amount: "₹149", status: "Processing", payment: "Paid", date: "May 8, 2026" },
  { id: "#VED-003", customer: "Ananya Patel", email: "ananya@example.com", items: 3, amount: "₹877", status: "Shipped", payment: "Paid", date: "May 7, 2026" },
  { id: "#VED-004", customer: "Deepak Nair", email: "deepak@example.com", items: 1, amount: "₹99", status: "Delivered", payment: "Paid", date: "May 7, 2026" },
  { id: "#VED-005", customer: "Meera Iyer", email: "meera@example.com", items: 2, amount: "₹578", status: "Pending", payment: "Awaiting", date: "May 6, 2026" },
  { id: "#VED-006", customer: "Arun Kumar", email: "arun@example.com", items: 1, amount: "₹699", status: "Delivered", payment: "Paid", date: "May 5, 2026" },
  { id: "#VED-007", customer: "Sita Devi", email: "sita@example.com", items: 4, amount: "₹1,076", status: "Processing", payment: "Paid", date: "May 5, 2026" },
  { id: "#VED-008", customer: "Vikram Singh", email: "vikram@example.com", items: 1, amount: "₹129", status: "Cancelled", payment: "Refunded", date: "May 4, 2026" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  Delivered: { bg: "rgba(107,142,35,0.12)", text: "#6B8E23" },
  Processing: { bg: "rgba(212,175,55,0.12)", text: "#b8961f" },
  Shipped: { bg: "rgba(52,152,219,0.12)", text: "#2980b9" },
  Pending: { bg: "rgba(243,156,18,0.12)", text: "#d4a017" },
  Cancelled: { bg: "rgba(192,57,43,0.10)", text: "#c0392b" },
};

const paymentColors: Record<string, { bg: string; text: string }> = {
  Paid: { bg: "rgba(107,142,35,0.12)", text: "#6B8E23" },
  Awaiting: { bg: "rgba(243,156,18,0.12)", text: "#d4a017" },
  Refunded: { bg: "rgba(192,57,43,0.10)", text: "#c0392b" },
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
          <h1 className="admin-page-title">Orders</h1>
          <p className="admin-page-subtitle">
            Track and manage customer orders.
          </p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search orders or customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="admin-btn admin-btn-outline">
          <FiFilter size={14} />
          Filter
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
                <th>Payment</th>
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
                      <p style={{ fontWeight: 600, color: "#3E2F1C" }}>{order.customer}</p>
                      <p style={{ fontSize: "0.75rem", color: "rgba(62,47,28,0.5)" }}>{order.email}</p>
                    </div>
                  </td>
                  <td>{order.items}</td>
                  <td className="admin-table-amount">{order.amount}</td>
                  <td>
                    <span
                      className="admin-status-badge"
                      style={{
                        background: statusColors[order.status]?.bg,
                        color: statusColors[order.status]?.text,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className="admin-status-badge"
                      style={{
                        background: paymentColors[order.payment]?.bg,
                        color: paymentColors[order.payment]?.text,
                      }}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="admin-table-date">{order.date}</td>
                  <td>
                    <button className="admin-action-btn" title="View">
                      <FiEye size={15} />
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
