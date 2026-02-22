import { useEffect, useState } from "react";
import { getAgentEarnings } from "../services/earningsApi";
import EarningsSummaryCard from "../components/EarningsSummaryCard";
import CommissionTable from "../components/CommissionTable";
import EarningsChart from "../components/EarningsChart";
import PayoutHistoryTable from "../components/PayoutHistoryTable";
import PayoutRequestForm from "../components/PayoutRequestForm";

const AgentEarningsDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadEarnings = async () => {
      const res = await getAgentEarnings();
      setData(res.data);
    };
    loadEarnings();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Earnings</h2>

      <EarningsSummaryCard data={data.summary} />
      <EarningsChart commissions={data.commissions} />
      <CommissionTable commissions={data.commissions} />
      <PayoutRequestForm />
      <PayoutHistoryTable payouts={data.payouts} />
    </div>
  );
};

export default AgentEarningsDashboard;