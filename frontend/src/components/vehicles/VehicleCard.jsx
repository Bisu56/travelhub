import { useNavigate } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <div className="vehicle-card">
      <img src={vehicle.image_url} alt={vehicle.model} width="250" />
      <h3>{vehicle.make} {vehicle.model}</h3>
      <p>{vehicle.year}</p>
      <p>{vehicle.transmission} • {vehicle.fuel_type}</p>
      <p>Seats: {vehicle.seating_capacity}</p>
      <p>Daily Rate: ${vehicle.daily_rate}</p>

      <button onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
        View Details
      </button>
    </div>
  );
};

export default VehicleCard;
