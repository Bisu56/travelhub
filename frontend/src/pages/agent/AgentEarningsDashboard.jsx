import { useEffect, useState } from "react";
import { getAgentEarnings, exportEarnings } from "../services/earningsService";
import EarningsSummaryCard from "../components/agent/earnings/EarningsSummaryCard";
import EarningsChart from "../components/agent/earnings/EarningsChart";
import CommissionTable from "../components/agent/earnings/CommissionTable";
import PayoutRequestForm from "../components/agent/earnings/PayoutRequestForm";
import PayoutHistoryTable from "../components/agent/earnings/PayoutHistoryTable";

const AgentEarningsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await getAgentEarnings();
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch earnings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await exportEarnings();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "earnings.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to export earnings");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h2>My Earnings</h2>
      <button onClick={handleExport} style={{ marginBottom: "20px" }}>
        Export Earnings (CSV)
      </button>

      <EarningsSummaryCard data={data.summary} />
      <EarningsChart commissions={data.commissions} />
      <CommissionTable commissions={data.commissions} />
      <PayoutRequestForm />
      <PayoutHistoryTable payouts={data.payouts} />
    </div>
  );
};

export default AgentEarningsDashboard;
