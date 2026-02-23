import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin, FiStar, FiShield, FiHeadphones, FiDollarSign, FiArrowRight, FiCalendar, FiUsers } from 'react-icons/fi'

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
    } else if (searchType === 'hotels') {
      navigate('/hotels')
    } else {
      navigate('/packages')
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
          <div className="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-slate-100 dark:border-slate-800 mb-4 px-4">
              <button 
                onClick={() => setSearchType('flights')}
                className={`px-6 py-4 border-b-2 font-bold text-sm flex items-center gap-2 transition-all ${searchType === 'flights' ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-slate-500 hover:text-cyan-600'}`}
              >
                ✈ Flights
              </button>
              <button 
                onClick={() => setSearchType('hotels')}
                className={`px-6 py-4 border-b-2 font-bold text-sm flex items-center gap-2 transition-all ${searchType === 'hotels' ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-slate-500 hover:text-cyan-600'}`}
              >
                🏨 Hotels
              </button>
              <button 
                onClick={() => setSearchType('packages')}
                className={`px-6 py-4 border-b-2 font-bold text-sm flex items-center gap-2 transition-all ${searchType === 'packages' ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-slate-500 hover:text-cyan-600'}`}
              >
                📦 Packages
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400"><FiMapPin /></span>
                <input 
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-cyan-600 text-sm" 
                  placeholder="From where?" 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400">🛫</span>
                <input 
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-cyan-600 text-sm" 
                  placeholder="To where?" 
                  type="text"
                />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400"><FiCalendar /></span>
                <input 
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-cyan-600 text-sm" 
                  placeholder="Travel dates" 
                  type="text"
                />
              </div>
              <button type="submit" className="bg-cyan-600 text-white font-bold rounded-lg py-4 hover:bg-cyan-700 transition-all flex items-center justify-center gap-2">
                <FiSearch /> Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Popular Destinations</h3>
            <p className="text-slate-500 dark:text-slate-400">Curated travel spots across Nepal and the UAE</p>
          </div>
          <Link className="text-cyan-600 font-bold flex items-center gap-1 hover:underline" to="/packages">
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
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black mb-4">Why Choose TravelHub?</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">We specialize in cross-border travel between Nepal and Dubai, ensuring every detail is handled with care.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-cyan-600 text-3xl" />
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
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
            <p className="text-white/80 max-w-md">Subscribe to get exclusive flight alerts and hidden package deals between Nepal and Dubai.</p>
          </div>
          <div className="relative z-10 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-4 focus:ring-white/20 text-slate-900" placeholder="Enter your email" type="email"/>
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
