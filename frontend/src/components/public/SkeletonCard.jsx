const SkeletonCard = () => {
  return (
    <div className="bg-white shadow rounded animate-pulse">
      <div className="h-48 bg-gray-300 rounded-t"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
