import { useNavigate } from "react-router-dom";

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    const bookingId = localStorage.getItem("lastBooking") || "";
    const amount = localStorage.getItem("paymentAmount") || "100";
    navigate(`/payment-method?bookingId=${bookingId}&amount=${amount}`);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)", 
        color: "white", 
        padding: "40px 20px", 
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <div style={{ fontSize: "60px", marginBottom: "10px" }}>❌</div>
        <h2>Payment Failed</h2>
        <p>Unfortunately, your payment could not be processed. Please try again.</p>
      </div>

      <div style={{ 
        background: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "10px",
        marginBottom: "20px",
        textAlign: "left"
      }}>
        <h4 style={{ marginTop: 0 }}>Possible Reasons:</h4>
        <ul style={{ color: "#666" }}>
          <li>Invalid card details</li>
          <li>Insufficient funds</li>
          <li>Card expired</li>
          <li>Network error</li>
          <li>Payment gateway issue</li>
        </ul>
      </div>

      <div style={{ 
        background: "#fff3cd", 
        padding: "15px", 
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <p style={{ margin: 0, color: "#856404" }}>
          💡 If the problem persists, please contact your bank or try a different payment method.
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button 
          onClick={handleRetry}
          style={{
            background: "#667eea",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🔄 Try Again
        </button>
        <button 
          onClick={handleGoHome}
          style={{
            background: "#6c757d",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🏠 Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
