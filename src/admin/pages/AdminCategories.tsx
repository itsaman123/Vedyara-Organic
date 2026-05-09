import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { categories as dataCategories } from "../../data/products";

const catData = dataCategories.filter((c) => c.id !== "all").map((c, i) => ({
  ...c,
  productCount: [2, 0, 1, 0][i] || 0,
  description: ["Raw & organic honey varieties", "Heritage grain collection", "Chemical-free jaggery products", "Premium whole grains"][i] || "Category description",
}));

export default function AdminCategories() {
  const [cats] = useState(catData);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Categories</h1>
          <p className="admin-page-subtitle">Organize your products into categories.</p>
        </div>
        <button className="admin-btn admin-btn-primary"><FiPlus size={16} /> Add Category</button>
      </div>

      <div className="admin-categories-grid">
        {cats.map((cat, i) => (
          <motion.div key={cat.id} className="admin-card admin-category-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="admin-cat-header">
              <span className="admin-cat-emoji">{cat.emoji}</span>
              <div className="admin-cat-actions-row">
                <button className="admin-action-btn"><FiEdit2 size={14} /></button>
                <button className="admin-action-btn admin-action-delete"><FiTrash2 size={14} /></button>
              </div>
            </div>
            <h3 className="admin-cat-name">{cat.label}</h3>
            <p className="admin-cat-desc">{cat.description}</p>
            <span className="admin-cat-count">{cat.productCount} products</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
