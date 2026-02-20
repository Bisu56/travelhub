import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ setFilters }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
        className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-cyan-200 hover:border-cyan-500 hover:bg-cyan-50 text-cyan-700 rounded-xl transition-all font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronLeft size={18} />
        Previous
      </button>
      
      <span className="text-cyan-700 font-medium px-4">Page {1}</span>
      
      <button
        onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
        className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-cyan-500/30"
      >
        Next
        <FiChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
