import { useState } from "react";
import { updateCommissionRate } from "../../../services/earningsService";

const CommissionRateConfig = () => {
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCommissionRate(Number(rate));
      setMessage("Commission rate updated successfully");
    } catch (error) {
      setMessage("Failed to update commission rate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <h3>Commission Rate Configuration</h3>
      <input
        type="number"
        placeholder="Commission % (e.g. 10)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CommissionRateConfig;
