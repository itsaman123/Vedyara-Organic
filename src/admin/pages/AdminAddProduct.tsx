import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiX, FiPlus } from "react-icons/fi";
import { categories } from "../../data/products";

/* ═══════════════════════════════════════════════════════════
   ADD PRODUCT PAGE — matches the screenshot design
═══════════════════════════════════════════════════════════ */
export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("0.0");
  const [discount, setDiscount] = useState("0.0");
  const [stockQty, setStockQty] = useState("");
  const [inStock, setInStock] = useState(true);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>(["ORGANIC", "VEGAN"]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImages((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const t = tagInput.trim().toUpperCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (draft: boolean) => {
    const product = {
      name,
      description,
      basePrice: parseFloat(basePrice),
      discount: parseFloat(discount),
      stockQty: parseInt(stockQty) || 0,
      inStock,
      category,
      tags,
      images,
      isDraft: draft,
    };
    console.log("Product submitted:", product);
    alert(draft ? "Saved as draft!" : "Product added successfully!");
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Add New Product</h1>
          <p className="admin-page-subtitle">
            Create a new entry in your luxury organic wellness collection.
          </p>
        </div>
        <div className="admin-header-actions">
          <button
            className="admin-btn admin-btn-outline"
            onClick={() => handleSubmit(true)}
          >
            Save as Draft
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => handleSubmit(false)}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Form grid — 2 columns */}
      <div className="admin-add-product-grid">
        {/* ── LEFT COLUMN ── */}
        <div className="admin-add-left">
          {/* General Information */}
          <motion.div
            className="admin-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="admin-card-section-title">General Information</h2>

            <div className="admin-form-group">
              <label className="admin-label">Product Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Organic Lavender Calming Serum"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                rows={5}
                placeholder="Describe the benefits, ingredients, and usage of this premium product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Product Images */}
          <motion.div
            className="admin-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="admin-card-header-row">
              <h2 className="admin-card-section-title">Product Images</h2>
              <span className="admin-card-hint">RECOMMENDED 1200 X 1200PX</span>
            </div>

            {/* Upload zone */}
            <div
              className="admin-upload-zone"
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUploadCloud size={36} className="admin-upload-icon" />
              <p className="admin-upload-text">Click to upload or drag and drop</p>
              <p className="admin-upload-hint">PNG, JPG or WebP (max. 5MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            {/* Image thumbnails */}
            {images.length > 0 && (
              <div className="admin-image-thumbs">
                {images.map((img, i) => (
                  <div key={i} className="admin-thumb">
                    <img src={img} alt={`Upload ${i + 1}`} />
                    <button
                      className="admin-thumb-remove"
                      onClick={() => removeImage(i)}
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
                <div
                  className="admin-thumb admin-thumb-add"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiPlus size={20} />
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="admin-add-right">
          {/* Pricing & Inventory */}
          <motion.div
            className="admin-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="admin-card-section-title">Pricing & Inventory</h2>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Base Price</label>
                <div className="admin-input-prefix">
                  <span className="admin-prefix">₹</span>
                  <input
                    type="number"
                    className="admin-input admin-input-with-prefix"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Discount</label>
                <div className="admin-input-prefix">
                  <span className="admin-prefix">₹</span>
                  <input
                    type="number"
                    className="admin-input admin-input-with-prefix"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Stock Quantity</label>
              <input
                type="number"
                className="admin-input"
                placeholder="Enter amount"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Availability Status</label>
              <div className="admin-toggle-row">
                <button
                  className={`admin-toggle ${inStock ? "active" : ""}`}
                  onClick={() => setInStock(!inStock)}
                >
                  <span className="admin-toggle-knob" />
                </button>
                <span className="admin-toggle-label">
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Organization */}
          <motion.div
            className="admin-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="admin-card-section-title">Organization</h2>

            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select
                className="admin-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories
                  .filter((c) => c.id !== "all")
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.emoji} {c.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Tags</label>
              <div className="admin-tags-list">
                {tags.map((tag) => (
                  <span key={tag} className="admin-tag">
                    {tag}
                    <button
                      className="admin-tag-remove"
                      onClick={() => removeTag(tag)}
                    >
                      <FiX size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="admin-input"
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Listing Tip */}
          <motion.div
            className="admin-listing-tip"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="admin-tip-icon">💡</div>
            <h3 className="admin-tip-title">LISTING TIP</h3>
            <p className="admin-tip-text">
              Detailed descriptions with clear ingredient lists help improve SEO
              and customer trust. Ensure your hero image features the product
              prominently.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
