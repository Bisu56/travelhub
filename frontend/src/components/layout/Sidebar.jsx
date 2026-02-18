import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const { user, logout } = useAuth()

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded mb-1 text-sm font-medium transition
     ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col min-h-screen">

      {/* Brand */}
      <div className="p-6 border-b border-blue-700">
        <h2 className="text-xl font-bold"> Admin Panel</h2>
        <p className="text-blue-300 text-xs mt-1">{user?.email}</p>
      </div>

      {/* Nav links — only shown to ADMIN role */}
      <nav className="p-4 flex-1">
        {user?.role === 'ADMIN' && (
          <>
            <NavLink to="/admin/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/agents" className={linkClass}>
              Agent Approvals
            </NavLink>
            <NavLink to="/admin/destinations" className={linkClass}>
              Destinations
            </NavLink>
          </>
        )}
      </nav>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-sm hover:bg-blue-700 rounded"
        >
           Logout
        </button>
      </div>

    </div>
  )
}

export default Sidebar