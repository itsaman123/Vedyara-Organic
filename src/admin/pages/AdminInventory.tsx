import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiAlertTriangle, FiCheckCircle, FiPackage, FiDownload } from "react-icons/fi";
import { useState } from "react";
import { products } from "../../data/products";

const inventoryData = products.map((p, i) => {
  const stock = [120, 45, 200, 85, 0, 12, 5, 88][i % 8];
  return {
    id: p.id,
    name: p.name,
    image: p.image,
    sku: `VDY-${String(p.id).padStart(3, "0")}`,
    category: p.category,
    stock: stock,
    reorderLevel: 20,
    status: stock > 20 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock",
    lastUpdated: "May 9, 2026",
  };
});

export default function AdminInventory() {
  const [search, setSearch] = useState("");
  const filtered = inventoryData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inventory Tracking</h1>
          <p className="admin-page-subtitle">
            Manage your stock levels and monitor product availability.
          </p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-btn admin-btn-outline">
            <FiDownload size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="admin-overview-stats" style={{ marginBottom: 32 }}>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(0,0,0,0.05)" }}>
            <FiPackage size={20} />
          </div>
          <span className="admin-overview-stat-label">TOTAL SKU'S</span>
          <span className="admin-overview-stat-value">{inventoryData.length}</span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(30,126,52,0.1)" }}>
            <FiCheckCircle size={20} style={{ color: "#1e7e34" }} />
          </div>
          <span className="admin-overview-stat-label">HEALTHY STOCK</span>
          <span className="admin-overview-stat-value" style={{ color: "#1e7e34" }}>
            {inventoryData.filter(p => p.status === "In Stock").length}
          </span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(217,48,37,0.1)" }}>
            <FiAlertTriangle size={20} style={{ color: "#d93025" }} />
          </div>
          <span className="admin-overview-stat-label">LOW/OUT STOCK</span>
          <span className="admin-overview-stat-value" style={{ color: "#d93025" }}>
            {inventoryData.filter(p => p.status !== "In Stock").length}
          </span>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search by name or SKU..."
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
                <th>Product</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Reorder Point</th>
                <th>Status</th>
                <th>Last Synced</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="admin-product-cell">
                      <div className="admin-product-thumb-lg">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div>
                        <p className="admin-product-cell-name">{item.name}</p>
                        <p className="admin-product-cell-sku">SKU: {item.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="admin-table-cat">{item.category}</td>
                  <td className="admin-table-amount">{item.stock}</td>
                  <td>{item.reorderLevel}</td>
                  <td>
                    <span className={`admin-stock-badge ${
                      item.status === "In Stock" ? "in-stock" : "out-of-stock"
                    }`}>
                      <span className="admin-stock-dot" />
                      {item.status.toUpperCase()}
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
