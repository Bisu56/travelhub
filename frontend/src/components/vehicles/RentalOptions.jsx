import { useState } from "react";
import { FiCalendar, FiShield, FiUser, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import { bookVehicle } from "../../services/vehicleService";

const RentalOptions = ({ vehicle }) => {
  const [days, setDays] = useState(1);
  const [insurance, setInsurance] = useState(true);
  const [withDriver, setWithDriver] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const insuranceCost = insurance ? 15 * days : 0;
  const driverCost = withDriver ? 25 * days : 0;
  const baseCost = vehicle.daily_rate * days;
  const total = baseCost + insuranceCost + driverCost;

  const handleBooking = async () => {
    if (!agree) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      await bookVehicle({
        vehicleId: vehicle.id,
        days,
        insurance,
        withDriver,
        totalAmount: total
      });
      toast.success("Vehicle booked successfully!");
    } catch {
      toast.error("Booking failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-2">RENTAL DURATION</label>
        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
          >
            {[...Array(30)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'day' : 'days'}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
          insurance ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              insurance ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
            }`}>
              {insurance && <FiCheck className="text-white" size={12} />}
            </div>
            <div>
              <p className="font-medium text-slate-800">Basic Insurance</p>
              <p className="text-xs text-slate-500">$15/day • Full coverage</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={insurance}
            onChange={(e) => setInsurance(e.target.checked)}
            className="sr-only"
          />
        </label>

        <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
          withDriver ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              withDriver ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
            }`}>
              {withDriver && <FiCheck className="text-white" size={12} />}
            </div>
            <div>
              <p className="font-medium text-slate-800">With Professional Driver</p>
              <p className="text-xs text-slate-500">$25/day • Skip the driving</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={withDriver}
            onChange={(e) => setWithDriver(e.target.checked)}
            className="sr-only"
          />
        </label>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">${vehicle.daily_rate} × {days} days</span>
          <span className="text-slate-800">${baseCost}</span>
        </div>
        {insurance && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Insurance</span>
            <span className="text-slate-800">${insuranceCost}</span>
          </div>
        )}
        {withDriver && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Driver</span>
            <span className="text-slate-800">${driverCost}</span>
          </div>
        )}
        <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
          <span className="font-semibold text-slate-800">Total</span>
          <span className="font-bold text-indigo-600">${total}</span>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
          agree ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
        }`}>
          {agree && <FiCheck className="text-white" size={12} />}
        </div>
        <input 
          type="checkbox" 
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="sr-only"
        />
        <span className="text-sm text-slate-600">
          I agree to the <span className="text-indigo-600 underline">Terms & Conditions</span> and <span className="text-indigo-600 underline">Rental Policy</span>
        </span>
      </label>

      <button
        onClick={handleBooking}
        disabled={loading || !agree}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
      >
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </div>
  );
};

export default RentalOptions;
