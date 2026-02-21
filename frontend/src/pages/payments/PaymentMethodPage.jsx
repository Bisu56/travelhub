import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckoutForm from "../../components/payments/StripeCheckoutForm";
import KhaltiButton from "../../components/payments/KhaltiButton";
import { useState, useEffect } from "react";

const PaymentMethodPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (state) {
      setBookingId(state.bookingId || "");
      setAmount(state.amount || 0);
    } else {
      const params = new URLSearchParams(window.location.search);
      setBookingId(params.get("bookingId") || "TEST-" + Date.now());
      setAmount(params.get("amount") || 100);
    }
  }, [state]);

  const handleMockPayment = (method) => {
    localStorage.setItem("lastBooking", bookingId);
    localStorage.setItem("paymentMethod", method);
    localStorage.setItem("paymentAmount", amount);
    navigate("/payment-success");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        color: "white", 
        padding: "20px", 
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h2>Select Payment Method</h2>
        <p>Complete your booking payment securely</p>
      </div>

      <div style={{ 
        background: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, color: "#666" }}>Booking ID</p>
            <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>{bookingId}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, color: "#666" }}>Total Amount</p>
            <p style={{ margin: 0, fontWeight: "bold", fontSize: "24px", color: "#667eea" }}>${amount}</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Choose Payment Option</h3>
        
        <div style={{ 
          border: "2px solid #e0e0e0", 
          borderRadius: "10px", 
          padding: "15px",
          marginBottom: "10px",
          cursor: "pointer",
          transition: "all 0.3s"
        }}>
          <StripeCheckoutForm bookingId={bookingId} amount={amount} />
        </div>

        <div style={{ 
          border: "2px solid #e0e0e0", 
          borderRadius: "10px", 
          padding: "15px",
          marginBottom: "10px",
          cursor: "pointer",
          transition: "all 0.3s"
        }}>
          <KhaltiButton bookingId={bookingId} amount={amount} />
        </div>

        <div style={{ 
          border: "2px solid #e0e0e0", 
          borderRadius: "10px", 
          padding: "15px",
          marginBottom: "10px",
          cursor: "pointer",
          transition: "all 0.3s"
        }}>
          <h4>💳 Mock Payment (Testing)</h4>
          <p style={{ color: "#666", fontSize: "14px" }}>Simulate payment for testing purposes</p>
          <button 
            onClick={() => handleMockPayment("mock")}
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Pay ${amount} (Mock)
          </button>
        </div>
      </div>

      <div style={{ 
        background: "#fff3cd", 
        padding: "15px", 
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <span>🔒</span>
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>Secure SSL Encrypted Payment</p>
          <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Your payment information is secure</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
        <img src="/visa.png" width="60" alt="Visa" style={{ opacity: 0.7 }} />
        <img src="/mastercard.png" width="60" alt="Mastercard" style={{ opacity: 0.7 }} />
        <img src="/khalti.png" width="60" alt="Khalti" style={{ opacity: 0.7 }} />
      </div>
    </div>
  );
};

export default PaymentMethodPage;
