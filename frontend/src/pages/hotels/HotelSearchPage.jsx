import { useState } from "react";
import HotelSearchForm from "../../components/hotels/HotelSearchForm";
import HotelResults from "../../components/hotels/HotelResults";
import { searchHotels } from "../../services/hotelService";

const HotelSearchPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (values) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await searchHotels(values);
      setHotels(res.data || []);
    } catch {
      setHotels([]);
    }
    setLoading(false);
  };

  return (
    <div className="-mx-4 -mt-4">
      <section className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Hotel</h1>
          <p className="text-emerald-100 mb-8">Search and compare prices from hundreds of booking sites</p>
          <HotelSearchForm onSearch={handleSearch} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {hasSearched ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              {loading ? 'Searching...' : `${hotels.length} hotels found`}
            </h2>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Enter your destination and dates to find available hotels</p>
          </div>
        )}
        <HotelResults hotels={hotels} loading={loading} />
      </section>
    </div>
  );
};

export default HotelSearchPage;