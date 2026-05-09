import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
} from "react-icons/fi";
import { products } from "../../data/products";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle">
            Manage your product catalog and inventory.
          </p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => navigate("/admin/add-product")}
        >
          <FiPlus size={16} />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="admin-btn admin-btn-outline">
          <FiFilter size={14} />
          Filters
        </button>
      </div>

      {/* Products Table */}
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
                <th>Price</th>
                <th>Weight</th>
                <th>Rating</th>
                <th>Badge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      <div className="admin-product-thumb">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div>
                        <p className="admin-product-cell-name">
                          {product.name}
                        </p>
                        <p className="admin-product-cell-desc">
                          {product.shortDesc}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-cat-badge">{product.category}</span>
                  </td>
                  <td>
                    <span className="admin-table-amount">{product.price}</span>
                    {product.originalPrice && (
                      <span className="admin-table-original">
                        {product.originalPrice}
                      </span>
                    )}
                  </td>
                  <td>{product.weight}</td>
                  <td>
                    <span className="admin-rating">
                      ★ {product.rating || "N/A"}
                    </span>
                  </td>
                  <td>
                    {product.badge ? (
                      <span className="admin-badge-tag">{product.badge}</span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-action-btn" title="View">
                        <FiEye size={15} />
                      </button>
                      <button className="admin-action-btn" title="Edit">
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        className="admin-action-btn admin-action-delete"
                        title="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
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
