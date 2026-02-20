import { FiDollarSign, FiCalendar, FiFilter } from "react-icons/fi";

const FilterSideBar = ({ filters, setFilters }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24 border border-cyan-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
          <FiFilter className="text-cyan-600" size={20} />
        </div>
        <h3 className="font-bold text-cyan-900 text-lg">Filters</h3>
      </div>
      
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-cyan-700 mb-3">
            <FiDollarSign size={16} />
            Price Range
          </label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-cyan-500 mb-1 block">Min Price ($)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })}
                className="w-full border-2 border-cyan-100 rounded-lg px-3 py-2.5 text-sm focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-500 mb-1 block">Max Price ($)</label>
              <input
                type="number"
                placeholder="10000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
                className="w-full border-2 border-cyan-100 rounded-lg px-3 py-2.5 text-sm focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <hr className="border-cyan-100" />

        {/* Duration */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-cyan-700 mb-3">
            <FiCalendar size={16} />
            Duration
          </label>
          <select
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value, page: 1 })}
            className="w-full border-2 border-cyan-100 rounded-lg px-3 py-2.5 text-sm focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 outline-none transition-all bg-white"
          >
            <option value="">Any Duration</option>
            <option value="3">3 days</option>
            <option value="5">5 days</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
          </select>
        </div>

        <hr className="border-cyan-100" />

        {/* Sort By */}
        <div>
          <label className="text-sm font-semibold text-cyan-700 mb-3 block">Sort By</label>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
            className="w-full border-2 border-cyan-100 rounded-lg px-3 py-2.5 text-sm focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 outline-none transition-all bg-white"
          >
            <option value="">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Button */}
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
          className="w-full bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-semibold py-2.5 rounded-lg transition-colors text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSideBar;
