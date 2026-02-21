import { useState } from "react";
import { bookVehicle } from "../../services/vehicleService";

const RentalOptions = ({ vehicle }) => {
  const [days, setDays] = useState(1);
  const [insurance, setInsurance] = useState(false);
  const [withDriver, setWithDriver] = useState(false);
  const [agree, setAgree] = useState(false);

  const insuranceCost = insurance ? 20 * days : 0;
  const baseCost = vehicle.daily_rate * days;
  const total = baseCost + insuranceCost;

  const handleBooking = async () => {
    if (!agree) {
      alert("You must agree to terms");
      return;
    }

    try {
      await bookVehicle({
        vehicleId: vehicle.id,
        days,
        insurance,
        withDriver,
        totalAmount: total
      });
      alert("Vehicle booked successfully!");
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h3>Rental Options</h3>

      <input
        type="number"
        min="1"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <label>
        <input type="checkbox" onChange={() => setInsurance(!insurance)} />
        Add Insurance ($20/day)
      </label>

      <label>
        <input type="checkbox" onChange={() => setWithDriver(!withDriver)} />
        With Driver
      </label>

      <label>
        <input type="checkbox" onChange={() => setAgree(!agree)} />
        I agree to Terms & Conditions
      </label>

      <h4>Price Breakdown</h4>
      <p>Base: ${baseCost}</p>
      <p>Insurance: ${insuranceCost}</p>
      <p>Total: ${total}</p>

      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default RentalOptions;
