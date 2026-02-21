import StarRating from "./StarRating";
import HelpfulButtons from "./HelpfulButtons";

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "15px",
      border: "1px solid #e0e0e0"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#667eea",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}>
              {review.user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h4 style={{ margin: 0 }}>{review.user?.name || "Anonymous"}</h4>
              <small style={{ color: "#666" }}>{formatDate(review.created_at)}</small>
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} readonly={true} />
      </div>

      <p style={{ margin: "10px 0", lineHeight: "1.6" }}>{review.comment}</p>

      <div style={{ marginTop: "10px" }}>
        <HelpfulButtons reviewId={review.id} initialHelpfulCount={review.helpful_count || 0} />
      </div>
    </div>
  );
};

export default ReviewCard;
