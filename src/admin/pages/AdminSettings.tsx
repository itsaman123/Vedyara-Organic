import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminSettings() {
  const [storeName, setStoreName] = useState("Vedyara");
  const [storeEmail, setStoreEmail] = useState("vedyaraorg@gmail.com");
  const [currency, setCurrency] = useState("INR");
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifStock, setNotifStock] = useState(true);
  const [notifReviews, setNotifReviews] = useState(false);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">Configure your store preferences.</p>
        </div>
        <button className="admin-btn admin-btn-primary">Save Changes</button>
      </div>

      <div className="admin-settings-grid">
        <motion.div className="admin-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="admin-card-section-title">Store Information</h2>
          <div className="admin-form-group">
            <label className="admin-label">Store Name</label>
            <input className="admin-input" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Contact Email</label>
            <input className="admin-input" type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Currency</label>
            <select className="admin-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="INR">₹ INR - Indian Rupee</option>
              <option value="USD">$ USD - US Dollar</option>
            </select>
          </div>
        </motion.div>

        <motion.div className="admin-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="admin-card-section-title">Notifications</h2>
          {[
            { label: "New Order Alerts", val: notifOrders, set: setNotifOrders },
            { label: "Low Stock Alerts", val: notifStock, set: setNotifStock },
            { label: "New Review Alerts", val: notifReviews, set: setNotifReviews },
          ].map((n) => (
            <div key={n.label} className="admin-setting-toggle-row">
              <span>{n.label}</span>
              <button className={`admin-toggle ${n.val ? "active" : ""}`} onClick={() => n.set(!n.val)}>
                <span className="admin-toggle-knob" />
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
