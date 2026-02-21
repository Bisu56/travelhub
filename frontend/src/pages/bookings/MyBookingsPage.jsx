import { useEffect, useState } from "react";
import { getUserBookings } from "../../services/bookingService";
import BookingCard from "../../components/bookings/BookingCard";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getUserBookings(userId).then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map(b => (
        <BookingCard key={b.id} booking={b} />
      ))}
    </div>
  );
};

export default MyBookingsPage;