const BookingDetailModal = ({ booking, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Booking Details</h3>
        <p>Type: {booking.service_type}</p>
        <p>Status: {booking.status}</p>
        <p>Total: ${booking.total_amount}</p>
        <p>Date: {booking.booking_date}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingDetailModal;