import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { products } from "../../data/products";

const ITEMS_PER_PAGE = 4;

export default function AdminProducts() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginated = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="admin-page">
      {/* Breadcrumb */}
      <div className="admin-breadcrumb">
        <span>Catalog</span>
        <span className="admin-breadcrumb-sep">›</span>
        <span className="admin-breadcrumb-active">All Products</span>
      </div>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Product Management</h1>
        </div>
        <div className="admin-header-actions">
          <button className="admin-btn admin-btn-outline">
            <FiDownload size={14} /> Export CSV
          </button>
          <button className="admin-btn admin-btn-primary" onClick={() => navigate("/admin/add-product")}>
            <FiPlus size={16} /> Add New Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <motion.div className="admin-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="admin-table-wrap">
          <table className="admin-table admin-product-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input type="checkbox" className="admin-checkbox" />
                </th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((product) => {
                const stockNum = product.rating > 0 ? Math.floor(product.rating * 30) : 0;
                const isInStock = stockNum > 0;
                return (
                  <tr key={product.id}>
                    <td>
                      <input type="checkbox" className="admin-checkbox" />
                    </td>
                    <td>
                      <div className="admin-product-cell">
                        <div className="admin-product-thumb-lg">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div>
                          <p className="admin-product-cell-name">{product.name}</p>
                          <p className="admin-product-cell-sku">SKU: VDY-{String(product.id).padStart(3, "0")}</p>
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-cat">{product.category}</td>
                    <td className="admin-table-amount">{product.price}</td>
                    <td>
                      <span className={stockNum === 0 ? "admin-stock-zero" : ""}>{stockNum}</span>
                    </td>
                    <td>
                      <span className={`admin-stock-badge ${isInStock ? "in-stock" : "out-of-stock"}`}>
                        <span className="admin-stock-dot" />
                        {isInStock ? "IN STOCK" : "OUT OF STOCK"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-action-btn-round" title="Edit">
                          <FiEdit2 size={14} />
                        </button>
                        <button className="admin-action-btn-round admin-action-delete" title="Delete">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="admin-pagination">
          <span className="admin-pagination-info">
            Showing <strong>{(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, products.length)}</strong> of <strong>{products.length}</strong> products
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
      </motion.div>
    </div>
  );
}
