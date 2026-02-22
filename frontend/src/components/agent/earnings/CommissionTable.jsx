const CommissionTable = ({ commissions }) => {
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
            <td>{c.amount}</td>
            <td>{c.rate}%</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommissionTable;
