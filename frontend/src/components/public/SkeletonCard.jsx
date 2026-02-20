const SkeletonCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden animate-pulse border border-cyan-100">
      <div className="h-48 bg-cyan-100"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-cyan-100 rounded w-3/4"></div>
        <div className="h-4 bg-cyan-100 rounded w-1/2"></div>
        <div className="h-10 bg-cyan-100 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
