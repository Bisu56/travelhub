import { useState } from "react";

const StarRating = ({ rating, setRating, readonly = false }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: readonly ? "default" : "pointer",
            fontSize: "24px",
            color: star <= rating ? "#FFD700" : "#ccc"
          }}
          onClick={() => !readonly && setRating && setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
