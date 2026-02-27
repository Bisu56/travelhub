import { useNavigate } from "react-router-dom";
import { FiMapPin, FiStar, FiHeart } from "react-icons/fi";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/hotels/${hotel.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
        >
          <FiHeart size={16} />
        </button>
        {hotel.is_featured && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">{hotel.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
              <FiMapPin size={13} /> {hotel.location}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
            <FiStar size={13} className="text-amber-500" fill="currentColor" />
            <span className="text-sm font-semibold text-slate-700">{hotel.star_rating}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          {hotel.review_count ? `${hotel.review_count} reviews` : 'No reviews yet'}
        </p>
        {hotel.amenities?.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md text-xs font-medium">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md text-xs font-medium">
                +{hotel.amenities.length - 4}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-emerald-600">
              ${hotel.price_per_night || hotel.lowest_price || '--'}
            </span>
            <span className="text-sm text-slate-500"> / night</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/hotels/${hotel.id}`);
            }}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-emerald-500/20"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;