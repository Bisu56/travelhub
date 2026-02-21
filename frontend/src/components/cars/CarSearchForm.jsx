import { useState } from "react";

const CarSearchForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    location: "",
    pickup_date: "",
    return_date: "",
    type: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(form.pickup_date) >= new Date(form.return_date)) {
      alert("Return date must be after pickup date");
      return;
    }

    onSearch(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="location" placeholder="Pickup Location" required onChange={handleChange} />
      <input type="date" name="pickup_date" required onChange={handleChange} />
      <input type="date" name="return_date" required onChange={handleChange} />

      <select name="type" onChange={handleChange}>
        <option value="">All Types</option>
        <option value="SEDAN">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="LUXURY">Luxury</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
};

export default CarSearchForm;