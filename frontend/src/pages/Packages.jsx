import { useState } from 'react'
import { FiMapPin, FiCalendar, FiUsers, FiStar, FiClock, FiCheck, FiHeart, FiFilter } from 'react-icons/fi'

const samplePackages = [
  { id: 1, name: 'Romantic Paris Getaway', destination: 'Paris, France', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', duration: '5 Days / 4 Nights', people: 2, rating: 4.9, reviews: 156, price: 1899, originalPrice: 2499, includes: ['Flights', 'Hotel', 'Tours', 'Meals'], category: 'Romance' },
  { id: 2, name: 'Tokyo Adventure Tour', destination: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', duration: '7 Days / 6 Nights', people: 4, rating: 4.8, reviews: 203, price: 2499, originalPrice: 3199, includes: ['Flights', 'Hotel', 'Guide', 'Transport'], category: 'Adventure' },
  { id: 3, name: 'Bali Beach Paradise', destination: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80', duration: '6 Days / 5 Nights', people: 2, rating: 4.9, reviews: 312, price: 1599, originalPrice: 2099, includes: ['Flights', 'Villa', 'Spa', 'Tours'], category: 'Beach' },
  { id: 4, name: 'Dubai Luxury Experience', destination: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', duration: '5 Days / 4 Nights', people: 2, rating: 4.8, reviews: 178, price: 2899, originalPrice: 3599, includes: ['Flights', 'Hotel', 'Safari', 'Cruise'], category: 'Luxury' },
  { id: 5, name: 'Italian Cultural Journey', destination: 'Rome & Florence, Italy', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80', duration: '8 Days / 7 Nights', people: 4, rating: 4.7, reviews: 245, price: 2199, originalPrice: 2899, includes: ['Flights', 'Hotels', 'Tours', 'Meals'], category: 'Culture' },
  { id: 6, name: 'Maldives Island Escape', destination: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', duration: '5 Days / 4 Nights', people: 2, rating: 5.0, reviews: 421, price: 3299, originalPrice: 4199, includes: ['Flights', 'Resort', 'Snorkeling', 'Meals'], category: 'Beach' },
]

const categories = ['All', 'Romance', 'Adventure', 'Beach', 'Luxury', 'Culture']

function Packages() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [favorites, setFavorites] = useState([])

  const filtered = samplePackages
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  return (
    <div className="-mx-4 -mt-4">
      <section className="bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Travel Packages</h1>
          <p className="text-violet-100 mb-4">Curated packages for every type of traveler</p>
          <div className="flex items-center gap-6 text-sm text-violet-200">
            <span className="flex items-center gap-1.5"><FiCheck /> Best Price Guarantee</span>
            <span className="flex items-center gap-1.5"><FiCheck /> Free Cancellation</span>
            <span className="flex items-center gap-1.5"><FiCheck /> 24/7 Support</span>
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
                    ? 'bg-violet-600 text-white'
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
              className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleFavorite(pkg.id)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    favorites.includes(pkg.id) ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white'
                  }`}
                >
                  <FiHeart size={16} fill={favorites.includes(pkg.id) ? 'currentColor' : 'none'} />
                </button>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-violet-500 text-white rounded-full text-xs font-semibold">{pkg.category}</span>
                  {pkg.originalPrice > pkg.price && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                      {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{pkg.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                  <FiMapPin size={13} /> {pkg.destination}
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><FiClock size={13} /> {pkg.duration}</span>
                  <span className="flex items-center gap-1"><FiUsers size={13} /> Up to {pkg.people}</span>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                  {pkg.includes.map(item => (
                    <span key={item} className="px-2.5 py-1 bg-violet-50 text-violet-600 rounded-md text-xs font-medium">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-violet-600">${pkg.price.toLocaleString()}</span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-sm text-slate-400 line-through">${pkg.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">per person</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FiStar size={14} className="text-amber-500" fill="currentColor" />
                      <span className="text-sm font-semibold text-slate-700">{pkg.rating}</span>
                    </div>
                    <button className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-violet-500/20">
                      View Deal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No packages found for this category.</p>
            <button onClick={() => setSelectedCategory('All')} className="mt-4 text-violet-600 font-semibold hover:text-violet-700">
              View All Packages
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Packages
