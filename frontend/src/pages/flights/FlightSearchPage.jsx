import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  Search, 
  Calendar,
  Users,
  ChevronDown,
  Check,
  Sun,
  Moon,
  Sunset,
  Clock,
  ArrowRight,
  ArrowLeftRight,
  X,
  Filter,
  Loader2,
  Briefcase,
  Wifi,
  Coffee,
  Utensils,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_FLIGHTS = [
  {
    id: 1,
    airline: 'Nepal Airlines',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nepal_Airlines_logo.svg/300px-Nepal_Airlines_logo.svg.png',
    from: 'KTM',
    to: 'DXB',
    departureTime: '08:30',
    arrivalTime: '11:45',
    duration: '5h 15m',
    stops: 'DIRECT',
    price: 450,
    originalPrice: 520,
    amenities: ['wifi', 'meal'],
    class: 'Economy',
  },
  {
    id: 2,
    airline: 'flydubai',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Flydubai_Logo.svg/300px-Flydubai_Logo.svg.png',
    from: 'KTM',
    to: 'DXB',
    departureTime: '14:20',
    arrivalTime: '17:35',
    duration: '5h 15m',
    stops: 'DIRECT',
    price: 485,
    originalPrice: null,
    amenities: ['wifi', 'meal', 'entertainment'],
    class: 'Economy',
  },
  {
    id: 3,
    airline: 'Emirates',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/300px-Emirates_logo.svg.png',
    from: 'KTM',
    to: 'DXB',
    departureTime: '19:00',
    arrivalTime: '22:15',
    duration: '5h 15m',
    stops: 'DIRECT',
    price: 620,
    originalPrice: 750,
    amenities: ['wifi', 'meal', 'entertainment', 'lounge'],
    class: 'Business',
  },
  {
    id: 4,
    airline: 'Air Arabia',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Air_Arabia_Logo.svg/300px-Air_Arabia_Logo.svg.png',
    from: 'KTM',
    to: 'DXB',
    departureTime: '23:30',
    arrivalTime: '04:45+1',
    duration: '5h 15m',
    stops: '1 STOP',
    price: 380,
    originalPrice: null,
    amenities: ['meal'],
    class: 'Economy',
  },
  {
    id: 5,
    airline: 'Nepal Airlines',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nepal_Airlines_logo.svg/300px-Nepal_Airlines_logo.svg.png',
    from: 'KTM',
    to: 'DXB',
    departureTime: '06:15',
    arrivalTime: '09:30',
    duration: '5h 15m',
    stops: 'DIRECT',
    price: 520,
    originalPrice: null,
    amenities: ['wifi', 'meal'],
    class: 'Business',
  },
];

const SearchSection = ({ onSearch }) => {
  const [tripType, setTripType] = useState('round-trip');
  const [from, setFrom] = useState('Kathmandu (KTM)');
  const [to, setTo] = useState('Dubai (DXB)');
  const [departureDate, setDepartureDate] = useState('2024-10-24');
  const [returnDate, setReturnDate] = useState('2024-10-31');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState('Economy');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
    onSearch?.({ from, to, departureDate, returnDate, passengers, travelClass });
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <section className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl shadow-cyan-900/20 p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {['round-trip', 'one-way', 'multi-city'].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tripType === type 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">From</label>
                <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl p-3 pt-6 hover:border-cyan-400 transition-colors focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100">
                  <Plane className="text-cyan-600" size={18} />
                  <input 
                    type="text" 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="bg-transparent w-full font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden sm:flex">
                <button 
                  onClick={handleSwap}
                  className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 hover:border-cyan-600 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                >
                  <ArrowLeftRight className="text-cyan-600" size={14} />
                </button>
              </div>

              <div className="sm:hidden flex justify-center -my-2 relative z-10">
                <button 
                  onClick={handleSwap}
                  className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm"
                >
                  <ArrowLeftRight className="text-cyan-600 rotate-90" size={14} />
                </button>
              </div>

              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">To</label>
                <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl p-3 pt-6 hover:border-cyan-400 transition-colors focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100">
                  <Plane className="text-cyan-600 rotate-90" size={18} />
                  <input 
                    type="text" 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="bg-transparent w-full font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">Departure</label>
              <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl p-3 pt-6 hover:border-cyan-400 transition-colors focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100">
                <Calendar className="text-cyan-600" size={18} />
                <input 
                  type="date" 
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent w-full font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-3 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">Travelers & Class</label>
              <div 
                className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl p-3 pt-6 hover:border-cyan-400 transition-colors cursor-pointer"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
              >
                <Users className="text-cyan-600" size={18} />
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 line-clamp-1">{totalPassengers} Traveler{totalPassengers > 1 ? 's' : ''}, {travelClass}</div>
                </div>
                <ChevronDown size={16} className="text-slate-400" />
              </div>

              <AnimatePresence>
                {showPassengerDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-800">Adults</div>
                          <div className="text-xs text-slate-500">12+ years</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPassengers({...passengers, adults: Math.max(1, passengers.adults - 1)}); }}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{passengers.adults}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPassengers({...passengers, adults: passengers.adults + 1}); }}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-800">Children</div>
                          <div className="text-xs text-slate-500">2-11 years</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPassengers({...passengers, children: Math.max(0, passengers.children - 1)}); }}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{passengers.children}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPassengers({...passengers, children: passengers.children + 1}); }}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-800">Infants</div>
                          <div className="text-xs text-slate-500">Under 2</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPassengers({...passengers, infants: Math.max(0, passengers.infants - 1)}); }}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{passengers.infants}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPassengers({...passengers, infants: passengers.infants + 1}); }}
                            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <label className="text-xs font-medium text-slate-500 mb-2 block">Class</label>
                        <div className="flex gap-2">
                          {['Economy', 'Business', 'First'].map((cls) => (
                            <button
                              key={cls}
                              onClick={(e) => { e.stopPropagation(); setTravelClass(cls); }}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                travelClass === cls 
                                  ? 'bg-cyan-600 text-white' 
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {cls}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowPassengerDropdown(false); }}
                        className="w-full py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/40"
            >
              {isSearching ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Search size={20} />
              )}
              {isSearching ? 'Searching...' : 'Search Flights'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FilterSidebar = ({ 
  priceRange, 
  setPriceRange, 
  selectedAirlines, 
  setSelectedAirlines,
  selectedStops,
  setSelectedStops,
  selectedTime,
  setSelectedTime,
  resetFilters,
  isOpen,
  onClose,
  activeFilterCount
}) => {
  const airlines = ['Nepal Airlines', 'flydubai', 'Emirates', 'Air Arabia'];
  const stops = [
    { label: 'Any', value: 'any' },
    { label: 'Non-stop', value: 'non-stop' },
    { label: '1 Stop', value: '1-stop' },
    { label: '2+ Stops', value: '2-stops' }
  ];
  const times = [
    { label: 'Morning', range: '06:00-12:00', icon: <Sun size={16} /> },
    { label: 'Afternoon', range: '12:00-18:00', icon: <Sunset size={16} /> },
    { label: 'Evening', range: '18:00-00:00', icon: <Moon size={16} /> },
    { label: 'Night', range: '00:00-06:00', icon: <Clock size={16} /> }
  ];

  const toggleAirline = (airline) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50 w-[85%] sm:w-80 md:w-64 bg-white md:bg-transparent shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 md:p-0 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 md:hidden border-b pb-4 -mx-6 px-6">
            <div className="flex items-center gap-2">
              <Filter className="text-cyan-600" size={20} />
              <h2 className="text-lg font-bold">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-6 hidden md:flex">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button 
                onClick={resetFilters} 
                className="text-cyan-600 text-xs font-bold hover:underline"
              >
                Reset
              </button>
            </div>

            <button 
              onClick={resetFilters} 
              className="text-cyan-600 text-sm font-medium hover:underline mb-6 md:hidden"
            >
              Reset all filters
            </button>

            <div className="space-y-6 pb-6">
              <div className="bg-white md:bg-white/50 rounded-2xl border border-slate-200 p-4 space-y-4">
                <h3 className="font-bold text-sm text-slate-800 flex items-center justify-between">
                  Price Range
                  <span className="text-cyan-600 text-xs font-bold">Up to ${priceRange}</span>
                </h3>
                <input 
                  type="range" 
                  min="300" 
                  max="2500" 
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>$300</span>
                  <span>$2,500+</span>
                </div>
              </div>

              <div className="bg-white md:bg-white/50 rounded-2xl border border-slate-200 p-4 space-y-4">
                <h3 className="font-bold text-sm text-slate-800">Airlines</h3>
                <div className="space-y-2">
                  {airlines.map((airline) => (
                    <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => toggleAirline(airline)}
                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          selectedAirlines.includes(airline) 
                            ? 'bg-cyan-600 border-cyan-600 text-white' 
                            : 'border-slate-200 group-hover:border-cyan-400'
                        }`}
                      >
                        {selectedAirlines.includes(airline) && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        selectedAirlines.includes(airline) ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {airline}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white md:bg-white/50 rounded-2xl border border-slate-200 p-4 space-y-4">
                <h3 className="font-bold text-sm text-slate-800">Stops</h3>
                <div className="flex flex-wrap gap-2">
                  {stops.map((stop) => (
                    <button 
                      key={stop.value}
                      onClick={() => setSelectedStops(stop.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                        selectedStops === stop.value 
                          ? 'bg-cyan-600 border-cyan-600 text-white shadow-md' 
                          : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {stop.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white md:bg-white/50 rounded-2xl border border-slate-200 p-4 space-y-4">
                <h3 className="font-bold text-sm text-slate-800">Departure</h3>
                <div className="grid grid-cols-2 gap-2">
                  {times.map((time) => (
                    <button
                      key={time.label}
                      onClick={() => setSelectedTime(time.label)}
                      className={`p-2 rounded-xl border-2 text-left transition-all ${
                        selectedTime === time.label 
                          ? 'border-cyan-600 bg-cyan-50/50' 
                          : 'border-slate-100 hover:border-cyan-200'
                      }`}
                    >
                      <div className={`mb-1 ${selectedTime === time.label ? 'text-cyan-600' : 'text-slate-400'}`}>
                        {time.icon}
                      </div>
                      <div className="text-[10px] font-bold uppercase text-slate-400 leading-tight truncate">{time.label}</div>
                      <div className="text-[11px] font-bold text-slate-700">{time.range}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t md:hidden">
            <button 
              onClick={onClose}
              className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-cyan-600/20 active:scale-[0.98] transition-transform"
            >
              Show Results
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const FlightCard = ({ flight, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'wifi': return <Wifi key="wifi" size={14} title="WiFi" />;
      case 'meal': return <Utensils key="meal" size={14} title="Meal" />;
      case 'entertainment': return <Briefcase key="entertainment" size={14} title="Entertainment" />;
      case 'lounge': return <Coffee key="lounge" size={14} title="Lounge" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
    >
      <div 
        className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Mobile Header: Logo and Price */}
        <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 md:w-28 border-b md:border-b-0 pb-3 md:pb-0 border-slate-100">
          <div className="flex items-center md:flex-col gap-3 md:gap-2">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl border border-slate-100 flex items-center justify-center p-1.5 md:p-2 bg-white">
              <img src={flight.airlineLogo} alt={flight.airline} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <div className="text-xs md:text-sm font-bold text-slate-800">{flight.airline}</div>
              <div className="text-[10px] text-slate-400">{flight.class}</div>
            </div>
          </div>
          
          <div className="md:hidden flex flex-col items-end">
            <div className="text-2xl font-bold text-slate-900">${flight.price}</div>
            {flight.originalPrice && (
              <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 rounded">
                {Math.round((1 - flight.price / flight.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Flight Times and Path */}
        <div className="flex-1 flex items-center justify-between gap-4 py-2">
          <div className="flex-1 flex items-center justify-between max-w-sm mx-auto md:max-w-none w-full">
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-bold text-slate-800">{flight.departureTime}</div>
              <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-tight">{flight.from}</div>
            </div>

            <div className="flex-1 px-4 md:px-8 flex flex-col items-center min-w-[80px]">
              <div className="text-[10px] font-medium text-slate-400 mb-1">{flight.duration}</div>
              <div className="w-full h-px bg-slate-200 relative flex items-center justify-center">
                <div className="absolute w-1.5 h-1.5 rounded-full bg-slate-300 -left-0.5" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-slate-300 -right-0.5" />
                <Plane size={12} className="text-cyan-600 bg-white px-0.5 z-10" />
              </div>
              <div className={`mt-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${
                flight.stops === 'DIRECT' ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {flight.stops}
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-xl md:text-2xl font-bold text-slate-800">{flight.arrivalTime}</div>
              <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-tight">{flight.to}</div>
            </div>
          </div>
        </div>

        {/* Desktop Price Section */}
        <div className="hidden md:flex flex-col items-end gap-1 min-w-[120px] border-l border-slate-100 pl-6">
          {flight.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 line-through">${flight.originalPrice}</span>
              <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                {Math.round((1 - flight.price / flight.originalPrice) * 100)}% OFF
              </span>
            </div>
          )}
          <div className="text-3xl font-bold text-slate-900">${flight.price}</div>
          <div className="text-[10px] text-slate-400">per person</div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 bg-slate-50"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-sm font-medium text-slate-500">Amenities:</span>
                <div className="flex gap-3">
                  {flight.amenities?.map(amenity => (
                    <span key={amenity} className="text-slate-400" title={amenity}>
                      {getAmenityIcon(amenity)}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(flight);
                }}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Select Flight
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PromoBanner = () => (
  <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl p-8 relative overflow-hidden">
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-white mb-2">Save 15% with TravelHub Plus</h3>
      <p className="text-cyan-100 text-sm mb-4">Unlock exclusive deals and complimentary seat selection.</p>
      <button className="bg-white text-cyan-600 hover:bg-cyan-50 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors">
        Join Now
      </button>
    </div>
    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/10 skew-x-12 transform translate-x-8" />
    <div className="absolute right-20 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-white/20" />
  </div>
);

const ActiveFilters = ({ 
  priceRange, 
  selectedAirlines, 
  selectedStops, 
  selectedTime,
  setPriceRange,
  setSelectedAirlines,
  setSelectedStops,
  setSelectedTime 
}) => {
  const filters = [];

  if (priceRange < 2500) {
    filters.push({ 
      label: `Up to $${priceRange}`, 
      onRemove: () => setPriceRange(2500) 
    });
  }

  selectedAirlines.forEach(airline => {
    filters.push({
      label: airline,
      onRemove: () => setSelectedAirlines(selectedAirlines.filter(a => a !== airline))
    });
  });

  if (selectedStops !== 'any') {
    filters.push({
      label: selectedStops === 'non-stop' ? 'Non-stop' : '1 Stop',
      onRemove: () => setSelectedStops('any')
    });
  }

  if (selectedTime !== 'Any') {
    filters.push({
      label: selectedTime,
      onRemove: () => setSelectedTime('Any')
    });
  }

  if (filters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex-shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:block">Active:</div>
      <div className="flex flex-nowrap gap-2">
        {filters.map((filter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-cyan-50 border border-cyan-100 rounded-full px-3 py-1.5 whitespace-nowrap"
          >
            <span className="text-xs font-bold text-cyan-700">{filter.label}</span>
            <button 
              onClick={filter.onRemove}
              className="text-cyan-400 hover:text-cyan-700 transition-colors"
            >
              <X size={12} strokeWidth={3} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function FlightSearchPage() {
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedAirlines, setSelectedAirlines] = useState(['Nepal Airlines', 'flydubai', 'Emirates']);
  const [selectedStops, setSelectedStops] = useState('any');
  const [selectedTime, setSelectedTime] = useState('Any');
  const [sortBy, setSortBy] = useState('cheapest');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const activeFilterCount = [
    priceRange < 2500,
    selectedAirlines.length > 0,
    selectedStops !== 'any',
    selectedTime !== 'Any'
  ].filter(Boolean).length;

  const filteredFlights = useMemo(() => {
    let flights = MOCK_FLIGHTS.filter(flight => {
      const matchesPrice = flight.price <= priceRange;
      const matchesAirline = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline);
      const matchesStops = selectedStops === 'any' || 
                           (selectedStops === 'non-stop' && flight.stops === 'DIRECT') ||
                           (selectedStops === '1-stop' && flight.stops.includes('1 STOP'));
      
      return matchesPrice && matchesAirline && matchesStops;
    });

    switch(sortBy) {
      case 'cheapest':
        flights.sort((a, b) => a.price - b.price);
        break;
      case 'fastest':
        flights.sort((a, b) => a.duration.localeCompare(b.duration));
        break;
      case 'departure':
        flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      default:
        break;
    }

    return flights;
  }, [priceRange, selectedAirlines, selectedStops, sortBy]);

  const resetFilters = () => {
    setPriceRange(2500);
    setSelectedAirlines([]);
    setSelectedStops('any');
    setSelectedTime('Any');
  };

  const handleSearch = (searchParams) => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  const handleSelectFlight = (flight) => {
    console.log('Selected flight:', flight);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SearchSection onSearch={handleSearch} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar 
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
            selectedStops={selectedStops}
            setSelectedStops={setSelectedStops}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            resetFilters={resetFilters}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            activeFilterCount={activeFilterCount}
          />

          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                    KTM <ArrowRight size={18} className="text-cyan-600" /> DXB
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    {filteredFlights.length} flights found
                    <span className="mx-2 text-slate-300">•</span>
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 md:hidden overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                  <button 
                    onClick={() => setShowFilters(true)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-100 rounded-full text-xs font-bold text-slate-700 shadow-sm active:scale-95 transition-all"
                  >
                    <Filter size={14} className="text-cyan-600" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 bg-cyan-600 text-white rounded-full flex items-center justify-center text-[10px]">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                  <div className="w-px h-6 bg-slate-200 flex-shrink-0" />
                  {[
                    { label: 'Cheapest', value: 'cheapest' },
                    { label: 'Fastest', value: 'fastest' },
                    { label: 'Earliest', value: 'departure' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                        sortBy === option.value 
                          ? 'bg-cyan-600 border-cyan-600 text-white shadow-md' 
                          : 'bg-white border-slate-100 text-slate-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sort by:</span>
                    <div className="relative">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border-2 border-slate-100 px-4 py-2 pr-10 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-cyan-500 cursor-pointer transition-colors"
                      >
                        <option value="cheapest">Cheapest</option>
                        <option value="fastest">Fastest</option>
                        <option value="departure">Earliest Departure</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <ActiveFilters 
                priceRange={priceRange}
                selectedAirlines={selectedAirlines}
                selectedStops={selectedStops}
                selectedTime={selectedTime}
                setPriceRange={setPriceRange}
                setSelectedAirlines={setSelectedAirlines}
                setSelectedStops={setSelectedStops}
                setSelectedTime={setSelectedTime}
              />
            </div>

            <AnimatePresence mode="popLayout">
              {isSearching ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white rounded-2xl border border-slate-200 p-6"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-100 rounded-xl animate-pulse" />
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-slate-100 rounded w-1/4 animate-pulse" />
                          <div className="h-2 bg-slate-100 rounded w-1/2 animate-pulse" />
                        </div>
                        <div className="w-24 h-10 bg-slate-100 rounded-lg animate-pulse" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  {filteredFlights.map((flight) => (
                    <FlightCard 
                      key={flight.id} 
                      flight={flight} 
                      onSelect={handleSelectFlight}
                    />
                  ))}
                  
                  {filteredFlights.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                        <XCircle size={40} className="text-slate-300" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">No flights found</h3>
                      <p className="text-slate-500 max-w-md mx-auto">Try adjusting your filters or search for different dates to find available flights.</p>
                      <button 
                        onClick={resetFilters} 
                        className="text-cyan-600 font-semibold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>

            {!isSearching && filteredFlights.length > 0 && (
              <div className="pt-4">
                <PromoBanner />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
