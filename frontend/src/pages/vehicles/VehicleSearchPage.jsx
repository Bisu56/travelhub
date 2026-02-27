import { useState } from "react";
import VehicleSearchForm from "../../components/vehicles/VehicleSearchForm";
import VehicleResults from "../../components/vehicles/VehicleResults";
import { searchVehicles } from "../../services/vehicleService";

const VehicleSearchPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (values) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await searchVehicles(values);
      setVehicles(res.data || []);
    } catch {
      setVehicles([]);
    }
    setLoading(false);
  };

  return (
    <div className="-mx-4 -mt-4">
      <section className="bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Rent a Vehicle</h1>
          <p className="text-blue-100 mb-8">Find the perfect ride for your journey</p>
          <VehicleSearchForm onSearch={handleSearch} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {hasSearched ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              {loading ? 'Searching...' : `${vehicles.length} vehicles found`}
            </h2>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Enter your pickup location and dates to find available vehicles</p>
          </div>
        )}
        <VehicleResults vehicles={vehicles} loading={loading} />
      </section>
    </div>
  );
};

export default VehicleSearchPage;
