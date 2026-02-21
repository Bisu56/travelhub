import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockPayments = [
      { id: 1, bookingId: "BK-001", amount: 250, method: "Stripe", status: "success", date: "2024-01-15" },
      { id: 2, bookingId: "BK-002", amount: 150, method: "Khalti", status: "success", date: "2024-01-10" },
      { id: 3, bookingId: "BK-003", amount: 500, method: "Stripe", status: "failed", date: "2024-01-05" },
    ];
    
    setTimeout(() => {
      setPayments(mockPayments);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <p>Loading payment history...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        color: "white", 
        padding: "20px", 
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h2>💳 Payment History</h2>
        <p>View all your past transactions</p>
      </div>

      {payments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <p style={{ fontSize: "48px" }}>📭</p>
          <p>No payment history found</p>
          <Link to="/" style={{ color: "#667eea" }}>Go to Home</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {payments.map((payment) => (
            <div 
              key={payment.id}
              style={{ 
                background: "#f8f9fa", 
                padding: "20px", 
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderLeft: payment.status === "success" ? "4px solid #28a745" : "4px solid #dc3545"
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
                  Booking: {payment.bookingId}
                </p>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  {payment.method} • {payment.date}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>
                  ${payment.amount}
                </p>
                <span style={{ 
                  padding: "4px 12px", 
                  borderRadius: "20px",
                  fontSize: "12px",
                  background: payment.status === "success" ? "#d4edda" : "#f8d7da",
                  color: payment.status === "success" ? "#155724" : "#721c24"
                }}>
                  {payment.status === "success" ? "✅ Paid" : "❌ Failed"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link 
          to="/my-bookings"
          style={{
            display: "inline-block",
            background: "#667eea",
            color: "white",
            padding: "12px 30px",
            borderRadius: "5px",
            textDecoration: "none"
          }}
        >
          📋 View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
