import { useEffect, useState } from "react";
import { getServiceReviews } from "../services/reviewApi";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ serviceId, serviceType }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (serviceId) {
      fetchReviews();
    }
  }, [serviceId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getServiceReviews(serviceId);
      setReviews(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = filter 
    ? reviews.filter(r => r.rating == filter) 
    : reviews;

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3>Reviews ({reviews.length})</h3>
        
        {reviews.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              ⭐ {averageRating} / 5
            </span>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: "8px 15px",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
            >
              <option value="">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        )}
      </div>

      {filteredReviews.length === 0 ? (
        <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>
          No reviews yet. Be the first to review!
        </p>
      ) : (
        filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </div>
  );
};

export default ReviewList;
