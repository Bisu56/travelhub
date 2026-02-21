import CarCard from "./CarCard";

const CarResults = ({ cars, loading }) => {
  if (loading) return <p>Loading cars...</p>;
  if (!cars.length) return <p>No cars available</p>;

  return (
    <div className="car-grid">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarResults;