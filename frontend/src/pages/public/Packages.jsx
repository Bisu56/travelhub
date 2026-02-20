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
      .then(res => setPackages(res.data.content))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="flex">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1 p-6">
        <SearchBar setFilters={setFilters} />
        {loading ? (
          <SkeletonCard />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {packages.map(pkg => (
              <PackageCard key={pkg.id} data={pkg} />
            ))}
          </div>
        )}
        <Pagination setFilters={setFilters} />
      </div>
    </div>
  );
};

export default Packages;
