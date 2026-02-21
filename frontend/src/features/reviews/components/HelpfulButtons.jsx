import { useState } from "react";
import { voteHelpful } from "../services/reviewApi";

const HelpfulButtons = ({ reviewId, initialHelpfulCount = 0 }) => {
  const [voted, setVoted] = useState(false);
  const [count, setCount] = useState(initialHelpfulCount);

  const handleVote = async () => {
    if (voted) return;
    
    try {
      await voteHelpful(reviewId);
      setVoted(true);
      setCount(count + 1);
    } catch (error) {
      console.error("Failed to vote");
    }
  };

  return (
    <button 
      onClick={handleVote}
      disabled={voted}
      style={{
        background: voted ? "#28a745" : "#f8f9fa",
        color: voted ? "white" : "#333",
        border: "1px solid #ddd",
        padding: "5px 15px",
        borderRadius: "20px",
        cursor: voted ? "default" : "pointer",
        fontSize: "14px",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px"
      }}
    >
      👍 Helpful {count > 0 && `(${count})`}
    </button>
  );
};

export default HelpfulButtons;
