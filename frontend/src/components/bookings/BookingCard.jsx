import { useState } from "react";
import BookingDetailModal from "./BookingDetailModal";
import { cancelBooking } from "../../services/bookingService";

const BookingCard = ({ booking }) => {
  const [open, setOpen] = useState(false);

  const handleCancel = async () => {
    if (window.confirm("Are you sure to cancel?")) {
      await cancelBooking(booking.id);
      alert("Booking Cancelled");
    }
  };

  return (
    <div className="booking-card">
      <h4>{booking.service_type}</h4>
      <p>Total: ${booking.total_amount}</p>
      <span className={`status ${booking.status}`}>
        {booking.status}
      </span>

      <button onClick={() => setOpen(true)}>View</button>
      {booking.status === "PENDING" && (
        <button onClick={handleCancel}>Cancel</button>
      )}

      {open && (
        <BookingDetailModal booking={booking} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default BookingCard;