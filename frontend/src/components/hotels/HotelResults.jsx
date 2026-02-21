import HotelCard from "./HotelCard";

const HotelResults = ({ hotels, loading }) => {
  if (loading) return <p>Loading hotels...</p>;
  if (!hotels.length) return <p>No hotels found</p>;

  return (
    <div className="hotel-grid">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelResults;