import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiPlus, FiX, FiInfo,FiBox } from "react-icons/fi";

export default function AdminAddProduct() {
  const [tags, setTags] = useState(["ORGANIC", "VEGAN"]);
  const [newTag, setNewTag] = useState("");
  const [isInStock, setIsInStock] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      if (!tags.includes(newTag.trim().toUpperCase())) {
        setTags([...tags, newTag.trim().toUpperCase()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-page">
      {/* Header Actions */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Add New Product</h1>
          <p className="admin-page-subtitle">
            Create a new entry in your luxury organic wellness collection.
          </p>
        </div>
        <div className="admin-header-actions" style={{ display: 'flex', gap: '12px' }}>
          <button className="admin-btn admin-btn-outline">Save as Draft</button>
          <button className="admin-btn admin-btn-primary">Add Product</button>
        </div>
      </div>

      <div className="admin-add-product-grid">
        {/* Left Column */}
        <div className="admin-add-left">
          {/* General Information */}
          <div className="admin-card" style={{ padding: '32px' }}>
            <h2 className="admin-card-section-title" style={{ marginBottom: '24px' }}>General Information</h2>
            
            <div className="admin-form-group">
              <label className="admin-label">Product Name</label>
              <input 
                type="text" 
                className="admin-input" 
                placeholder="e.g. Organic Lavender Calming Serum" 
              />
            </div>

            <div className="admin-form-group" style={{ marginTop: '24px' }}>
              <label className="admin-label">Description</label>
              <textarea 
                className="admin-textarea" 
                placeholder="Describe the benefits, ingredients, and usage of this premium product..."
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="admin-card" style={{ padding: '32px' }}>
            <div className="admin-card-header-row" style={{ marginBottom: '20px' }}>
              <h2 className="admin-card-section-title" style={{ margin: 0 }}>Product Images</h2>
              <span className="admin-card-hint">RECOMMENDED 1200 X 1200PX</span>
            </div>
            
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden-input" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <div 
              className="admin-upload-zone" 
              onClick={triggerUpload}
              style={{ 
                border: '2px dashed #e0e0e0',
                background: '#fafafa',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <FiUploadCloud size={40} style={{ color: '#d4af37', marginBottom: '16px' }} />
              <p className="admin-upload-text" style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>Click to upload or drag and drop</p>
              <p className="admin-upload-hint" style={{ color: '#888', marginTop: '4px' }}>PNG, JPG or WebP (max. 5MB)</p>
            </div>

            <div className="admin-image-thumbs" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
              <AnimatePresence>
                {images.map((img, index) => (
                  <motion.div 
                    key={img}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="admin-thumb" 
                    style={{ position: 'relative' }}
                  >
                    <img src={img} alt={`product-${index}`} />
                    <button 
                      className="admin-thumb-remove"
                      onClick={() => removeImage(index)}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      <FiX />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div 
                className="admin-thumb admin-thumb-add" 
                onClick={triggerUpload}
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '12px', 
                  border: '2px dashed #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: '#f9f9f9',
                  color: '#999'
                }}
              >
                <FiPlus size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="admin-add-right">
          {/* Pricing & Inventory */}
          <div className="admin-card" style={{ padding: '32px' }}>
            <h2 className="admin-card-section-title" style={{ marginBottom: '24px' }}>Pricing & Inventory</h2>
            
            <div className="admin-form-row" style={{ marginBottom: '20px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Base Price</label>
                <div className="admin-input-prefix">
                  <span className="admin-prefix">$</span>
                  <input type="number" className="admin-input admin-input-with-prefix" placeholder="0.00" />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Discount</label>
                <div className="admin-input-prefix">
                  <span className="admin-prefix">$</span>
                  <input type="number" className="admin-input admin-input-with-prefix" placeholder="0.00" />
                </div>
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label className="admin-label">Stock Quantity</label>
              <input type="number" className="admin-input" placeholder="Enter amount" />
            </div>

            <div className="admin-toggle-row" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              background: '#f9f9f9',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiBox className={isInStock ? "text-primary" : "text-gray"} />
                <label className="admin-label" style={{ margin: 0, color: '#333' }}>Availability Status</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="admin-toggle-label" style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: 600,
                  color: isInStock ? '#4b6a13' : '#e74c3c'
                }}>
                  {isInStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <button 
                  className={`admin-toggle ${isInStock ? 'active' : ''}`}
                  onClick={() => setIsInStock(!isInStock)}
                  type="button"
                >
                  <span className="admin-toggle-knob" />
                </button>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="admin-card" style={{ padding: '32px' }}>
            <h2 className="admin-card-section-title" style={{ marginBottom: '24px' }}>Organization</h2>
            
            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label className="admin-label">Category</label>
              <select className="admin-select">
                <option value="">Select Category</option>
                <option value="essential-oils">Essential Oils</option>
                <option value="herbal-teas">Herbal Teas</option>
                <option value="accessories">Accessories</option>
                <option value="skincare">Skincare</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Tags</label>
              <div className="admin-tags-list" style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px', 
                marginBottom: '12px' 
              }}>
                {tags.map(tag => (
                  <motion.span 
                    layout
                    key={tag} 
                    className="admin-tag"
                  >
                    {tag} 
                    <button 
                      onClick={() => removeTag(tag)} 
                      className="admin-tag-remove"
                      style={{ marginLeft: '4px' }}
                    >
                      <FiX size={12} />
                    </button>
                  </motion.span>
                ))}
              </div>
              <div className="admin-tag-input-wrap" style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Type and press enter..." 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                <FiPlus style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              </div>
            </div>
          </div>

          {/* Listing Tip */}
          <div className="admin-listing-tip" style={{ 
            background: '#2b2118', 
            borderRadius: '20px', 
            padding: '24px', 
            color: '#fff',
            boxShadow: '0 10px 30px rgba(43,33,24,0.2)'
          }}>
            <div className="admin-tip-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FiInfo className="admin-tip-icon" style={{ color: '#d4af37' }} />
              <span className="admin-tip-title" style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>LISTING TIP</span>
            </div>
            <p className="admin-tip-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.7)' }}>
              Detailed descriptions with clear ingredient lists help improve SEO and customer trust. Ensure your hero image features the product prominently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

