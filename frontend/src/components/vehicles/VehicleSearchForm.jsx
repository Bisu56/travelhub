import { useState } from "react";
import { FiMapPin, FiCalendar, FiSearch, FiGrid } from "react-icons/fi";

const vehicleTypes = [
  { value: "", label: "All Types" },
  { value: "MICRO", label: "Micro" },
  { value: "MINI", label: "Mini" },
  { value: "SEDAN", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "LUXURY", label: "Luxury" },
  { value: "BIKE", label: "Bike" },
  { value: "SCOOTER", label: "Scooter" },
  { value: "BUS", label: "Bus" },
  { value: "VAN", label: "Van" },
  { value: "PICKUP", label: "Pickup" },
];

const VehicleSearchForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    location: "",
    pickup_date: "",
    return_date: "",
    type: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(form.pickup_date) >= new Date(form.return_date)) {
      setError("Return date must be after pickup date");
      return;
    }

    onSearch(form);
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-indigo-900/20">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">PICKUP LOCATION</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                name="location"
                placeholder="City, airport, or address"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">PICKUP DATE</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="date"
                name="pickup_date"
                value={form.pickup_date}
                onChange={handleChange}
                min={getMinDate()}
                required
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">RETURN DATE</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="date"
                name="return_date"
                value={form.return_date}
                onChange={handleChange}
                min={form.pickup_date || getMinDate()}
                required
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">VEHICLE TYPE</label>
            <div className="relative">
              <FiGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
              >
                {vehicleTypes.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/30 flex items-center gap-2"
          >
            <FiSearch size={18} />
            Search Vehicles
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleSearchForm;
