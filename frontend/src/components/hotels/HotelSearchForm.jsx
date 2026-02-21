import { useState } from "react";

const HotelSearchForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    location: "",
    check_in: "",
    check_out: "",
    guests: 1,
    rooms: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(form.check_in) >= new Date(form.check_out)) {
      alert("Check-out must be after check-in");
      return;
    }

    if (form.guests < 1) {
      alert("At least 1 guest required");
      return;
    }

    onSearch(form);
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-form">
      <input name="location" placeholder="Location" required onChange={handleChange} />
      <input type="date" name="check_in" required onChange={handleChange} />
      <input type="date" name="check_out" required onChange={handleChange} />
      <input type="number" name="guests" min="1" onChange={handleChange} />
      <input type="number" name="rooms" min="1" onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default HotelSearchForm;