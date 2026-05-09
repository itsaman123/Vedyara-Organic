import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiAlertTriangle, FiCheckCircle, FiPackage, FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useMemo } from "react";
import { products } from "../../data/products";

const ITEMS_PER_PAGE = 8;

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
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return inventoryData.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inventory Tracking</h1>
          <p className="admin-page-subtitle">
            Manage your stock levels and monitor product availability.
          </p>
        </div>
        <div className="admin-header-actions" style={{ display: 'flex', gap: '12px' }}>
          <button className="admin-btn admin-btn-outline">
            <FiDownload size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="admin-overview-stats" style={{ marginBottom: 32 }}>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(62,47,28,0.08)" }}>
            <FiPackage size={20} style={{ color: "#3e2f1c" }} />
          </div>
          <span className="admin-overview-stat-label">TOTAL SKU'S</span>
          <span className="admin-overview-stat-value">{inventoryData.length}</span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(107,142,35,0.12)" }}>
            <FiCheckCircle size={20} style={{ color: "#6B8E23" }} />
          </div>
          <span className="admin-overview-stat-label">HEALTHY STOCK</span>
          <span className="admin-overview-stat-value" style={{ color: "#6B8E23" }}>
            {inventoryData.filter(p => p.status === "In Stock").length}
          </span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(192,57,43,0.1)" }}>
            <FiAlertTriangle size={20} style={{ color: "#c0392b" }} />
          </div>
          <span className="admin-overview-stat-label">LOW/OUT STOCK</span>
          <span className="admin-overview-stat-value" style={{ color: "#c0392b" }}>
            {inventoryData.filter(p => p.status !== "In Stock").length}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-table-toolbar" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        background: '#fff',
        padding: '16px 24px',
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div className="admin-search-wrap" style={{ position: 'relative', width: '320px' }}>
          <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input 
            type="text" 
            placeholder="Search by name or SKU..." 
            className="admin-input" 
            style={{ paddingLeft: '42px', background: '#f9f9f9', height: '44px' }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="admin-toolbar-right">
          <button className="admin-btn admin-btn-outline" style={{ height: '44px' }}>
            <FiFilter size={14} /> Advanced Filter
          </button>
        </div>
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
              <AnimatePresence mode='popLayout'>
                {paginated.map((item) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
                    <td className="admin-table-amount" style={{ fontWeight: 700 }}>{item.stock} units</td>
                    <td>{item.reorderLevel} units</td>
                    <td>
                      <span className={`admin-stock-badge ${
                        item.status === "In Stock" ? "in-stock" : "out-of-stock"
                      }`}>
                        <span className="admin-stock-dot" />
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="admin-table-date">{item.lastUpdated}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: '#888' }}>
                    No stock data found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <span className="admin-pagination-info">
              Showing <strong>{(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</strong> of <strong>{filtered.length}</strong> items
            </span>
            <div className="admin-pagination-controls">
              <button className="admin-page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                <FiChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`admin-page-btn ${page === i + 1 ? "active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button className="admin-page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
