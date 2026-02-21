import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiMapPin, FiStar, FiShield, FiHeadphones, FiDollarSign, FiArrowRight, FiCalendar, FiUsers } from 'react-icons/fi'

const popularDestinations = [
  { id: 1, name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', rating: 4.8, price: '$899', tag: 'Popular' },
  { id: 2, name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', rating: 4.9, price: '$1,199', tag: 'Trending' },
  { id: 3, name: 'New York, USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', rating: 4.7, price: '$749', tag: 'Best Deal' },
  { id: 4, name: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', rating: 4.8, price: '$1,049', tag: 'Luxury' },
  { id: 5, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', rating: 4.9, price: '$699', tag: 'Nature' },
  { id: 6, name: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80', rating: 4.7, price: '$849', tag: 'Culture' },
]

const features = [
  { icon: FiShield, title: 'Secure Booking', description: 'Your payments and personal data are protected with industry-leading encryption.' },
  { icon: FiDollarSign, title: 'Best Price Guarantee', description: 'Found a lower price? We\'ll match it and give you an additional 10% off.' },
  { icon: FiHeadphones, title: '24/7 Support', description: 'Our travel experts are available around the clock to assist you.' },
  { icon: FiStar, title: 'Verified Reviews', description: 'All reviews are from real travelers who\'ve booked through TravelHub.' },
]

const stats = [
  { value: '10K+', label: 'Happy Travelers' },
  { value: '500+', label: 'Destinations' },
  { value: '1000+', label: 'Hotels' },
  { value: '98%', label: 'Satisfaction' },
]

function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="-mx-4 -mt-4">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Explore the World with TravelHub
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next <span className="text-yellow-300">Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Book flights, hotels, packages, and vehicle rentals all in one place. Your dream vacation is just a search away.
            </p>

            <div className="bg-white rounded-2xl p-3 md:p-4 shadow-2xl shadow-blue-900/30 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="date"
                    className="w-full md:w-44 pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/30">
                  <FiSearch size={18} />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Popular Destinations</h2>
            <p className="text-slate-500 mt-2">Handpicked destinations loved by our travelers</p>
          </div>
          <Link to="/packages" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest) => (
            <div key={dest.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600">
                  {dest.tag}
                </span>
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-1.5">
                    <FiMapPin size={16} className="text-blue-500" />
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <FiStar size={14} fill="currentColor" />
                    <span className="text-sm font-medium text-slate-700">{dest.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-sm text-slate-500">Starting from</span>
                    <p className="text-xl font-bold text-blue-600">{dest.price}</p>
                  </div>
                  <Link to="/packages" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/packages" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View All Destinations <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Why Choose TravelHub?</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">We make your travel experience seamless from start to finish</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 text-center group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-blue-100 text-lg mb-8">Join thousands of travelers who trust TravelHub for their adventures.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="px-8 py-3.5 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                Get Started Free
              </Link>
              <Link to="/packages" className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Browse Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
