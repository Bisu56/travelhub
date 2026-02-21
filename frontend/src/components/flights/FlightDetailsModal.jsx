const FlightDetailsModal = ({ flight, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{flight.airline} - {flight.flight_number}</h3>
        <p>From: {flight.from_location}</p>
        <p>To: {flight.to_location}</p>
        <p>Baggage: {flight.baggage_allowance} kg</p>
        <p>Available Seats: {flight.available_seats}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FlightDetailsModal;