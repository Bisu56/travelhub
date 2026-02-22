import { useState } from "react";
import { calculateCommission } from "../services/earningsApi";

const AdminCommissionManagement = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCalculate = async () => {
    setLoading(true);
    setMessage("");
    try {
      await calculateCommission();
      setMessage("Commissions calculated successfully");
    } catch {
      setMessage("Failed to calculate commissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Commission Management</h2>
      {message && <p>{message}</p>}
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? "Calculating..." : "Calculate Commissions"}
      </button>
    </div>
  );
};

export default AdminCommissionManagement;
