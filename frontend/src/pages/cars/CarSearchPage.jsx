import { useState } from "react";
import CarSearchForm from "../../components/cars/CarSearchForm";
import CarResults from "../../components/cars/CarResults";
import { searchCars } from "../../services/carService";

const CarSearchPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (values) => {
    setLoading(true);
    try {
      const res = await searchCars(values);
      setCars(res.data);
    } catch {
      alert("Search failed");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Rent a Car</h2>
      <CarSearchForm onSearch={handleSearch} />
      <CarResults cars={cars} loading={loading} />
    </div>
  );
};

export default CarSearchPage;