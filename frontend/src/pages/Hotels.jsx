import { useState } from 'react'
import { FiSearch, FiMapPin, FiStar, FiWifi, FiCoffee, FiFilter, FiHeart } from 'react-icons/fi'

const sampleHotels = [
  { id: 1, name: 'The Grand Palace Hotel', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', rating: 4.9, reviews: 342, price: 289, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'], type: 'Luxury' },
  { id: 2, name: 'Sakura Garden Inn', location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', rating: 4.7, reviews: 218, price: 195, amenities: ['WiFi', 'Restaurant', 'Gym'], type: 'Boutique' },
  { id: 3, name: 'Manhattan Skyline Suites', location: 'New York, USA', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', rating: 4.8, reviews: 456, price: 350, amenities: ['WiFi', 'Gym', 'Bar', 'Concierge'], type: 'Premium' },
  { id: 4, name: 'Desert Oasis Resort', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', rating: 4.9, reviews: 389, price: 420, amenities: ['WiFi', 'Pool', 'Spa', 'Beach'], type: 'Resort' },
  { id: 5, name: 'Bali Serenity Villa', location: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', rating: 4.8, reviews: 275, price: 175, amenities: ['WiFi', 'Pool', 'Spa'], type: 'Villa' },
  { id: 6, name: 'Colosseum View Hotel', location: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80', rating: 4.6, reviews: 198, price: 230, amenities: ['WiFi', 'Restaurant', 'Bar'], type: 'Boutique' },
]

const hotelTypes = ['All', 'Luxury', 'Boutique', 'Premium', 'Resort', 'Villa']

function Hotels() {
  const [location, setLocation] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [priceRange, setPriceRange] = useState('all')
  const [favorites, setFavorites] = useState([])

  const filtered = sampleHotels.filter(h => {
    if (selectedType !== 'All' && h.type !== selectedType) return false
    if (priceRange === 'budget' && h.price > 200) return false
    if (priceRange === 'mid' && (h.price < 200 || h.price > 350)) return false
    if (priceRange === 'luxury' && h.price < 350) return false
    return true
  })

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  return (
    <div className="-mx-4 -mt-4">
      <section className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Hotels</h1>
          <p className="text-emerald-100 mb-8">Discover comfortable stays at the best prices</p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-emerald-900/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">LOCATION</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">CHECK-IN</label>
                <input
                  type="date"
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">CHECK-OUT</label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    className="flex-1 px-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <button className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-500/30">
                    <FiSearch size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {hotelTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <FiFilter className="text-slate-400" size={16} />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Prices</option>
              <option value="budget">Under $200</option>
              <option value="mid">$200 - $350</option>
              <option value="luxury">$350+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    favorites.includes(hotel.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white'
                  }`}
                >
                  <FiHeart size={16} fill={favorites.includes(hotel.id) ? 'currentColor' : 'none'} />
                </button>
                <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold">
                  {hotel.type}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{hotel.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                      <FiMapPin size={13} /> {hotel.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                    <FiStar size={13} className="text-amber-500" fill="currentColor" />
                    <span className="text-sm font-semibold text-slate-700">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-3">{hotel.reviews} reviews</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {hotel.amenities.map(a => (
                    <span key={a} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md text-xs font-medium">
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">${hotel.price}</span>
                    <span className="text-sm text-slate-500"> / night</span>
                  </div>
                  <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-emerald-500/20">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No hotels found matching your filters.</p>
            <button onClick={() => { setSelectedType('All'); setPriceRange('all') }} className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700">
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Hotels
