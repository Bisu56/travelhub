import { useState } from 'react'
import { FiSearch, FiClock, FiMapPin, FiArrowRight, FiFilter, FiWifi, FiCoffee } from 'react-icons/fi'

const sampleFlights = [
  { id: 1, airline: 'Emirates', from: 'New York (JFK)', to: 'Dubai (DXB)', departure: '08:30 AM', arrival: '07:45 PM', duration: '13h 15m', price: 899, stops: 'Non-stop', class: 'Economy', logo: 'EK' },
  { id: 2, airline: 'Delta Airlines', from: 'Los Angeles (LAX)', to: 'Tokyo (NRT)', departure: '11:00 AM', arrival: '03:30 PM +1', duration: '12h 30m', price: 1150, stops: 'Non-stop', class: 'Economy', logo: 'DL' },
  { id: 3, airline: 'British Airways', from: 'Chicago (ORD)', to: 'London (LHR)', departure: '06:15 PM', arrival: '07:30 AM +1', duration: '8h 15m', price: 750, stops: 'Non-stop', class: 'Economy', logo: 'BA' },
  { id: 4, airline: 'Singapore Airlines', from: 'San Francisco (SFO)', to: 'Singapore (SIN)', departure: '01:00 AM', arrival: '09:15 AM +1', duration: '17h 15m', price: 1320, stops: '1 Stop', class: 'Business', logo: 'SQ' },
  { id: 5, airline: 'Qatar Airways', from: 'Miami (MIA)', to: 'Doha (DOH)', departure: '09:45 PM', arrival: '06:00 PM +1', duration: '14h 15m', price: 980, stops: 'Non-stop', class: 'Economy', logo: 'QR' },
  { id: 6, airline: 'Lufthansa', from: 'Boston (BOS)', to: 'Frankfurt (FRA)', departure: '05:30 PM', arrival: '06:45 AM +1', duration: '7h 15m', price: 680, stops: 'Non-stop', class: 'Economy', logo: 'LH' },
]

function Flights() {
  const [tripType, setTripType] = useState('round-trip')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [sortBy, setSortBy] = useState('price')

  const sorted = [...sampleFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration)
    return 0
  })

  return (
    <div className="-mx-4 -mt-4">
      <section className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Flights</h1>
          <p className="text-blue-100 mb-8">Search and compare flights from hundreds of airlines</p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-blue-900/20">
            <div className="flex gap-4 mb-6">
              {['round-trip', 'one-way'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTripType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tripType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'round-trip' ? 'Round Trip' : 'One Way'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">FROM</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Departure city"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">TO</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Arrival city"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">DEPARTURE</label>
                <input
                  type="date"
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">PASSENGERS</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/30">
                  <FiSearch size={18} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Available Flights</h2>
            <p className="text-sm text-slate-500">{sampleFlights.length} flights found</p>
          </div>
          <div className="flex items-center gap-3">
            <FiFilter className="text-slate-400" size={16} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price">Sort by Price</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sorted.map((flight) => (
            <div key={flight.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-4 lg:w-44">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
                    {flight.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{flight.airline}</p>
                    <p className="text-xs text-slate-500">{flight.class}</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-4 md:gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-800">{flight.departure}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{flight.from}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <p className="text-xs text-slate-500 mb-1">{flight.duration}</p>
                    <div className="w-full flex items-center">
                      <div className="h-0.5 flex-1 bg-slate-200"></div>
                      <FiArrowRight className="text-blue-500 mx-2" size={14} />
                      <div className="h-0.5 flex-1 bg-slate-200"></div>
                    </div>
                    <p className="text-xs text-blue-600 font-medium mt-1">{flight.stops}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-800">{flight.arrival}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{flight.to}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-400 lg:w-20 justify-center">
                  <FiWifi size={14} title="WiFi" />
                  <FiCoffee size={14} title="Meals" />
                </div>

                <div className="flex items-center justify-between lg:flex-col lg:items-end lg:w-36 gap-2">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                    <p className="text-xs text-slate-500">per person</p>
                  </div>
                  <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-blue-500/20">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Flights
