import VehicleCard from "./VehicleCard";

const VehicleResults = ({ vehicles, loading }) => {
  if (loading) return <p>Loading vehicles...</p>;
  if (!vehicles.length) return <p>No vehicles available</p>;

  return (
    <div className="vehicle-grid">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleResults;
