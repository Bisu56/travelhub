import { useEffect, useState } from "react";
import FilterSideBar from "../../components/public/FilterSideBar";
import PackageCard from "../../components/public/PackageCard";
import SearchBar from "../../components/public/SearchBar";
import Pagination from "../../components/public/Pagination";
import SkeletonCard from "../../components/public/SkeletonCard";
import { getPackages } from "../../services/publicService";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filters, setFilters] = useState({
    destination: [],
    minPrice: "",
    maxPrice: "",
    duration: "",
    search: "",
    sort: "",
    page: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPackages(filters)
      .then(res => setPackages(res.data.content || res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Travel Packages</h1>
          <p className="text-cyan-100 text-lg">Find your perfect getaway from our curated selection</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <FilterSideBar filters={filters} setFilters={setFilters} />
          </div>
          
          {/* Results */}
          <div className="flex-1">
            <SearchBar setFilters={setFilters} />
            
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-cyan-700 font-medium">
                {loading ? 'Loading...' : `${packages.length} packages found`}
              </p>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
                className="border-2 border-cyan-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="">Sort by: Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Package Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {packages.map(pkg => (
                  <PackageCard key={pkg.id} data={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <p className="text-cyan-600 text-lg">No packages found</p>
                <p className="text-cyan-400 text-sm mt-1">Try adjusting your filters</p>
              </div>
            )}
            
            {/* Pagination */}
            {packages.length > 0 && (
              <Pagination setFilters={setFilters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
