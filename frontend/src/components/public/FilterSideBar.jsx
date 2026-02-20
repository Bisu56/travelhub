const FilterSideBar = ({ filters, setFilters }) => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-xl p-5 h-fit border border-cyan-100">
      <h3 className="font-bold text-cyan-900 text-lg mb-4">Filters</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-cyan-700 mb-1">Min Price ($)</label>
        <input
          type="number"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })}
          className="w-full border-2 border-cyan-200 rounded-lg px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-cyan-700 mb-1">Max Price ($)</label>
        <input
          type="number"
          placeholder="10000"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
          className="w-full border-2 border-cyan-200 rounded-lg px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-cyan-700 mb-1">Duration</label>
        <select
          value={filters.duration}
          onChange={(e) => setFilters({ ...filters, duration: e.target.value, page: 1 })}
          className="w-full border-2 border-cyan-200 rounded-lg px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
        >
          <option value="">Any Duration</option>
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
          <option value="14">14 days</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-cyan-700 mb-1">Sort By</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
          className="w-full border-2 border-cyan-200 rounded-lg px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <button
        onClick={() => setFilters({
          destination: [],
          minPrice: "",
          maxPrice: "",
          duration: "",
          search: "",
          sort: "",
          page: 1,
        })}
        className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-semibold py-2 rounded-lg transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSideBar;
