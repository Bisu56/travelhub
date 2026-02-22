import { useLocation, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { FiBell, FiSearch, FiChevronDown } from 'react-icons/fi'

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/dashboard': 'Dashboard',
  '/admin/agents': 'Agent Approvals',
  '/admin/destinations': 'Destinations',
  '/admin/reviews': 'Reviews',
  '/admin/commissions': 'Commissions',
  '/admin/payouts': 'Payouts',
  '/admin/email-preview': 'Email Templates',
}

const AdminLayout = () => {
  const location = useLocation()
  const pageTitle = pageTitles[location.pathname] || 'Admin'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
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
                className="pl-10 pr-4 py-2 bg-slate-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <FiBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <FiChevronDown className="text-slate-400" />
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
