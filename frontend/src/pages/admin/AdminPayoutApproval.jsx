import { useEffect, useState } from "react";
import { getPendingPayouts, approvePayout, rejectPayout } from "../../services/earningsService";

const AdminPayoutApproval = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    setLoading(true);
    try {
      const res = await getPendingPayouts();
      setPayouts(res.data);
    } catch (error) {
      console.error("Failed to fetch payouts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approvePayout(id);
      fetchPayouts();
    } catch (error) {
      alert("Failed to approve payout");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectPayout(id);
      fetchPayouts();
    } catch (error) {
      alert("Failed to reject payout");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Pending Payout Requests</h2>
      {payouts.length === 0 ? (
        <p>No pending payouts</p>
      ) : (
        payouts.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <p><strong>Agent:</strong> {p.agentName}</p>
            <p><strong>Amount:</strong> Rs {p.amount}</p>
            <p><strong>Status:</strong> {p.status}</p>
            <button onClick={() => handleApprove(p.id)}>Approve</button>
            <button onClick={() => handleReject(p.id)}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPayoutApproval;
