import { useState } from "react";
import VehicleSearchForm from "../../components/vehicles/VehicleSearchForm";
import VehicleResults from "../../components/vehicles/VehicleResults";
import { searchVehicles } from "../../services/vehicleService";

const VehicleSearchPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (values) => {
    setLoading(true);
    try {
      const res = await searchVehicles(values);
      setVehicles(res.data);
    } catch {
      alert("Search failed");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Rent a Vehicle</h2>
      <VehicleSearchForm onSearch={handleSearch} />
      <VehicleResults vehicles={vehicles} loading={loading} />
    </div>
  );
};

export default VehicleSearchPage;
