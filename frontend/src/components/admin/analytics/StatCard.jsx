const StatCard = ({ title, value }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px" }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default StatCard;
