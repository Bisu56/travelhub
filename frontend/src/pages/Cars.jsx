import { useState } from 'react'
import { FiSearch, FiMapPin, FiUsers, FiStar, FiFilter, FiSettings, FiZap } from 'react-icons/fi'

const sampleCars = [
  { id: 1, name: 'Toyota Camry', type: 'Sedan', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rating: 4.7, reviews: 89, price: 55, category: 'Sedan' },
  { id: 2, name: 'BMW X5', type: 'SUV', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600&q=80', seats: 7, transmission: 'Automatic', fuel: 'Diesel', rating: 4.9, reviews: 124, price: 120, category: 'SUV' },
  { id: 3, name: 'Mercedes C-Class', type: 'Luxury', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rating: 4.8, reviews: 156, price: 150, category: 'Luxury' },
  { id: 4, name: 'Honda Civic', type: 'Economy', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rating: 4.5, reviews: 203, price: 40, category: 'Economy' },
  { id: 5, name: 'Tesla Model 3', type: 'Electric', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Electric', rating: 4.9, reviews: 178, price: 95, category: 'Electric' },
  { id: 6, name: 'Ford Mustang', type: 'Sports', image: 'https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?w=600&q=80', seats: 4, transmission: 'Manual', fuel: 'Petrol', rating: 4.8, reviews: 92, price: 180, category: 'Sports' },
  { id: 7, name: 'Jeep Wrangler', type: 'SUV', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80', seats: 5, transmission: 'Manual', fuel: 'Diesel', rating: 4.6, reviews: 145, price: 110, category: 'SUV' },
  { id: 8, name: 'Volkswagen Golf', type: 'Economy', image: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&q=80', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rating: 4.4, reviews: 167, price: 45, category: 'Economy' },
]

const categories = ['All', 'Economy', 'Sedan', 'SUV', 'Luxury', 'Sports', 'Electric']

function Cars() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [pickupLocation, setPickupLocation] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filtered = sampleCars
    .filter(c => selectedCategory === 'All' || c.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })

  return (
    <div className="-mx-4 -mt-4">
      <section className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Vehicle Rentals</h1>
          <p className="text-amber-100 mb-8">Find the perfect ride for your journey</p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-orange-900/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">PICK-UP LOCATION</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="City or airport"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">PICK-UP DATE</label>
                <input
                  type="date"
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">DROP-OFF DATE</label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    className="flex-1 px-3 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <button className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-orange-500/30">
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
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <FiFilter className="text-slate-400" size={16} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-44 overflow-hidden bg-slate-50">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold">
                  {car.type}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-800">{car.name}</h3>
                  <div className="flex items-center gap-1">
                    <FiStar size={13} className="text-amber-500" fill="currentColor" />
                    <span className="text-sm font-medium text-slate-700">{car.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><FiUsers size={12} /> {car.seats} seats</span>
                  <span className="flex items-center gap-1"><FiSettings size={12} /> {car.transmission}</span>
                  <span className="flex items-center gap-1"><FiZap size={12} /> {car.fuel}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-xl font-bold text-orange-600">${car.price}</span>
                    <span className="text-sm text-slate-500"> / day</span>
                  </div>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-orange-500/20">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No cars found for this category.</p>
            <button onClick={() => setSelectedCategory('All')} className="mt-4 text-orange-600 font-semibold hover:text-orange-700">
              View All Cars
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Cars
