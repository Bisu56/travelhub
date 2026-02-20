import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ setFilters }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value, page: 1 }));
    }, 500);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <div className="relative mb-6">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
        <FiSearch size={20} />
      </div>
      <input
        type="text"
        placeholder="Search packages by name, destination..."
        className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-cyan-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 rounded-xl outline-none transition-all bg-white shadow-sm"
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
