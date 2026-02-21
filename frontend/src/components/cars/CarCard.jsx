import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div className="car-card">
      <img src={car.image_url} alt={car.model} width="250" />
      <h3>{car.make} {car.model}</h3>
      <p>{car.year}</p>
      <p>{car.transmission} • {car.fuel_type}</p>
      <p>Seats: {car.seating_capacity}</p>
      <p>Daily Rate: ${car.daily_rate}</p>

      <button onClick={() => navigate(`/cars/${car.id}`)}>
        View Details
      </button>
    </div>
  );
};

export default CarCard;