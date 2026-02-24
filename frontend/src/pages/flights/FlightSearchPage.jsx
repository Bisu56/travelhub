import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  Search, 
  User, 
  Calendar,
  Users,
  ChevronDown,
  Check,
  Sun,
  Moon,
  Sunset,
  Clock,
  ArrowRight
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
  },
];

const SearchSection = () => {
  const [tripType, setTripType] = useState('round-trip');

  return (
    <section className="bg-white border-b border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex gap-6 mb-6">
            {['round-trip', 'one-way', 'multi-city'].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`capitalize font-medium pb-2 transition-all ${
                  tripType === type 
                    ? 'text-cyan-600 border-b-2 border-cyan-600' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">From</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 pt-6">
                <Plane className="text-slate-400" size={18} />
                <input 
                  type="text" 
                  defaultValue="Kathmandu (KTM)" 
                  className="bg-transparent w-full font-medium focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-3 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">To</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 pt-6">
                <Plane className="text-slate-400 rotate-90" size={18} />
                <input 
                  type="text" 
                  defaultValue="Dubai (DXB)" 
                  className="bg-transparent w-full font-medium focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-3 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">Dates</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 pt-6">
                <Calendar className="text-slate-400" size={18} />
                <input 
                  type="text" 
                  defaultValue="Oct 24 - Oct 31" 
                  className="bg-transparent w-full font-medium focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-3 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase absolute top-2 left-10 z-10">Passengers</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 pt-6">
                <Users className="text-slate-400" size={18} />
                <input 
                  type="text" 
                  defaultValue="1 Adult, Economy" 
                  className="bg-transparent w-full font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20">
              <Search size={18} />
              Search Flights
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
  resetFilters
}) => {
  const airlines = ['Nepal Airlines', 'flydubai', 'Emirates', 'Air Arabia'];
  const stops = [
    { label: 'Any', value: 'any' },
    { label: 'Non-stop', value: 'non-stop' },
    { label: '1 Stop', value: '1-stop' }
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
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>
        <button onClick={resetFilters} className="text-cyan-600 text-sm font-medium hover:underline">Reset</button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Price Range</h3>
        <input 
          type="range" 
          min="300" 
          max="2500" 
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 font-medium">
          <span>$300</span>
          <span>$2,500+</span>
        </div>
        <div className="text-center font-bold text-cyan-600">${priceRange}</div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Airlines</h3>
        <div className="space-y-3">
          {airlines.map((airline) => (
            <label key={airline} className="flex items-center gap-3 cursor-pointer group">
              <div 
                onClick={() => toggleAirline(airline)}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  selectedAirlines.includes(airline) 
                    ? 'bg-cyan-600 border-cyan-600 text-white' 
                    : 'border-slate-300 group-hover:border-cyan-600'
                }`}
              >
                {selectedAirlines.includes(airline) && <Check size={14} />}
              </div>
              <span className="text-sm font-medium text-slate-600">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Stops</h3>
        <div className="space-y-3">
          {stops.map((stop) => (
            <label key={stop.value} className="flex items-center gap-3 cursor-pointer group">
              <div 
                onClick={() => setSelectedStops(stop.value)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedStops === stop.value 
                    ? 'border-cyan-600 border-4' 
                    : 'border-slate-300 group-hover:border-cyan-600'
                }`}
              />
              <span className="text-sm font-medium text-slate-600">{stop.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Departure Time</h3>
        <div className="grid grid-cols-2 gap-2">
          {times.map((time) => (
            <button
              key={time.label}
              onClick={() => setSelectedTime(time.label)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedTime === time.label 
                  ? 'border-cyan-600 bg-cyan-50 ring-1 ring-cyan-600' 
                  : 'border-slate-200 hover:border-cyan-600/50'
              }`}
            >
              <div className={`mb-1 ${selectedTime === time.label ? 'text-cyan-600' : 'text-slate-400'}`}>
                {time.icon}
              </div>
              <div className="text-[10px] font-bold uppercase text-slate-400 leading-tight">{time.label}</div>
              <div className="text-[11px] font-semibold text-slate-600">{time.range}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

const FlightCard = ({ flight }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition-all"
  >
    <div className="flex flex-col items-center gap-2 w-24">
      <div className="w-12 h-12 rounded-lg border border-slate-100 flex items-center justify-center p-2">
        <img src={flight.airlineLogo} alt={flight.airline} className="max-w-full max-h-full object-contain" />
      </div>
      <span className="text-xs font-bold text-slate-800 text-center">{flight.airline}</span>
    </div>

    <div className="flex-1 flex items-center justify-between w-full md:w-auto">
      <div className="text-center md:text-left">
        <div className="text-2xl font-bold">{flight.departureTime}</div>
        <div className="text-xs font-medium text-slate-400">{flight.from} - Kathmandu</div>
      </div>

      <div className="flex-1 px-8 flex flex-col items-center">
        <div className="text-[10px] font-bold text-slate-400 mb-1">{flight.duration}</div>
        <div className="w-full h-[1px] bg-slate-200 relative flex items-center justify-center">
          <div className="absolute w-2 h-2 rounded-full bg-slate-200 -left-1" />
          <div className="absolute w-2 h-2 rounded-full bg-slate-200 -right-1" />
          <Plane size={14} className="text-cyan-600 bg-white px-1 z-10" />
        </div>
        <div className="mt-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{flight.stops}</div>
      </div>

      <div className="text-center md:text-right">
        <div className="text-2xl font-bold">{flight.arrivalTime}</div>
        <div className="text-xs font-medium text-slate-400">{flight.to} - Dubai</div>
      </div>
    </div>

    <div className="flex flex-col items-end gap-1 w-full md:w-32">
      {flight.originalPrice && (
        <div className="text-xs text-slate-400 line-through">${flight.originalPrice}</div>
      )}
      <div className="text-3xl font-bold text-slate-900">${flight.price}</div>
      <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold text-sm transition-colors mt-2">
        Book Now
      </button>
    </div>
  </motion.div>
);

const PromoBanner = () => (
  <div className="bg-slate-100 rounded-2xl p-8 relative overflow-hidden flex items-center justify-between border border-slate-200">
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Save 15% with TravelHub Plus</h3>
      <p className="text-slate-500 text-sm">Unlock exclusive deals and complimentary seat selection.</p>
    </div>
    <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors relative z-10">
      Join Now
    </button>
    
    <div className="absolute right-0 top-0 bottom-0 w-48 bg-slate-200/50 rounded-l-full -mr-12 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border-8 border-white/30" />
    </div>
  </div>
);

export default function FlightSearchPage() {
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedAirlines, setSelectedAirlines] = useState(['Nepal Airlines', 'flydubai', 'Emirates']);
  const [selectedStops, setSelectedStops] = useState('any');
  const [selectedTime, setSelectedTime] = useState('Any');
  const [sortBy, setSortBy] = useState('Cheapest');

  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter(flight => {
      const matchesPrice = flight.price <= priceRange;
      const matchesAirline = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline);
      const matchesStops = selectedStops === 'any' || 
                           (selectedStops === 'non-stop' && flight.stops === 'DIRECT') ||
                           (selectedStops === '1-stop' && flight.stops.includes('1 STOP'));
      
      return matchesPrice && matchesAirline && matchesStops;
    });
  }, [priceRange, selectedAirlines, selectedStops]);

  const resetFilters = () => {
    setPriceRange(2500);
    setSelectedAirlines([]);
    setSelectedStops('any');
    setSelectedTime('Any');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SearchSection />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row gap-12">
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
          />

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-slate-500 font-medium">
                Showing <span className="text-slate-900 font-bold">{filteredFlights.length} flights</span> for KTM to DXB
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 font-medium">Sort by:</span>
                <button className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-cyan-600 transition-colors">
                  {sortBy}
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </AnimatePresence>
              
              {filteredFlights.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Plane size={32} />
                  </div>
                  <h3 className="text-lg font-bold">No flights found</h3>
                  <p className="text-slate-500">Try adjusting your filters to find more results.</p>
                  <button onClick={resetFilters} className="text-cyan-600 font-bold">Clear all filters</button>
                </div>
              )}
            </div>

            <div className="pt-4">
              <PromoBanner />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
