import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiEye, FiDownload, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 8;

const ordersData = [
  { id: "#VED-001", customer: "Priya Sharma", email: "priya@example.com", items: 2, amount: "₹848", status: "Delivered", payment: "Paid", date: "May 9, 2026" },
  { id: "#VED-002", customer: "Rahul Verma", email: "rahul@example.com", items: 1, amount: "₹149", status: "Processing", payment: "Paid", date: "May 9, 2026" },
  { id: "#VED-003", customer: "Ananya Patel", email: "ananya@example.com", items: 3, amount: "₹877", status: "Shipped", payment: "Paid", date: "May 8, 2026" },
  { id: "#VED-004", customer: "Deepak Nair", email: "deepak@example.com", items: 1, amount: "₹99", status: "Delivered", payment: "Paid", date: "May 8, 2026" },
  { id: "#VED-005", customer: "Meera Iyer", email: "meera@example.com", items: 2, amount: "₹578", status: "Pending", payment: "Awaiting", date: "May 7, 2026" },
  { id: "#VED-006", customer: "Arun Kumar", email: "arun@example.com", items: 1, amount: "₹699", status: "Delivered", payment: "Paid", date: "May 6, 2026" },
  { id: "#VED-007", customer: "Sita Devi", email: "sita@example.com", items: 4, amount: "₹1,076", status: "Processing", payment: "Paid", date: "May 6, 2026" },
  { id: "#VED-008", customer: "Vikram Singh", email: "vikram@example.com", items: 1, amount: "₹129", status: "Cancelled", payment: "Refunded", date: "May 5, 2026" },
  { id: "#VED-009", customer: "Sunita Rao", email: "sunita@example.com", items: 2, amount: "₹450", status: "Delivered", payment: "Paid", date: "May 5, 2026" },
  { id: "#VED-010", customer: "Karan Malhotra", email: "karan@example.com", items: 1, amount: "₹299", status: "Processing", payment: "Paid", date: "May 4, 2026" },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Delivered": return "in-stock";
    case "Cancelled": return "out-of-stock";
    case "Processing": return "in-stock";
    case "Shipped": return "in-stock";
    default: return "";
  }
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return ordersData.filter(
      (o) =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders Management</h1>
          <p className="admin-page-subtitle">
            Monitor sales performance and process customer fulfillments.
          </p>
        </div>
        <div className="admin-header-actions" style={{ display: 'flex', gap: '12px' }}>
          <button className="admin-btn admin-btn-outline">
            <FiDownload size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Orders summary */}
      <div className="admin-overview-stats" style={{ marginBottom: 32 }}>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(62,47,28,0.08)" }}>
            <FiShoppingCart size={20} style={{ color: "#3e2f1c" }} />
          </div>
          <span className="admin-overview-stat-label">TOTAL ORDERS</span>
          <span className="admin-overview-stat-value">{ordersData.length}</span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(107,142,35,0.12)" }}>
            <FiShoppingCart size={20} style={{ color: "#6B8E23" }} />
          </div>
          <span className="admin-overview-stat-label">COMPLETED</span>
          <span className="admin-overview-stat-value" style={{ color: "#6B8E23" }}>
            {ordersData.filter(o => o.status === "Delivered").length}
          </span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(212,175,55,0.1)" }}>
            <FiShoppingCart size={20} style={{ color: "#b8961f" }} />
          </div>
          <span className="admin-overview-stat-label">IN PROGRESS</span>
          <span className="admin-overview-stat-value" style={{ color: "#b8961f" }}>
            {ordersData.filter(o => o.status === "Processing" || o.status === "Shipped").length}
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
            placeholder="Search by ID or customer..." 
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
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode='popLayout'>
                {paginated.map((order) => (
                  <motion.tr 
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="admin-table-id" style={{ fontWeight: 700 }}>{order.id}</td>
                    <td>
                      <div>
                        <p className="admin-product-cell-name" style={{ margin: 0 }}>{order.customer}</p>
                        <p className="admin-product-cell-sku" style={{ margin: 0 }}>{order.email}</p>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{order.items} items</td>
                    <td className="admin-table-amount" style={{ fontWeight: 700 }}>{order.amount}</td>
                    <td>
                      <span className={`admin-stock-badge ${getStatusClass(order.status)}`}>
                        <span className="admin-stock-dot" />
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="admin-table-date">{order.date}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="admin-action-btn-round" title="View Details">
                        <FiEye size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: '#888' }}>
                    No orders found matching your search.
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
              Showing <strong>{(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</strong> of <strong>{filtered.length}</strong> orders
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
