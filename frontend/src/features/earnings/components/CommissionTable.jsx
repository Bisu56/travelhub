const CommissionTable = ({ commissions }) => {
  if (!commissions || commissions.length === 0) return <p>No commissions yet</p>;

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Amount</th>
          <th>Rate %</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {commissions.map((c) => (
          <tr key={c.id}>
            <td>{c.bookingId}</td>
            <td>Rs {c.amount}</td>
            <td>{c.rate}%</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommissionTable;
