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
      <div className="bg-cyan-600 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Travel Packages</h1>
          <p className="text-cyan-100">Find your perfect getaway</p>
        </div>
      </div>
      
      <div className="flex container mx-auto px-4 py-6 gap-6">
        <FilterSideBar filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          <SearchBar setFilters={setFilters} />
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <>
              {packages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map(pkg => (
                    <PackageCard key={pkg.id} data={pkg} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-cyan-600 text-lg">No packages found</p>
                </div>
              )}
            </>
          )}
          <Pagination setFilters={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default Packages;
