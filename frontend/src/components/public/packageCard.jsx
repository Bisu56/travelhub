import { useNavigate } from "react-router-dom";

const PackageCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-cyan-100 flex flex-col h-full"
      onClick={() => navigate(`/packages/${data.id}`)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={data.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={data.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-lime-500 text-cyan-900 font-bold px-4 py-1.5 rounded-full text-sm shadow-md">
          ${data.price}
        </div>
        {data.duration && (
          <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <span>📅</span> {data.duration} days
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-cyan-900 mb-2 line-clamp-1">{data.title}</h3>
        <p className="text-cyan-600 text-sm mb-4 line-clamp-2 flex-1">{data.description}</p>
        <button className="w-full mt-auto bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
