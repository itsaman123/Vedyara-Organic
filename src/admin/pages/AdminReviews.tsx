import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const reviews = [
  { id: 1, customer: "Priya Sharma", product: "Pure Natural Honey", rating: 5, comment: "Absolutely pure and delicious. You can taste the difference!", date: "May 6, 2026", avatar: "PS" },
  { id: 2, customer: "Rahul Verma", product: "Natural Jaggery Powder", rating: 5, comment: "Amazing taste in chai. Feel genuinely healthier.", date: "May 4, 2026", avatar: "RV" },
  { id: 3, customer: "Ananya Patel", product: "Turmeric Powder", rating: 4, comment: "Great quality. Packaging is premium.", date: "May 3, 2026", avatar: "AP" },
  { id: 4, customer: "Deepak Nair", product: "Coriander Powder", rating: 4, comment: "Fresh and aromatic. Good quantity for the price.", date: "May 1, 2026", avatar: "DN" },
  { id: 5, customer: "Meera Iyer", product: "Pure Natural Honey", rating: 5, comment: "Best honey I've ever tasted. Ordering again!", date: "Apr 28, 2026", avatar: "MI" },
];

export default function AdminReviews() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Reviews</h1>
          <p className="admin-page-subtitle">Customer feedback and ratings.</p>
        </div>
      </div>

      <div className="admin-reviews-list">
        {reviews.map((r, i) => (
          <motion.div key={r.id} className="admin-card admin-review-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div className="admin-review-top">
              <div className="admin-customer-avatar">{r.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 className="admin-customer-name">{r.customer}</h3>
                  <span className="admin-table-date">{r.date}</span>
                </div>
                <p className="admin-review-product">{r.product}</p>
                <div className="admin-review-stars">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <FiStar key={si} size={14} style={{ color: si < r.rating ? "#D4AF37" : "#ddd", fill: si < r.rating ? "#D4AF37" : "none" }} />
                  ))}
                </div>
              </div>
            </div>
            <p className="admin-review-comment">"{r.comment}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
