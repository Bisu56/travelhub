import { useState } from "react";
import { FiMapPin, FiCalendar, FiUsers, FiHome, FiSearch } from "react-icons/fi";

const HotelSearchForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    location: "",
    check_in: "",
    check_out: "",
    guests: 2,
    rooms: 1,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(form.check_in) >= new Date(form.check_out)) {
      setError("Check-out must be after check-in");
      return;
    }

    if (form.guests < 1) {
      setError("At least 1 guest required");
      return;
    }

    onSearch(form);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-emerald-900/20">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">DESTINATION</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                name="location"
                placeholder="Where are you going?"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">CHECK-IN</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="date"
                name="check_in"
                value={form.check_in}
                onChange={handleChange}
                min={getMinDate()}
                required
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">CHECK-OUT</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="date"
                name="check_out"
                value={form.check_out}
                onChange={handleChange}
                min={form.check_in || getMinDate()}
                required
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">GUESTS</label>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="number"
                  name="guests"
                  min="1"
                  max="20"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="w-20">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">ROOMS</label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="number"
                  name="rooms"
                  min="1"
                  max="10"
                  value={form.rooms}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-500/30 flex items-center gap-2"
          >
            <FiSearch size={18} />
            Search Hotels
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelSearchForm;