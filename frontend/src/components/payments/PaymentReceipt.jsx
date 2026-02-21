const PaymentReceipt = () => {
  const bookingId = localStorage.getItem("lastBooking");

  return (
    <div>
      <h3>Receipt</h3>
      <p>Booking ID: {bookingId}</p>
      <p>Status: Confirmed</p>
      <button>Download Invoice</button>
    </div>
  );
};

export default PaymentReceipt;