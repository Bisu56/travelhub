import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiGrid, FiUsers, FiUser, FiMap, FiLogOut, FiMenu, FiBell, FiChevronRight 
} from 'react-icons/fi'

const Sidebar = () => {
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/admin/dashboard', icon: <FiGrid size={20} />, label: 'Dashboard' },
    { path: '/admin/agents', icon: <FiUsers size={20} />, label: 'Agent Approvals' },
    { path: '/admin/agents/manage', icon: <FiUsers size={20} />, label: 'All Agents' },
    { path: '/admin/users', icon: <FiUser size={20} />, label: 'Users' },
    { path: '/admin/destinations', icon: <FiMap size={20} />, label: 'Destinations' },
  ]

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
     ${isActive 
       ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
       : 'text-blue-100 hover:bg-white/10 hover:text-white'}`

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none" />
      
      <div className="p-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-xl font-bold">T</span>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              TravelHub
            </h2>
            <p className="text-xs text-blue-300 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="p-4 flex-1 relative z-10">
        <div className="mb-2">
          <p className="px-4 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Main Menu
          </p>
        </div>
        {user?.role === 'ADMIN' && (
          <div className="space-y-1">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                {item.icon}
                <span>{item.label}</span>
                <FiChevronRight className="ml-auto opacity-0 group-hover:opacity-100" />
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-white/10 relative z-10">
        <div className="bg-white/5 rounded-xl p-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email || 'Admin'}</p>
              <p className="text-xs text-blue-300">Administrator</p>
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
  )
}

export default Sidebar
