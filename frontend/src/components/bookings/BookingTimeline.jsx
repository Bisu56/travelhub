const BookingTimeline = ({ status }) => {
  return (
    <div>
      <p>🟢 PENDING</p>
      <p>🟡 CONFIRMED</p>
      <p>🔴 CANCELLED</p>
      <strong>Current: {status}</strong>
    </div>
  );
};

export default BookingTimeline;