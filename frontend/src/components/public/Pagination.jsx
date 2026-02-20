const Pagination = ({ setFilters, totalPages }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-cyan-700 font-medium">Page </span>
      <button
        onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
