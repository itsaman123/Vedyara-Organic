import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiAlertTriangle, FiCheckCircle, FiPackage } from "react-icons/fi";
import { useState } from "react";
import { products } from "../../data/products";

const inventoryData = products.map((p, i) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  sku: `VED-${String(p.id).padStart(4, "0")}`,
  category: p.category,
  stock: [120, 45, 200, 85, 12][i % 5],
  reorderLevel: 50,
  status: [120, 45, 200, 85, 12][i % 5] < 50 ? "Low Stock" : "In Stock",
  lastUpdated: "May 8, 2026",
}));

export default function AdminInventory() {
  const [search, setSearch] = useState("");
  const filtered = inventoryData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inventory</h1>
          <p className="admin-page-subtitle">
            Track stock levels and manage inventory across all products.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="admin-inv-stats">
        <div className="admin-inv-stat">
          <FiPackage size={20} style={{ color: "#6B8E23" }} />
          <div>
            <span className="admin-inv-stat-value">{inventoryData.length}</span>
            <span className="admin-inv-stat-label">Total Products</span>
          </div>
        </div>
        <div className="admin-inv-stat">
          <FiCheckCircle size={20} style={{ color: "#D4AF37" }} />
          <div>
            <span className="admin-inv-stat-value">
              {inventoryData.filter((p) => p.status === "In Stock").length}
            </span>
            <span className="admin-inv-stat-label">In Stock</span>
          </div>
        </div>
        <div className="admin-inv-stat">
          <FiAlertTriangle size={20} style={{ color: "#c0392b" }} />
          <div>
            <span className="admin-inv-stat-value">
              {inventoryData.filter((p) => p.status === "Low Stock").length}
            </span>
            <span className="admin-inv-stat-label">Low Stock</span>
          </div>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search inventory..."
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
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="admin-product-cell">
                      <div className="admin-product-thumb">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="admin-table-id">{item.sku}</td>
                  <td><span className="admin-cat-badge">{item.category}</span></td>
                  <td className="admin-table-amount">{item.stock}</td>
                  <td>{item.reorderLevel}</td>
                  <td>
                    <span
                      className="admin-status-badge"
                      style={{
                        background:
                          item.status === "In Stock"
                            ? "rgba(107,142,35,0.12)"
                            : "rgba(192,57,43,0.10)",
                        color:
                          item.status === "In Stock" ? "#6B8E23" : "#c0392b",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="admin-table-date">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
