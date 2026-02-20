import { useState } from "react";

const Pagination = ({ setFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1">Page {currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
