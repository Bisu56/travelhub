const PopularDestinations = ({ data }) => {
  if (!data || data.length === 0) return <p>No destination data available</p>;

  return (
    <div>
      <h3>Popular Destinations</h3>
      <ul>
        {data.map((d, index) => (
          <li key={index}>
            {d.name} ({d.bookings} bookings)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularDestinations;
