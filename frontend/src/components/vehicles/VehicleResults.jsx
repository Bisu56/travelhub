import VehicleCard from "./VehicleCard";
import { FiSearch } from "react-icons/fi";

const VehicleResults = ({ vehicles, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
            <div className="h-48 bg-slate-200" />
            <div className="p-5">
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-3" />
              <div className="flex gap-4 mb-4">
                <div className="h-4 w-16 bg-slate-200 rounded" />
                <div className="h-4 w-16 bg-slate-200 rounded" />
                <div className="h-4 w-16 bg-slate-200 rounded" />
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <div className="h-8 w-20 bg-slate-200 rounded" />
                <div className="h-10 w-24 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiSearch size={32} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No vehicles found</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          We couldn't find any vehicles matching your criteria. Try adjusting your search dates or location.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleResults;
