import { useState } from "react";
import FlightDetailsModal from "./FlightDetailsModal";
import { useNavigate } from "react-router-dom";

const FlightCard = ({ flight }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flight-card">
      <h4>{flight.airline}</h4>
      <p>{flight.departure_time} → {flight.arrival_time}</p>
      <p>Class: {flight.class_type}</p>
      <p>Price: ${flight.base_price}</p>

      <button onClick={() => setOpen(true)}>Details</button>
      <button onClick={() => navigate(`/flights/book/${flight.id}`)}>Select</button>

      {open && <FlightDetailsModal flight={flight} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default FlightCard;