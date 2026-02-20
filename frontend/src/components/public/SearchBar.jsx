import { useState, useEffect } from "react";

const SearchBar = ({ setFilters }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value, page: 1 }));
    }, 500);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search packages..."
        className="w-full border-2 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl px-4 py-3 outline-none transition-all"
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
