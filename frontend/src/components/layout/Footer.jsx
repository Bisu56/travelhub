import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiTruck, FiHome, FiBox, FiSend } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:pr-8">
            <Link to="/" className="text-2xl font-bold text-lime-400 mb-4 inline-flex items-center gap-2">
              <span className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
                <span className="text-cyan-900 text-lg">✈</span>
              </span>
              TravelHub
            </Link>
            <p className="text-cyan-200 text-sm leading-relaxed mb-6">
              Your trusted partner for booking flights, hotels, travel packages, and vehicle rentals worldwide. Discover your next adventure with us.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-cyan-800 rounded-full flex items-center justify-center text-cyan-200 hover:bg-lime-500 hover:text-cyan-900 transition-all">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-cyan-800 rounded-full flex items-center justify-center text-cyan-200 hover:bg-lime-500 hover:text-cyan-900 transition-all">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-cyan-800 rounded-full flex items-center justify-center text-cyan-200 hover:bg-lime-500 hover:text-cyan-900 transition-all">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-cyan-800 rounded-full flex items-center justify-center text-cyan-200 hover:bg-lime-500 hover:text-cyan-900 transition-all">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5 text-lg">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/flights" className="text-cyan-200 hover:text-lime-400 transition-colors flex items-center gap-2 text-sm"><FiSend size={16} /> Flights</Link></li>
              <li><Link to="/hotels" className="text-cyan-200 hover:text-lime-400 transition-colors flex items-center gap-2 text-sm"><FiHome size={16} /> Hotels</Link></li>
              <li><Link to="/destinations" className="text-cyan-200 hover:text-lime-400 transition-colors flex items-center gap-2 text-sm"><FiBox size={16} /> Destinations</Link></li>
              <li><Link to="/vehicles" className="text-cyan-200 hover:text-lime-400 transition-colors flex items-center gap-2 text-sm"><FiTruck size={16} /> Vehicle Rentals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5 text-lg">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-cyan-200 hover:text-lime-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-cyan-200 hover:text-lime-400 transition-colors text-sm">Careers</Link></li>
              <li><a href="#" className="text-cyan-200 hover:text-lime-400 transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-cyan-200 hover:text-lime-400 transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cyan-200">
                <FiMapPin className="text-lime-400 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-sm">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-cyan-200">
                <FiPhone className="text-lime-400 flex-shrink-0" size={18} />
                <span className="text-sm">+977 9800000000</span>
              </li>
              <li className="flex items-center gap-3 text-cyan-200">
                <FiMail className="text-lime-400 flex-shrink-0" size={18} />
                <span className="text-sm">support@travelhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-cyan-300">&copy; 2026 TravelHub. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-cyan-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-cyan-300 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
