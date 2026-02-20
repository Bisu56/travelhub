const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-cyan-100 h-full flex flex-col">
      <div className="h-52 bg-cyan-100"></div>
      <div className="p-5 space-y-4 flex-1">
        <div className="h-6 bg-cyan-100 rounded w-3/4"></div>
        <div className="h-4 bg-cyan-100 rounded w-full"></div>
        <div className="h-4 bg-cyan-100 rounded w-2/3"></div>
        <div className="mt-auto pt-4">
          <div className="h-10 bg-cyan-100 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
