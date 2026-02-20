import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown, FiHome, FiBox, FiMap, FiTruck } from 'react-icons/fi'

const navLinks = [
  { to: '/flights', label: 'Flights', icon: <FiTruck size={18} /> },
  { to: '/hotels', label: 'Hotels', icon: <FiHome size={18} /> },
  { to: '/packages', label: 'Packages', icon: <FiBox size={18} /> },
  { to: '/cars', label: 'Cars', icon: <FiMap size={18} /> },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-gradient-to-r from-cyan-600 to-cyan-700 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
              <span className="text-cyan-900 text-sm">✈</span>
            </span>
            TravelHub
          </Link>

          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-lime-500 text-cyan-900 shadow-md'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.icon}
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center shadow-sm">
                    <FiUser className="text-cyan-900" size={16} />
                  </div>
                  <span className="text-sm font-medium text-white hidden lg:block">{user.username}</span>
                  <FiChevronDown size={14} className="text-white/70" />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-xl border border-cyan-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-cyan-50">
                        <p className="text-sm font-semibold text-cyan-900">{user.username}</p>
                        <p className="text-xs text-cyan-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { logout(); setProfileOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-white hover:text-lime-300 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2.5 bg-lime-500 hover:bg-lime-400 text-cyan-900 text-sm font-semibold rounded-xl transition-all shadow-lg shadow-lime-500/30 hover:shadow-lime-500/40">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-cyan-500/50 py-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-lime-500 text-cyan-900'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-cyan-500/50 pt-4 mt-4 space-y-2">
              {user ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiLogOut size={20} />
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-base font-medium text-white/90 hover:bg-white/10 rounded-lg">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-cyan-900 bg-lime-400 hover:bg-lime-300 rounded-lg">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
