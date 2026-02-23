import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { getDestinations } from "../../services/publicService";
import { 
  FiArrowRight, 
  FiMapPin, 
  FiStar, 
  FiCalendar,
  FiGlobe,
  FiShield,
  FiAward,
  FiNavigation,
  FiSend
} from "react-icons/fi";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [activeTab, setActiveTab] = useState("flights");

  useEffect(() => {
    getDestinations()
      .then(res => setDestinations(res.data))
      .catch(err => console.log(err));
  }, []);

  const packages = [
    {
      title: "Kathmandu City Tour",
      duration: "3 Days",
      rating: 4.8,
      reviews: 124,
      price: 299,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
      description: "Explore the ancient temples and cultural heritage of Nepal's capital."
    },
    {
      title: "Dubai Luxury Escape",
      duration: "5 Days",
      rating: 4.9,
      reviews: 89,
      price: 899,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
      description: "Experience the golden city with premium hotels and desert safari."
    },
    {
      title: "Pokhara Paradise",
      duration: "4 Days",
      rating: 4.7,
      reviews: 67,
      price: 399,
      image: "https://images.unsplash.com/photo-1544607556-datatb680b3a3?w=600",
      description: "Lakeside relaxation with stunning mountain views and adventure."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <FiGlobe className="text-cyan-600 w-8 h-8" />
              <h1 className="text-2xl font-black tracking-tight text-cyan-700">TravelHub</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/packages" className="text-sm font-semibold text-cyan-700 hover:text-cyan-500 transition-colors">Explore</Link>
              <Link to="/flights" className="text-sm font-semibold text-cyan-700 hover:text-cyan-500 transition-colors">Flights</Link>
              <Link to="/hotels" className="text-sm font-semibold text-cyan-700 hover:text-cyan-500 transition-colors">Hotels</Link>
              <Link to="/cars" className="text-sm font-semibold text-cyan-700 hover:text-cyan-500 transition-colors">Vehicle Rental</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-bold px-4 py-2 text-cyan-700 hover:bg-cyan-50 rounded-lg transition-all">Login</Link>
              <Link to="/register" className="bg-cyan-600 text-white text-sm font-bold px-5 py-2 rounded-lg shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 transition-all">Signup</Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-700/80 to-cyan-900/60 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
              alt="Travel" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 w-full max-w-4xl px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-4xl md:text-6xl font-black mb-4 leading-tight"
            >
              Discover Your Next<br/>Adventure
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium"
            >
              Book flights, hotels, and holiday packages all in one place. Your journey starts here.
            </motion.p>

            {/* Search Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-2 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex border-b border-slate-100 mb-4 px-4 overflow-x-auto">
                <button 
                  onClick={() => setActiveTab("flights")}
                  className={`px-6 py-4 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === "flights" ? "border-cyan-600 text-cyan-600" : "border-transparent text-slate-500 hover:text-cyan-600"}`}
                >
                  <FiNavigation className="w-4 h-4" /> Flights
                </button>
                <button 
                  onClick={() => setActiveTab("hotels")}
                  className={`px-6 py-4 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === "hotels" ? "border-cyan-600 text-cyan-600" : "border-transparent text-slate-500 hover:text-cyan-600"}`}
                >
                  <FiMapPin className="w-4 h-4" /> Hotels
                </button>
                <button 
                  onClick={() => setActiveTab("packages")}
                  className={`px-6 py-4 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === "packages" ? "border-cyan-600 text-cyan-600" : "border-transparent text-slate-500 hover:text-cyan-600"}`}
                >
                  <FiAward className="w-4 h-4" /> Packages
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
                <div className="relative flex items-center">
                  <FiMapPin className="absolute left-3 text-slate-400 w-5 h-5" />
                  <input type="text" placeholder="From where?" className="w-full pl-10 pr-4 py-4 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm outline-none" />
                </div>
                <div className="relative flex items-center">
                  <FiNavigation className="absolute left-3 text-slate-400 w-5 h-5" />
                  <input type="text" placeholder="To where?" className="w-full pl-10 pr-4 py-4 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm outline-none" />
                </div>
                <div className="relative flex items-center">
                  <FiCalendar className="absolute left-3 text-slate-400 w-5 h-5" />
                  <input type="text" placeholder="Travel dates" className="w-full pl-10 pr-4 py-4 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm outline-none" />
                </div>
                <Link 
                  to={activeTab === "flights" ? "/flights" : activeTab === "hotels" ? "/hotels" : "/packages"}
                  className="bg-cyan-600 text-white font-bold rounded-lg py-4 hover:bg-cyan-700 transition-all flex items-center justify-center gap-2"
                >
                  Search Deals
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="container mx-auto max-w-7xl px-4 py-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-black text-cyan-900 mb-2">Popular Destinations</h3>
              <p className="text-cyan-600">Explore our most trending destinations</p>
            </div>
            <Link to="/packages" className="text-cyan-600 font-bold flex items-center gap-1 hover:underline">
              View all <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.slice(0, 4).map((dest, i) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={dest.image_url} 
                  alt={dest.city} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white text-xl font-bold">{dest.city}</h4>
                  <p className="text-white/80 text-sm">{dest.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-black mb-4 text-cyan-900">Why Choose TravelHub?</h3>
              <p className="text-cyan-600 max-w-2xl mx-auto">We specialize in providing the best travel experiences with seamless booking and exceptional support.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FiGlobe className="text-cyan-600 w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-cyan-900">Global Reach</h4>
                <p className="text-cyan-600 text-sm leading-relaxed">Access to destinations worldwide with competitive fares and exclusive deals.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FiShield className="text-cyan-600 w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-cyan-900">Secure Payments</h4>
                <p className="text-cyan-600 text-sm leading-relaxed">Book with confidence using secure payment gateways and encrypted transactions.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FiAward className="text-cyan-600 w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-cyan-900">Best Price Guarantee</h4>
                <p className="text-cyan-600 text-sm leading-relaxed">We match any lower price you find elsewhere for the same booking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Rated Packages */}
        <section className="container mx-auto max-w-7xl px-4 py-20">
          <div className="text-center mb-12">
            <span className="bg-cyan-100 text-cyan-700 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">Top Rated</span>
            <h3 className="text-3xl font-black mt-4 text-cyan-900">Curated Holiday Packages</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div 
                key={pkg.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-xl shadow-cyan-500/5 overflow-hidden border border-cyan-100"
              >
                <div className="relative h-56">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">{pkg.duration}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? 'fill-current' : ''}`} />
                    ))}
                    <span className="text-slate-400 text-xs ml-1">({pkg.reviews} Reviews)</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-cyan-900">{pkg.title}</h4>
                  <p className="text-cyan-600 text-sm mb-6 line-clamp-2">{pkg.description}</p>
                  <div className="flex items-center justify-between border-t border-cyan-50 pt-4">
                    <div>
                      <p className="text-cyan-400 text-[10px] uppercase font-bold">Starting from</p>
                      <p className="text-cyan-600 text-xl font-black">${pkg.price}</p>
                    </div>
                    <Link to="/packages" className="bg-cyan-100 text-cyan-700 font-bold px-4 py-2 rounded-lg hover:bg-cyan-600 hover:text-white transition-all">Details</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Newsletter */}
        <section className="container mx-auto max-w-7xl px-4 py-10 mb-20">
          <div className="bg-cyan-600 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-white text-3xl font-black mb-4">Ready to Start Your Journey?</h3>
              <p className="text-white/80 max-w-md">Subscribe to get exclusive flight alerts and hidden package deals.</p>
            </div>
            <div className="relative z-10 w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-4 focus:ring-white/20 text-slate-900 outline-none" />
                <button className="bg-white text-cyan-600 font-black px-8 py-4 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2">
                  Subscribe <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-black/10 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-cyan-100 pt-20 pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <FiGlobe className="text-cyan-600 w-8 h-8" />
                <h1 className="text-2xl font-black tracking-tight text-cyan-700">TravelHub</h1>
              </div>
              <p className="text-cyan-600 text-sm leading-relaxed max-w-xs mb-6">
                Your ultimate travel companion. Book flights, hotels, and holiday packages all in one place.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-cyan-900">Explore</h5>
              <ul className="space-y-4 text-sm text-cyan-600">
                <li><Link to="/packages" className="hover:text-cyan-500 transition-all">Featured Tours</Link></li>
                <li><Link to="/hotels" className="hover:text-cyan-500 transition-all">Hotel Booking</Link></li>
                <li><Link to="/flights" className="hover:text-cyan-500 transition-all">Special Flights</Link></li>
                <li><Link to="/cars" className="hover:text-cyan-500 transition-all">Vehicle Rental</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-cyan-900">Support</h5>
              <ul className="space-y-4 text-sm text-cyan-600">
                <li><Link to="#" className="hover:text-cyan-500 transition-all">Help Center</Link></li>
                <li><Link to="#" className="hover:text-cyan-500 transition-all">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-cyan-500 transition-all">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-cyan-500 transition-all">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-cyan-900">Contact</h5>
              <p className="text-sm text-cyan-600 mb-2">Kathmandu, Nepal</p>
              <p className="text-sm text-cyan-600 mb-2">+977-1-4XXXXXX</p>
              <p className="text-sm text-cyan-600">info@travelhub.com</p>
            </div>
          </div>
          <div className="border-t border-cyan-100 pt-10 text-center">
            <p className="text-cyan-400 text-xs">© 2024 TravelHub Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
