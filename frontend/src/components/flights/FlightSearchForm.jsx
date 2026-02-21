import { useState } from "react";

const FlightSearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    classType: "ECONOMY",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flight-search-form">
      <div className="form-row">
        <div className="form-group">
          <label>From</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="City or airport"
            required
          />
        </div>
        <div className="form-group">
          <label>To</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="City or airport"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Departure Date</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Return Date</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Passengers</label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Class</label>
          <select name="classType" value={formData.classType} onChange={handleChange}>
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First Class</option>
          </select>
        </div>
      </div>
      <button type="submit" className="search-btn">Search Flights</button>
    </form>
  );
};

export default FlightSearchForm;
