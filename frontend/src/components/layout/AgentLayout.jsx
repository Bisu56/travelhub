import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FiGrid, FiPackage, FiPlusCircle, FiLogOut, FiChevronRight, FiBell, FiSearch, FiChevronDown
} from 'react-icons/fi'

const navItems = [
  { path: '/agent/dashboard', icon: <FiGrid size={20} />, label: 'Dashboard' },
  { path: '/agent/packages', icon: <FiPackage size={20} />, label: 'My Packages' },
  { path: '/agent/packages/create', icon: <FiPlusCircle size={20} />, label: 'Create Package' },
]

const pageTitles = {
  '/agent/dashboard': 'Dashboard',
  '/agent/packages': 'My Packages',
  '/agent/packages/create': 'Create Package',
}

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
   ${isActive
     ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
     : 'text-emerald-100 hover:bg-white/10 hover:text-white'}`

const AgentLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const pageTitle = pageTitles[location.pathname] || 'Agent Panel'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-emerald-500/20 to-transparent pointer-events-none" />

        <div className="p-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-xl font-bold">T</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                TravelHub
              </h2>
              <p className="text-xs text-emerald-300 font-medium">Agent Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 relative z-10">
          <div className="mb-2">
            <p className="px-4 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
              Main Menu
            </p>
          </div>
          <div className="space-y-1">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} className={linkClass} end={item.path === '/agent/packages'}>
                {item.icon}
                <span>{item.label}</span>
                <FiChevronRight className="ml-auto opacity-0 group-hover:opacity-100" />
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-white/10 relative z-10">
          <div className="bg-white/5 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{(user?.username || 'A').charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email || user?.username || 'Agent'}</p>
                <p className="text-xs text-emerald-300">Travel Agent</p>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200 text-sm font-medium"
          >
            <FiLogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-slate-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
              />
            </div>

            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <FiBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{(user?.username || 'A').charAt(0).toUpperCase()}</span>
              </div>
              <FiChevronDown className="text-slate-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AgentLayout
