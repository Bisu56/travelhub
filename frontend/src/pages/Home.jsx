import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin, FiStar, FiShield, FiHeadphones, FiDollarSign, FiArrowRight, FiCalendar, FiUsers, FiSend, FiHome, FiBox, FiTruck } from 'react-icons/fi'

const popularDestinations = [
  { id: 1, name: 'Kathmandu', subtitle: "Nepal's Cultural Heart", image: 'https://images.unsplash.com/photo-1564577661026-6e5a4f8f9d71?w=600&q=80', slug: 'kathmandu', tag: 'Popular' },
  { id: 2, name: 'Dubai', subtitle: 'Luxury & Skyscrapers', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', slug: 'dubai', tag: 'Trending' },
  { id: 3, name: 'Pokhara', subtitle: 'Adventure Gateway', image: 'https://images.unsplash.com/photo-1537633550285-1c6b3c9a5d6c?w=600&q=80', slug: 'pokhara', tag: 'Best Deal' },
  { id: 4, name: 'Abu Dhabi', subtitle: 'Tradition Meets Modernity', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80', slug: 'abu-dhabi', tag: 'Luxury' },
]

const features = [
  { icon: FiMapPin, title: 'Local Expertise', description: 'Dedicated support teams stationed in both Kathmandu and Dubai to assist you 24/7 during your journey.' },
  { icon: FiShield, title: 'Secure Payments', description: 'Book with confidence using Stripe for international cards or Khalti for local Nepalese payments.' },
  { icon: FiDollarSign, title: 'Exclusive Deals', description: 'Access to unique holiday packages and airline fares that you won\'t find anywhere else.' },
]

const stats = [
  { value: '10K+', label: 'Happy Travelers' },
  { value: '500+', label: 'Destinations' },
  { value: '1000+', label: 'Hotels' },
  { value: '98%', label: 'Satisfaction' },
]

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('flights')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchType === 'flights') {
      navigate('/flights')
    } else if (searchType === 'vehicles') {
      navigate('/vehicles')
    } else {
      navigate('/destinations')
    }
  }

  return (
    <div className="-mx-4 -mt-4">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-700/70 to-black/50 z-10"></div>
          <img 
            alt="Nepal meets Dubai" 
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          />
        </div>
        
        <div className="relative z-20 w-full max-w-4xl px-4 text-center">
          <h2 className="text-white text-4xl md:text-6xl font-black mb-4 leading-tight">
            From the Peaks of Nepal <br/>to the Skyscrapers of Dubai
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            The premium gateway for flights, hotels, and holiday packages between the Himalayas and the Arabian Gulf.
          </p>

          {/* Search Widget */}
          <div className="bg-white p-4 rounded-xl shadow-2xl overflow-hidden">
            {/* Toggle Switch */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setSearchType('flights')}
                  className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 ${searchType === 'flights' ? 'bg-white text-cyan-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <FiSend size={16} /> Flights
                </button>
                <button 
                  onClick={() => setSearchType('vehicles')}
                  className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 ${searchType === 'vehicles' ? 'bg-white text-cyan-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <FiTruck size={16} /> Vehicles
                </button>
                <button 
                  onClick={() => setSearchType('destinations')}
                  className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 ${searchType === 'destinations' ? 'bg-white text-cyan-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <FiBox size={16} /> Destinations
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
              {/* Flights Fields */}
              {searchType === 'flights' && (
                <>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400"><FiMapPin /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="From (City/Airport)" type="text" />
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400"><FiSend /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="To (City/Airport)" type="text" />
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400"><FiCalendar /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="Departure Date" type="date" />
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400"><FiUsers /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="Passengers" type="number" min="1" defaultValue="1" />
                  </div>
                </>
              )}

              {/* Vehicles Fields */}
              {searchType === 'vehicles' && (
                <>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400"><FiMapPin /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="Pickup Location" type="text" />
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400"><FiMapPin /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="Drop-off Location" type="text" />
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400"><FiCalendar /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="Pickup Date" type="date" />
                  </div>
                  <button type="submit" className="bg-cyan-600 text-white font-bold rounded-lg py-4 hover:bg-cyan-700 transition-all flex items-center justify-center gap-2">
                    <FiSearch /> Search
                  </button>
                </>
              )}

              {/* Destinations Fields */}
              {searchType === 'destinations' && (
                <>
                  <div className="relative flex items-center md:col-span-3">
                    <span className="absolute left-3 text-gray-400"><FiSearch /></span>
                    <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400" placeholder="Search destinations..." type="text" />
                  </div>
                </>
              )}
              
              {/* Show search button for flights and vehicles */}
              {(searchType === 'flights' || searchType === 'vehicles') && (
                <button type="submit" className="bg-cyan-600 text-white font-bold rounded-lg py-4 hover:bg-cyan-700 transition-all flex items-center justify-center gap-2">
                  <FiSearch /> Search
                </button>
              )}
              
              {/* Show search button for destinations */}
              {searchType === 'destinations' && (
                <button type="submit" className="bg-cyan-600 text-white font-bold rounded-lg py-4 hover:bg-cyan-700 transition-all flex items-center justify-center gap-2">
                  <FiSearch /> Search
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-3xl font-black text-gray-900 mb-2">Popular Destinations</h3>
            <p className="text-gray-500">Curated travel spots across Nepal and the UAE</p>
          </div>
            <Link className="text-cyan-600 font-bold flex items-center gap-1 hover:underline" to="/destinations">
            View all <FiArrowRight />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <div key={dest.id} className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
              <img 
                alt={dest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src={dest.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-600 text-white text-xs font-bold rounded-full">
                {dest.tag}
              </span>
              <div className="absolute bottom-4 left-4">
                <h4 className="text-white text-xl font-bold">{dest.name}</h4>
                <p className="text-white/80 text-sm">{dest.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black mb-4 text-gray-900">Why Choose TravelHub?</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">We specialize in cross-border travel between Nepal and Dubai, ensuring every detail is handled with care.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-cyan-600 text-3xl" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-10 mb-20">
        <div className="bg-cyan-600 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-white text-3xl font-black mb-4">Ready to Start Your Journey?</h3>
            <p className="text-white/80 max-w-md">Subscribe to get exclusive flight alerts and hidden destination deals between Nepal and Dubai.</p>
          </div>
          <div className="relative z-10 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-4 focus:ring-white/20 text-gray-900" placeholder="Enter your email" type="email"/>
              <button className="bg-white text-cyan-600 font-black px-8 py-4 rounded-xl hover:bg-slate-100 transition-all">Subscribe</button>
            </form>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-60 h-60 bg-black/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  )
}

export default Home
