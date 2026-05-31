import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiEye, FiDownload, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { useAdminOrders, useAdminOrderSummary, type AdminOrder } from "./apiCalls";

const ITEMS_PER_PAGE = 8;

const getStatusClass = (status: AdminOrder["status"]) => {
  switch (status) {
    case "delivered": return "in-stock";
    case "cancelled": return "out-of-stock";
    case "processing": return "in-stock";
    case "shipped": return "in-stock";
    default: return "";
  }
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const formatStatus = (value: string) => value.replace(/_/g, " ").toUpperCase();

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ordersQuery = useAdminOrders({ page, limit: ITEMS_PER_PAGE, search });
  const summaryQuery = useAdminOrderSummary();
  const orders = ordersQuery.data?.items ?? [];
  const pagination = ordersQuery.data?.pagination;
  const totalPages = pagination?.pages ?? 1;
  const totalOrders = pagination?.total ?? 0;
  const summary = summaryQuery.data;

  const handleExport = () => {
    const data = JSON.stringify(orders, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vedyara-orders.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders Management</h1>
          <p className="admin-page-subtitle">
            Monitor sales performance and process customer fulfillments.
          </p>
        </div>
        <div className="admin-header-actions" style={{ display: "flex", gap: "12px" }}>
          <button className="admin-btn admin-btn-outline" onClick={handleExport}>
            <FiDownload size={14} /> Export JSON
          </button>
        </div>
      </div>

      <div className="admin-overview-stats" style={{ marginBottom: 32 }}>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(62,47,28,0.08)" }}>
            <FiShoppingCart size={20} style={{ color: "#3e2f1c" }} />
          </div>
          <span className="admin-overview-stat-label">TOTAL ORDERS</span>
          <span className="admin-overview-stat-value">{summaryQuery.isLoading ? "..." : summary?.totalOrders ?? 0}</span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(107,142,35,0.12)" }}>
            <FiShoppingCart size={20} style={{ color: "#6B8E23" }} />
          </div>
          <span className="admin-overview-stat-label">COMPLETED</span>
          <span className="admin-overview-stat-value" style={{ color: "#6B8E23" }}>
            {summaryQuery.isLoading ? "..." : summary?.completedOrders ?? 0}
          </span>
        </div>
        <div className="admin-overview-stat">
          <div className="admin-overview-stat-icon" style={{ background: "rgba(212,175,55,0.1)" }}>
            <FiShoppingCart size={20} style={{ color: "#b8961f" }} />
          </div>
          <span className="admin-overview-stat-label">IN PROGRESS</span>
          <span className="admin-overview-stat-value" style={{ color: "#b8961f" }}>
            {summaryQuery.isLoading ? "..." : summary?.inProgressOrders ?? 0}
          </span>
        </div>
      </div>

      <div
        className="admin-table-toolbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          background: "#fff",
          padding: "16px 24px",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="admin-search-wrap" style={{ position: "relative", width: "320px" }}>
          <FiSearch style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#999" }} />
          <input
            type="text"
            placeholder="Search by ID or customer..."
            className="admin-input"
            style={{ paddingLeft: "42px", background: "#f9f9f9", height: "44px" }}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="admin-toolbar-right">
          <button className="admin-btn admin-btn-outline" style={{ height: "44px" }} type="button">
            <FiFilter size={14} /> All Orders
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
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {orders.map((order) => (
                  <motion.tr
                    key={order._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="admin-table-id" style={{ fontWeight: 700 }}>{order.orderNumber}</td>
                    <td>
                      <div>
                        <p className="admin-product-cell-name" style={{ margin: 0 }}>{order.customerName}</p>
                        <p className="admin-product-cell-sku" style={{ margin: 0 }}>{order.customerEmail}</p>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{order.itemsCount} items</td>
                    <td className="admin-table-amount" style={{ fontWeight: 700 }}>₹{order.amount}</td>
                    <td>
                      <span className={`admin-stock-badge ${getStatusClass(order.status)}`}>
                        <span className="admin-stock-dot" />
                        {formatStatus(order.status)}
                      </span>
                    </td>
                    <td className="admin-table-date">{formatDate(order.createdAt)}</td>
                    <td style={{ textAlign: "right" }}>
                      <button className="admin-action-btn-round" title="View Details" type="button">
                        <FiEye size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "48px", color: "#888" }}>
                    {ordersQuery.isLoading ? "Loading orders..." : "No orders found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="admin-pagination">
            <span className="admin-pagination-info">
              Showing <strong>{(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, totalOrders)}</strong> of <strong>{totalOrders}</strong> orders
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
