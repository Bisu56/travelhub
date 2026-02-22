const EarningsSummaryCard = ({ data }) => {
  return (
    <div className="summary-container">
      <div>Total: Rs {data.total}</div>
      <div>Pending: Rs {data.pending}</div>
      <div>Paid: Rs {data.paid}</div>
    </div>
  );
};

export default EarningsSummaryCard;