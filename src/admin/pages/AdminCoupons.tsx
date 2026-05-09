import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";

const coupons = [
  { id: 1, code: "WELCOME20", discount: "20%", type: "Percentage", minOrder: "₹500", usageLimit: 100, used: 34, status: "Active", expires: "Jun 30, 2026" },
  { id: 2, code: "HONEY50", discount: "₹50", type: "Fixed", minOrder: "₹300", usageLimit: 50, used: 50, status: "Expired", expires: "Apr 15, 2026" },
  { id: 3, code: "ORGANIC10", discount: "10%", type: "Percentage", minOrder: "₹200", usageLimit: 200, used: 89, status: "Active", expires: "Jul 31, 2026" },
  { id: 4, code: "FREESHIP", discount: "Free Shipping", type: "Shipping", minOrder: "₹0", usageLimit: 500, used: 212, status: "Active", expires: "Dec 31, 2026" },
];

export default function AdminCoupons() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Coupons</h1>
          <p className="admin-page-subtitle">Create and manage discount coupons.</p>
        </div>
        <button className="admin-btn admin-btn-primary"><FiPlus size={16} /> Create Coupon</button>
      </div>

      <motion.div className="admin-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Code</th><th>Discount</th><th>Type</th><th>Min Order</th><th>Usage</th><th>Status</th><th>Expires</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span className="admin-coupon-code">{c.code}</span><button className="admin-action-btn" title="Copy"><FiCopy size={13} /></button></div></td>
                  <td className="admin-table-amount">{c.discount}</td>
                  <td>{c.type}</td>
                  <td>{c.minOrder}</td>
                  <td>{c.used}/{c.usageLimit}</td>
                  <td><span className="admin-status-badge" style={{ background: c.status === "Active" ? "rgba(107,142,35,0.12)" : "rgba(192,57,43,0.1)", color: c.status === "Active" ? "#6B8E23" : "#c0392b" }}>{c.status}</span></td>
                  <td className="admin-table-date">{c.expires}</td>
                  <td><div className="admin-actions"><button className="admin-action-btn"><FiEdit2 size={14} /></button><button className="admin-action-btn admin-action-delete"><FiTrash2 size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
