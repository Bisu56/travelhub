import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi'

const navLinks = [
  { to: '/flights', label: 'Flights' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/packages', label: 'Packages' },
  { to: '/cars', label: 'Cars' },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-cyan-600 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white shrink-0">
            TravelHub
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-lime-500 text-cyan-900'
                    : 'text-cyan-100 hover:text-white hover:bg-cyan-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-cyan-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                    <FiUser className="text-cyan-900" size={16} />
                  </div>
                  <span className="text-sm font-medium text-white">{user.username}</span>
                  <FiChevronDown size={14} className="text-cyan-200" />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-cyan-100 py-2 z-50">
                      <button
                        onClick={() => { logout(); setProfileOpen(false) }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-cyan-100 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2 bg-lime-500 hover:bg-lime-400 text-cyan-900 text-sm font-semibold rounded-xl transition-colors shadow-md shadow-lime-500/30">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-cyan-700 transition-colors"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-cyan-500 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-lime-500 text-cyan-900'
                    : 'text-cyan-100 hover:bg-cyan-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-cyan-500 pt-3 mt-3 space-y-1">
              {user ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-300 hover:bg-cyan-700 rounded-lg transition-colors"
                >
                  <FiLogOut size={16} />
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-cyan-100 hover:bg-cyan-700 rounded-lg">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-cyan-900 bg-lime-400 hover:bg-lime-300 rounded-lg text-center">
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
