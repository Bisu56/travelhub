import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiClock, FiCheckCircle, FiDollarSign, FiArrowUpRight, FiArrowDownRight, FiPlusCircle, FiTrendingUp, FiMap } from 'react-icons/fi'
import { getMyPackages } from '../../services/agentService'

const StatCard = ({ title, value, icon: Icon, color, bgColor, trend, trendValue }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={color} size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
          {trend === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
    <p className="text-3xl font-bold text-slate-800">{value}</p>
  </div>
)

const AgentDashboard = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await getMyPackages()
      setPackages(res.data || [])
    } catch {
      setPackages([])
    } finally {
      setLoading(false)
    }
  }

  const totalPackages = packages.length
  const pendingCount = packages.filter(p => p.status === 'PENDING').length
  const approvedCount = packages.filter(p => p.status === 'APPROVED').length
  const totalEarnings = packages
    .filter(p => p.status === 'APPROVED')
    .reduce((sum, p) => sum + (p.price || 0), 0)

  const recentPackages = [...packages]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500">Track your packages and performance</p>
        </div>
        <Link
          to="/agent/packages/create"
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30 flex items-center gap-2"
        >
          <FiPlusCircle size={18} />
          New Package
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiPackage}
          title="Total Packages"
          value={totalPackages}
          color="text-blue-500"
          bgColor="bg-blue-50"
          trend="up"
          trendValue="12%"
        />
        <StatCard
          icon={FiClock}
          title="Pending Approval"
          value={pendingCount}
          color="text-amber-500"
          bgColor="bg-amber-50"
        />
        <StatCard
          icon={FiCheckCircle}
          title="Approved"
          value={approvedCount}
          color="text-emerald-500"
          bgColor="bg-emerald-50"
          trend="up"
          trendValue="8%"
        />
        <StatCard
          icon={FiDollarSign}
          title="Total Earnings"
          value={`$${totalEarnings.toLocaleString()}`}
          color="text-violet-500"
          bgColor="bg-violet-50"
          trend="up"
          trendValue="24%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Recent Packages</h3>
            <Link to="/agent/packages" className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
              View All
            </Link>
          </div>
          <div className="p-6">
            {recentPackages.length === 0 ? (
              <div className="text-center py-8">
                <FiPackage className="mx-auto text-slate-300 mb-3" size={40} />
                <p className="text-slate-500">No packages yet</p>
                <Link to="/agent/packages/create" className="text-emerald-600 text-sm font-medium mt-2 inline-block hover:text-emerald-700">
                  Create your first package
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPackages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <FiMap className="text-emerald-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{pkg.title || pkg.name || 'Untitled'}</p>
                        <p className="text-xs text-slate-500">{pkg.destination || 'No destination'}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      pkg.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                      pkg.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                      pkg.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      {pkg.status || 'DRAFT'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Quick Stats</h3>
            <div className="p-2 bg-slate-50 rounded-lg">
              <FiTrendingUp className="text-slate-600" size={18} />
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-800">Approval Rate</p>
                <p className="text-xs text-slate-500">Based on all submissions</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {totalPackages > 0 ? Math.round((approvedCount / totalPackages) * 100) : 0}%
              </p>
            </div>
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-800">Avg. Package Price</p>
                <p className="text-xs text-slate-500">Across approved packages</p>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                ${approvedCount > 0 ? Math.round(totalEarnings / approvedCount).toLocaleString() : 0}
              </p>
            </div>
            <div className="flex items-center justify-between p-4 bg-violet-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-800">Pending Review</p>
                <p className="text-xs text-slate-500">Awaiting admin approval</p>
              </div>
              <p className="text-2xl font-bold text-violet-600">{pendingCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard
