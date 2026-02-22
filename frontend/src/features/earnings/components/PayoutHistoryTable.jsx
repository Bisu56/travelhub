const PayoutHistoryTable = ({ payouts }) => {
  if (!payouts || payouts.length === 0) return <p>No payout history</p>;

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {payouts.map((p) => (
          <tr key={p.id}>
            <td>Rs {p.amount}</td>
            <td>{p.status}</td>
            <td>{p.paymentDate || p.requestDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PayoutHistoryTable;
