import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiDownload, FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { products as initialProducts } from "../../data/products";

const ITEMS_PER_PAGE = 8;

export default function AdminProducts() {
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState(initialProducts);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filtered products based on search
  const filteredProducts = useMemo(() => {
    return productList.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productList, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginated = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginated.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductList(productList.filter(p => p.id !== id));
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(productList, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vedyara-products.json';
    link.click();
    URL.revokeObjectURL(url);
  };

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
          <p className="admin-page-subtitle">Manage your organic product inventory and listings.</p>
        </div>
        <div className="admin-header-actions" style={{ display: 'flex', gap: '12px' }}>
          <button className="admin-btn admin-btn-outline" onClick={handleExport}>
            <FiDownload size={14} /> Export SVG
          </button>
          <button className="admin-btn admin-btn-primary" onClick={() => navigate("/admin/add-product")}>
            <FiPlus size={16} /> Add New Product
          </button>
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
        <div className="admin-search-wrap" style={{ position: 'relative', width: '300px' }}>
          <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="admin-input" 
            style={{ paddingLeft: '40px', background: '#f9f9f9' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="admin-toolbar-right">
          {selectedIds.length > 0 && (
            <button className="admin-btn admin-btn-outline" style={{ color: '#e74c3c', borderColor: '#fce8e6' }}>
              <FiTrash2 size={14} /> Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <motion.div className="admin-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="admin-table-wrap">
          <table className="admin-table admin-product-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input 
                    type="checkbox" 
                    className="admin-checkbox" 
                    onChange={handleSelectAll}
                    checked={paginated.length > 0 && selectedIds.length === paginated.length}
                  />
                </th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode='popLayout'>
                {paginated.map((product) => {
                  const stockNum = product.rating > 0 ? Math.floor(product.rating * 30) : 0;
                  const isInStock = stockNum > 0;
                  const isSelected = selectedIds.includes(product.id);

                  return (
                    <motion.tr 
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={isSelected ? "selected-row" : ""}
                      style={{ background: isSelected ? 'rgba(212, 175, 55, 0.03)' : 'transparent' }}
                    >
                      <td>
                        <input 
                          type="checkbox" 
                          className="admin-checkbox" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(product.id)}
                        />
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
                      <td className="admin-table-amount">₹{product.price}</td>
                      <td>
                        <span className={stockNum === 0 ? "admin-stock-zero" : ""}>{stockNum}</span>
                      </td>
                      <td>
                        <span className={`admin-stock-badge ${isInStock ? "in-stock" : "out-of-stock"}`}>
                          <span className="admin-stock-dot" />
                          {isInStock ? "IN STOCK" : "OUT OF STOCK"}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button 
                            className="admin-action-btn-round" 
                            title="Edit"
                            onClick={() => navigate(`/admin/add-product?edit=${product.id}`)}
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button 
                            className="admin-action-btn-round admin-action-delete" 
                            title="Delete"
                            onClick={() => handleDelete(product.id)}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: '#888' }}>
                    No products found matching your search.
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
              Showing <strong>{(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products
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
