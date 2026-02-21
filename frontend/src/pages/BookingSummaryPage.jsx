import { useState } from "react";
import { createBooking } from "../../services/bookingService";
import TravelerForm from "../../components/bookings/TravelerForm";
import ContactForm from "../../components/bookings/ContactForm";

const BookingSummaryPage = ({ serviceData }) => {
  const [travelers, setTravelers] = useState([]);
  const [contact, setContact] = useState({});
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSubmit = async () => {
    const bookingData = {
      service_id: serviceData.id,
      service_type: serviceData.type,
      total_amount: serviceData.total,
      travelers,
      contact,
      specialRequest
    };

    try {
      await createBooking(bookingData);
      alert("Booking Created Successfully!");
    } catch {
      alert("Booking Failed");
    }
  };

  return (
    <div>
      <h2>Booking Summary</h2>

      <h3>Service Details</h3>
      <p>Type: {serviceData.type}</p>
      <p>Total: ${serviceData.total}</p>

      <TravelerForm setTravelers={setTravelers} />
      <ContactForm setContact={setContact} />

      <textarea
        placeholder="Special Requests"
        onChange={(e) => setSpecialRequest(e.target.value)}
      />

      <p>
        Cancellation allowed within 24 hours for full refund.
        After that partial charges may apply.
      </p>

      <button onClick={handleSubmit}>Confirm Booking</button>
    </div>
  );
};

export default BookingSummaryPage;