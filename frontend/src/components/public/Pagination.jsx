const Pagination = ({ setFilters }) => {
  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={() =>
          setFilters(prev => ({ ...prev, page: prev.page - 1 }))
        }
        className="px-4 py-2 border rounded hover:bg-gray-100"
      >
        Prev
      </button>
      <button
        onClick={() =>
          setFilters(prev => ({ ...prev, page: prev.page + 1 }))
        }
        className="px-4 py-2 border rounded hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
