const TopAgentsTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No agent data available</p>;

  return (
    <div>
      <h3>Top Agents</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Revenue</th>
            <th>Bookings</th>
          </tr>
        </thead>
        <tbody>
          {data.map((agent) => (
            <tr key={agent.id}>
              <td>{agent.name}</td>
              <td>Rs {agent.revenue}</td>
              <td>{agent.bookings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopAgentsTable;
