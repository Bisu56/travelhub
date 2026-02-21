import { useEffect, useState } from "react";
import { getAllReviews, moderateReview } from "../services/reviewApi";
import StarRating from "../components/StarRating";

const AdminReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getAllReviews();
      setReviews(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (reviewId, status) => {
    try {
      await moderateReview(reviewId, status);
      alert(`Review ${status}!`);
      fetchReviews();
    } catch (error) {
      alert("Failed to moderate review");
    }
  };

  const filteredReviews = reviews.filter(r => 
    filter === "all" ? true : r.status === filter
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Review Moderation</h2>
      
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {["pending", "approved", "rejected", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              border: "none",
              background: filter === status ? "#667eea" : "#e0e0e0",
              color: filter === status ? "white" : "#333",
              cursor: "pointer",
              textTransform: "capitalize"
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredReviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <strong>{review.user?.name || "Anonymous"}</strong>
                    <span style={{
                      padding: "2px 10px",
                      borderRadius: "10px",
                      fontSize: "12px",
                      background: review.status === "approved" ? "#d4edda" : 
                                 review.status === "rejected" ? "#f8d7da" : "#fff3cd",
                      color: review.status === "approved" ? "#155724" : 
                             review.status === "rejected" ? "#721c24" : "#856404"
                    }}>
                      {review.status}
                    </span>
                  </div>
                  <StarRating rating={review.rating} readonly={true} />
                  <p style={{ margin: "10px 0" }}>{review.comment}</p>
                  <small style={{ color: "#666" }}>
                    Service: {review.service_type} #{review.service_id} • {formatDate(review.created_at)}
                  </small>
                </div>
                
                {review.status === "pending" && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleModerate(review.id, "approved")}
                      style={{
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleModerate(review.id, "rejected")}
                      style={{
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviewModeration;
