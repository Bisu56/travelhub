import { useState } from "react";
import HotelSearchForm from "../../components/hotels/HotelSearchForm";
import HotelResults from "../../components/hotels/HotelResults";
import { searchHotels } from "../../services/hotelService";

const HotelSearchPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (values) => {
    setLoading(true);
    try {
      const res = await searchHotels(values);
      setHotels(res.data);
    } catch {
      alert("Search failed");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Search Hotels</h2>
      <HotelSearchForm onSearch={handleSearch} />
      <HotelResults hotels={hotels} loading={loading} />
    </div>
  );
};

export default HotelSearchPage;