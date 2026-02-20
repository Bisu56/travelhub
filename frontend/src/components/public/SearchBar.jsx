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
    <input
      type="text"
      placeholder="Search packages..."
      className="border p-2 w-full mb-4 rounded"
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default SearchBar;
