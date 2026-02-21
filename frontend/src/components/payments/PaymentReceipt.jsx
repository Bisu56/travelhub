import { useMemo } from "react";

const PaymentReceipt = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  const receiptData = useMemo(() => {
    if (data) return data;
    return {
      bookingId: localStorage.getItem("lastBooking") || "N/A",
      amount: localStorage.getItem("paymentAmount") || "0",
      method: localStorage.getItem("paymentMethod") || "N/A",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      transactionId: `TXN-${Date.now()}`
    };
  }, [data]);

  return (
    <div style={{ 
      background: "white", 
      padding: "20px", 
      borderRadius: "10px",
      border: "1px solid #e0e0e0"
    }}>
      <div style={{ textAlign: "center", marginBottom: "20px", borderBottom: "2px dashed #e0e0e0", paddingBottom: "15px" }}>
        <h3 style={{ margin: 0 }}>Payment Receipt</h3>
        <p style={{ margin: "5px 0 0", color: "#666", fontSize: "14px" }}>TravelHub Booking</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#666" }}>Transaction ID</span>
          <span style={{ fontWeight: "bold" }}>{receiptData.transactionId}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#666" }}>Booking ID</span>
          <span style={{ fontWeight: "bold" }}>{receiptData.bookingId}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#666" }}>Payment Method</span>
          <span style={{ fontWeight: "bold" }}>{receiptData.method || receiptData.paymentMethod}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#666" }}>Date</span>
          <span style={{ fontWeight: "bold" }}>{receiptData.date}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#666" }}>Time</span>
          <span style={{ fontWeight: "bold" }}>{receiptData.time}</span>
        </div>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginTop: "15px", 
          paddingTop: "15px",
          borderTop: "2px solid #e0e0e0"
        }}>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>Total Amount</span>
          <span style={{ fontWeight: "bold", fontSize: "24px", color: "#28a745" }}>${receiptData.amount}</span>
        </div>
      </div>

      <button 
        onClick={handlePrint}
        style={{
          width: "100%",
          background: "#667eea",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Download Invoice
      </button>
    </div>
  );
};

export default PaymentReceipt;
