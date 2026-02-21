import { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("/api/payments/user").then(res => setPayments(res.data));
  }, []);

  return (
    <div>
      <h2>Payment History</h2>
      {payments.map(p => (
        <div key={p.id}>
          <p>Booking: {p.booking_id}</p>
          <p>Amount: ${p.amount}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistoryPage;