import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiArrowLeft, FiStar, FiUsers, FiSettings, FiDroplet, FiMapPin, FiShield, FiCheck } from "react-icons/fi";
import { getVehicleDetails } from "../../services/vehicleService";
import RentalOptions from "../../components/vehicles/RentalOptions";

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehicleDetails(id)
      .then(res => setVehicle(res.data))
      .catch(() => setVehicle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-80 bg-slate-200 rounded-2xl mb-6" />
              <div className="h-8 bg-slate-200 rounded w-1/2 mb-4" />
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
            </div>
            <div>
              <div className="h-64 bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Vehicle not found</h2>
        <p className="text-slate-500">The vehicle you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
      >
        <FiArrowLeft size={18} /> Back to results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
            <img
              src={vehicle.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 px-4 py-1.5 bg-indigo-500 text-white rounded-full text-sm font-semibold">
              {vehicle.vehicle_type}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{vehicle.make} {vehicle.model}</h1>
                <p className="text-slate-500">{vehicle.year}</p>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <FiStar size={16} className="text-amber-500" fill="currentColor" />
                <span className="font-semibold text-slate-700">{vehicle.rating || '4.8'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <FiUsers className="text-indigo-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Seats</p>
                  <p className="font-semibold text-slate-800">{vehicle.seating_capacity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <FiSettings className="text-indigo-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Transmission</p>
                  <p className="font-semibold text-slate-800">{vehicle.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <FiDroplet className="text-indigo-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Fuel Type</p>
                  <p className="font-semibold text-slate-800">{vehicle.fuel_type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <FiMapPin className="text-indigo-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Mileage</p>
                  <p className="font-semibold text-slate-800">{vehicle.mileage_limit} km/day</p>
                </div>
              </div>
            </div>

            {vehicle.description && (
              <div className="mt-4">
                <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
                <p className="text-slate-600">{vehicle.description}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Vehicle Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Air Conditioning', 'Power Steering', 'Power Windows', 
                'Music System', 'Bluetooth', 'USB Charging', 
                'Safety Bags', 'GPS Navigation', 'Backup Camera'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600">
                  <FiCheck className="text-emerald-500" size={16} />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-indigo-600">${vehicle.daily_rate}</span>
                <span className="text-slate-500"> / day</span>
              </div>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Security Deposit</span>
                <span className="font-semibold text-slate-800">${vehicle.deposit_amount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Insurance</span>
                <span className="font-semibold text-slate-800">Included</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg mb-6">
              <FiShield className="text-emerald-600" size={18} />
              <span className="text-sm text-emerald-700">Full insurance coverage included</span>
            </div>

            <RentalOptions vehicle={vehicle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
