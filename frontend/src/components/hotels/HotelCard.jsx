import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div className="hotel-card">
      <img src={hotel.images[0]} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>⭐ {hotel.star_rating}</p>
      <p>{hotel.location}</p>
      <button onClick={() => navigate(`/hotels/${hotel.id}`)}>
        View Details
      </button>
    </div>
  );
};

export default HotelCard;