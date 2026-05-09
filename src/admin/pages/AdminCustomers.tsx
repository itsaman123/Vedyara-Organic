import { motion } from "framer-motion";
import { FiSearch, FiMail, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";

const customers = [
  { id: 1, name: "Priya Sharma", email: "priya@example.com", orders: 8, spent: "₹5,592", joined: "Jan 2026", avatar: "PS" },
  { id: 2, name: "Rahul Verma", email: "rahul@example.com", orders: 5, spent: "₹2,345", joined: "Feb 2026", avatar: "RV" },
  { id: 3, name: "Ananya Patel", email: "ananya@example.com", orders: 12, spent: "₹8,910", joined: "Dec 2025", avatar: "AP" },
  { id: 4, name: "Deepak Nair", email: "deepak@example.com", orders: 3, spent: "₹897", joined: "Mar 2026", avatar: "DN" },
  { id: 5, name: "Meera Iyer", email: "meera@example.com", orders: 6, spent: "₹3,214", joined: "Feb 2026", avatar: "MI" },
  { id: 6, name: "Arun Kumar", email: "arun@example.com", orders: 2, spent: "₹1,398", joined: "Apr 2026", avatar: "AK" },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Customers</h1>
          <p className="admin-page-subtitle">View and manage your customer base.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <FiSearch size={16} />
          <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="admin-customers-grid">
        {filtered.map((c, i) => (
          <motion.div key={c.id} className="admin-card admin-customer-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div className="admin-customer-top">
              <div className="admin-customer-avatar">{c.avatar}</div>
              <div>
                <h3 className="admin-customer-name">{c.name}</h3>
                <p className="admin-customer-email">{c.email}</p>
              </div>
            </div>
            <div className="admin-customer-stats">
              <div className="admin-customer-stat"><FiShoppingCart size={14} /><span>{c.orders} orders</span></div>
              <div className="admin-customer-stat"><span className="admin-customer-spent">{c.spent}</span></div>
            </div>
            <div className="admin-customer-bottom">
              <span className="admin-customer-since">Joined {c.joined}</span>
              <button className="admin-action-btn" title="Email"><FiMail size={15} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
