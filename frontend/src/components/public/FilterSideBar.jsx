const FilterSideBar = ({ filters, setFilters }) => {
  return (
    <div className="w-64 p-4 bg-white shadow h-screen">
      <h3 className="font-bold mb-4">Filters</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Min Price</label>
        <input
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Max Price</label>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Duration (days)</label>
        <select
          value={filters.duration}
          onChange={(e) => setFilters({ ...filters, duration: e.target.value, page: 1 })}
          className="border p-2 w-full rounded"
        >
          <option value="">Any</option>
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
          <option value="14">14 days</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
          className="border p-2 w-full rounded"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSideBar;
