import { useState } from "react";
import { createPayoutRequest } from "../services/earningsApi";

const PayoutRequestForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPayoutRequest({ amount: Number(amount) });
      alert("Payout request submitted");
      setAmount("");
    } catch {
      alert("Failed to submit payout request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Request Payout</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Request"}
      </button>
    </form>
  );
};

export default PayoutRequestForm;
