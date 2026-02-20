import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDestinations } from "../../services/publicService";
import { FiArrowRight, FiMapPin, FiStar, FiCalendar } from "react-icons/fi";

const Home = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    getDestinations()
      .then(res => setDestinations(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 py-20 lg:py-28 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Next<br className="hidden md:block" />
            <span className="text-lime-400">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-cyan-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore breathtaking destinations around the world. Book flights, hotels, and packages all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-400 text-cyan-900 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl shadow-lime-500/30 hover:shadow-lime-500/40 hover:-translate-y-1"
            >
              Explore Packages
              <FiArrowRight size={20} />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all border border-white/20"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white shadow-lg -mt-8 relative z-10 mx-4 rounded-2xl">
        <div className="container mx-auto max-w-6xl py-6 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <FiMapPin className="text-cyan-600" size={24} />
              </div>
              <div>
                <p className="font-semibold text-cyan-900">500+</p>
                <p className="text-xs text-cyan-600">Destinations</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                <FiStar className="text-lime-600" size={24} />
              </div>
              <div>
                <p className="font-semibold text-cyan-900">4.8/5</p>
                <p className="text-xs text-cyan-600">User Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <FiCalendar className="text-cyan-600" size={24} />
              </div>
              <div>
                <p className="font-semibold text-cyan-900">10k+</p>
                <p className="text-xs text-cyan-600">Bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                <FiStar className="text-lime-600" size={24} />
              </div>
              <div>
                <p className="font-semibold text-cyan-900">24/7</p>
                <p className="text-xs text-cyan-600">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-cyan-600 text-lg max-w-2xl mx-auto">
            Explore our most trending destinations loved by travelers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map(dest => (
            <div 
              key={dest.id} 
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-cyan-100"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image_url}
                  alt={`${dest.city}, ${dest.country}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-lime-500 text-cyan-900 text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-cyan-900 mb-1">
                  {dest.city}
                </h3>
                <p className="text-cyan-600 text-sm mb-4">{dest.country}</p>
                <Link
                  to={`/packages?destination=${dest.id}`}
                  className="inline-flex items-center gap-2 text-lime-600 font-semibold hover:text-lime-700 transition-colors"
                >
                  View Packages 
                  <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {destinations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMapPin className="text-cyan-400" size={40} />
            </div>
            <p className="text-cyan-600 text-lg">No destinations available at the moment.</p>
            <p className="text-cyan-400 text-sm mt-1">Check back soon for exciting travel options!</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-900 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Trip?
          </h2>
          <p className="text-cyan-200 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy travelers who booked their dream vacations with TravelHub
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-400 text-cyan-900 font-bold px-10 py-4 rounded-xl text-lg transition-all shadow-xl shadow-lime-500/30 hover:shadow-lime-500/40 hover:-translate-y-1"
          >
            Get Started Now
            <FiArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
