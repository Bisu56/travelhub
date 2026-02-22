const EarningsSummaryCard = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="summary-container">
      <div>Total: Rs {data.total || 0}</div>
      <div>Pending: Rs {data.pending || 0}</div>
      <div>Paid: Rs {data.paid || 0}</div>
    </div>
  );
};

export default EarningsSummaryCard;