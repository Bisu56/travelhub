import FlightCard from "./FlightCard";

const FlightResults = ({ flights, loading }) => {
  if (loading) return <p>Loading flights...</p>;
  if (!flights.length) return <p>No flights found</p>;

  return (
    <div>
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};

export default FlightResults;