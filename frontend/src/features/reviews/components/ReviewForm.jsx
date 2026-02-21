import { useState } from "react";
import StarRating from "./StarRating";
import { submitReview } from "../services/reviewApi";

const ReviewForm = ({ serviceId, serviceType, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    setLoading(true);
    try {
      await submitReview({
        service_id: serviceId,
        service_type: serviceType,
        rating,
        comment
      });
      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
      <h3>Write a Review</h3>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Rating</label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Your Review</label>
        <textarea
          placeholder="Write your experience..."
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontFamily: "inherit"
          }}
        />
        <small style={{ color: "#666" }}>{comment.length}/500 characters</small>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        style={{
          background: "#667eea",
          color: "white",
          border: "none",
          padding: "10px 25px",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
