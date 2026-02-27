import { useNavigate } from "react-router-dom";
import { FiHeart, FiUsers, FiSettings, FiDroplet, FiMapPin } from "react-icons/fi";

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const getVehicleTypeLabel = (type) => {
    const types = {
      MICRO: 'Micro', MINI: 'Mini', SEDAN: 'Sedan', SUV: 'SUV',
      LUXURY: 'Luxury', BIKE: 'Bike', SCOOTER: 'Scooter', BUS: 'Bus', VAN: 'Van', PICKUP: 'Pickup'
    };
    return types[type] || type;
  };

  return (
    <div 
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={vehicle.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80'}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
        >
          <FiHeart size={16} />
        </button>
        <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-semibold">
          {getVehicleTypeLabel(vehicle.vehicle_type)}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{vehicle.make} {vehicle.model}</h3>
            <p className="text-sm text-slate-500">{vehicle.year}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <span className="flex items-center gap-1">
            <FiUsers size={14} /> {vehicle.seating_capacity} seats
          </span>
          <span className="flex items-center gap-1">
            <FiSettings size={14} /> {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1">
            <FiDroplet size={14} /> {vehicle.fuel_type}
          </span>
        </div>

        {vehicle.location && (
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
            <FiMapPin size={12} /> {vehicle.location}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-indigo-600">${vehicle.daily_rate}</span>
            <span className="text-sm text-slate-500"> / day</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vehicles/${vehicle.id}`);
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-indigo-500/20"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
