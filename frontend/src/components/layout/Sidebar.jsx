import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiGrid, FiUsers, FiUser, FiMap, FiLogOut, FiChevronRight, 
  FiStar, FiDollarSign, FiCreditCard, FiMail, FiChevronDown
} from 'react-icons/fi'

const NavItem = ({ item, isOpen, toggleSubmenu, badge }) => {
  const hasSubmenu = item.submenu?.length > 0
  const isActive = item.submenu 
    ? item.submenu.some(sub => window.location.pathname === sub.path)
    : false

  return (
    <div>
      {hasSubmenu ? (
        <button
          onClick={() => toggleSubmenu(item.label)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
            ${isActive || isOpen
              ? 'bg-white/10 text-white' 
              : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500 text-white rounded-full">
              {badge}
            </span>
          )}
          <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={16} />
        </button>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
            ${isActive 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
              : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          {item.icon}
          <span className="flex-1">{item.label}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500 text-white rounded-full">
              {badge}
            </span>
          )}
        </NavLink>
      )}
      
      {hasSubmenu && isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
          {item.submenu.map(sub => (
            <NavLink
              key={sub.path}
              to={sub.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {sub.icon}
              <span>{sub.label}</span>
              {sub.badge && (
                <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-amber-500 text-white rounded-full">
                  {sub.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

const Sidebar = () => {
  const { user, logout } = useAuth()
  const [openMenus, setOpenMenus] = useState(['Agents'])

  const toggleSubmenu = (label) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const navItems = [
    { 
      label: 'Dashboard', 
      icon: <FiGrid size={20} />, 
      path: '/admin/dashboard' 
    },
    { 
      label: 'Agents', 
      icon: <FiUsers size={20} />, 
      badge: 5,
      submenu: [
        { label: 'Approvals', icon: <FiUsers size={16} />, path: '/admin/agents', badge: 5 },
        { label: 'All Agents', icon: <FiUsers size={16} />, path: '/admin/agents/manage' },
      ]
    },
    { 
      label: 'Users', 
      icon: <FiUser size={20} />, 
      path: '/admin/users' 
    },
    { 
      label: 'Destinations', 
      icon: <FiMap size={20} />, 
      path: '/admin/destinations' 
    },
    { 
      label: 'Reviews', 
      icon: <FiStar size={20} />, 
      path: '/admin/reviews' 
    },
    { 
      label: 'Commissions', 
      icon: <FiDollarSign size={20} />, 
      path: '/admin/commissions' 
    },
    { 
      label: 'Payouts', 
      icon: <FiCreditCard size={20} />, 
      path: '/admin/payouts' 
    },
    { 
      label: 'Email Templates', 
      icon: <FiMail size={20} />, 
      path: '/admin/email-preview' 
    },
  ]

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

      <nav className="p-4 flex-1 relative z-10 overflow-y-auto">
        <div className="mb-2">
          <p className="px-4 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Main Menu
          </p>
        </div>
        {user?.role === 'ADMIN' && (
          <div className="space-y-1">
            {navItems.map(item => (
              <NavItem 
                key={item.label} 
                item={item} 
                isOpen={openMenus.includes(item.label)}
                toggleSubmenu={toggleSubmenu}
                badge={item.badge}
              />
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
