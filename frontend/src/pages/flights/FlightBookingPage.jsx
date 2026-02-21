import { useState } from "react";
import { useParams } from "react-router-dom";
import { bookFlight } from "../../services/flightService";

const FlightBookingPage = () => {
  const { id } = useParams();
  const [passengers, setPassengers] = useState([
    { name: "", age: "", type: "ADULT" },
  ]);

  const handleChange = (index, e) => {
    const updated = [...passengers];
    updated[index][e.target.name] = e.target.value;
    setPassengers(updated);
  };

  const handleSubmit = async () => {
    try {
      await bookFlight({
        flightId: id,
        passengers,
      });
      alert("Flight booked successfully!");
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Passenger Details</h2>

      {passengers.map((p, index) => (
        <div key={index}>
          <input name="name" placeholder="Full Name" onChange={(e) => handleChange(index, e)} />
          <input name="age" type="number" placeholder="Age" onChange={(e) => handleChange(index, e)} />

          <select name="type" onChange={(e) => handleChange(index, e)}>
            <option value="ADULT">Adult</option>
            <option value="CHILD">Child</option>
            <option value="INFANT">Infant</option>
          </select>
        </div>
      ))}

      <button onClick={handleSubmit}>Confirm Booking</button>
    </div>
  );
};

export default FlightBookingPage;