import { useNavigate } from "react-router-dom";

const PackageCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-cyan-100"
      onClick={() => navigate(`/packages/${data.id}`)}
    >
      <div className="relative">
        <img
          src={data.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={data.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-lime-500 text-cyan-900 font-bold px-3 py-1 rounded-full text-sm">
          ${data.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-cyan-900 truncate">{data.title}</h3>
        <p className="text-cyan-600 text-sm mt-1">{data.duration} days</p>
        <button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
