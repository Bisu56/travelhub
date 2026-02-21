import PaymentReceipt from "../../components/payments/PaymentReceipt";

const PaymentSuccessPage = () => {
  const bookingDetails = {
    bookingId: localStorage.getItem("lastBooking") || "N/A",
    paymentMethod: localStorage.getItem("paymentMethod") || "N/A",
    amount: localStorage.getItem("paymentAmount") || "0",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  const handleGoHome = () => {
    window.location.href = "/";
    localStorage.removeItem("lastBooking");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("paymentAmount");
  };

  const handleViewBookings = () => {
    window.location.href = "/my-bookings";
    localStorage.removeItem("lastBooking");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("paymentAmount");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)", 
        color: "white", 
        padding: "40px 20px", 
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <div style={{ fontSize: "60px", marginBottom: "10px" }}>✅</div>
        <h2>Payment Successful!</h2>
        <p>Thank you for your payment. Your booking has been confirmed.</p>
      </div>

      <div style={{ 
        background: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "10px",
        marginBottom: "20px",
        textAlign: "left"
      }}>
        <h4 style={{ marginTop: 0 }}>Payment Details</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Booking ID</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>{bookingDetails.bookingId}</p>
          </div>
          <div>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Amount Paid</p>
            <p style={{ margin: 0, fontWeight: "bold", color: "#28a745" }}>${bookingDetails.amount}</p>
          </div>
          <div>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Payment Method</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>{bookingDetails.paymentMethod}</p>
          </div>
          <div>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Date & Time</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>{bookingDetails.date} {bookingDetails.time}</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <PaymentReceipt data={bookingDetails} />
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button 
          onClick={handleGoHome}
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
          🏠 Go to Home
        </button>
        <button 
          onClick={handleViewBookings}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          📋 View My Bookings
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
