import { useState } from "react";
import { searchFlights } from "../../services/flightService";
import FlightResults from "../../components/flights/FlightResults";
import FlightSearchForm from "../../components/flights/FlightSearchForm";

const FlightSearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (values) => {
    setLoading(true);
    try {
      const res = await searchFlights(values);
      setFlights(res.data);
    } catch {
      alert("Search failed");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Search Flights</h2>
      <FlightSearchForm onSearch={handleSearch} />
      <FlightResults flights={flights} loading={loading} />
    </div>
  );
};

export default FlightSearchPage;