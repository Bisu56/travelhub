import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold text-blue-400 mb-4 inline-block">TravelHub</Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Your trusted partner for booking flights, hotels, travel packages, and car rentals worldwide.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2"><FiMapPin size={14} /> Kathmandu, Nepal</p>
              <p className="flex items-center gap-2"><FiPhone size={14} /> +977 9800000000</p>
              <p className="flex items-center gap-2"><FiMail size={14} /> support@travelhub.com</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/flights" className="text-slate-400 hover:text-white transition-colors">Flights</Link></li>
              <li><Link to="/hotels" className="text-slate-400 hover:text-white transition-colors">Hotels</Link></li>
              <li><Link to="/packages" className="text-slate-400 hover:text-white transition-colors">Travel Packages</Link></li>
              <li><Link to="/cars" className="text-slate-400 hover:text-white transition-colors">Car Rentals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center">
          <p className="text-sm text-slate-500">&copy; 2026 TravelHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
