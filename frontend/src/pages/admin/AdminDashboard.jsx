import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiUsers, FiMap, FiTrendingUp, FiDollarSign, FiCalendar, 
  FiArrowUpRight, FiArrowDownRight, FiEye, FiMoreVertical
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { 
  getDashboardStats, getRevenueData, getBookingTrends, 
  getUserGrowth, getPopularDestinations, getTopAgents 
} from '../../services/adminService'
import DateRangeFilter from '../../features/analytics/components/DateRangeFilter'
import RevenueChart from '../../features/analytics/components/RevenueChart'
import BookingTrendChart from '../../features/analytics/components/BookingTrendChart'
import UserGrowthChart from '../../features/analytics/components/UserGrowthChart'

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, link }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-100' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', ring: 'ring-rose-100' },
  }
  const colors = colorClasses[color] || colorClasses.blue

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-full -mr-8 -mt-8 opacity-50`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={colors.text} size={24} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value ?? '-'}</p>
        {link && (
          <Link to={link} className={`text-sm font-medium ${colors.text} hover:underline mt-2 inline-flex items-center gap-1`}>
            View all <FiArrowUpRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}

const DashboardCard = ({ title, children, icon: Icon, action }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <div className="flex items-center gap-2">
        {action}
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="text-slate-600" size={18} />
        </div>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
)

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [stats, setStats] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [bookingData, setBookingData] = useState([])
  const [userGrowthData, setUserGrowthData] = useState([])
  const [topDestinations, setTopDestinations] = useState([])
  const [topAgents, setTopAgents] = useState([])

  useEffect(() => { fetchDashboardData() }, [dateRange])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsRes, revenueRes, bookingRes, userRes, destRes, agentsRes] = await Promise.all([
        getDashboardStats(),
        getRevenueData(dateRange.from, dateRange.to),
        getBookingTrends(dateRange.from, dateRange.to),
        getUserGrowth(dateRange.from, dateRange.to),
        getPopularDestinations(),
        getTopAgents()
      ])
      
      setStats(statsRes.data)
      setRevenueData(revenueRes.data || [])
      setBookingData(bookingRes.data || [])
      setUserGrowthData(userRes.data || [])
      setTopDestinations(destRes.data || [])
      setTopAgents(agentsRes.data || [])
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangeFilter onChange={setDateRange} />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2">
            <FiCalendar size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiUsers}
          title="Total Agents"
          value={stats?.totalAgents}
          color="blue"
          trend={stats?.agentTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(stats?.agentTrend || 0)}%`}
          link="/admin/agents/manage"
        />
        <StatCard
          icon={FiMap}
          title="Total Users"
          value={stats?.totalUsers}
          color="violet"
          trend={stats?.userTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(stats?.userTrend || 0)}%`}
          link="/admin/users"
        />
        <StatCard
          icon={FiTrendingUp}
          title="Total Bookings"
          value={stats?.totalBookings}
          color="emerald"
          trend={stats?.bookingTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(stats?.bookingTrend || 0)}%`}
        />
        <StatCard
          icon={FiDollarSign}
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          color="rose"
          trend={stats?.revenueTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(stats?.revenueTrend || 0)}%`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Revenue Overview" icon={FiDollarSign}>
          {revenueData.length > 0 ? (
            <RevenueChart data={revenueData} />
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              No revenue data available
            </div>
          )}
        </DashboardCard>

        <DashboardCard title="Booking Trends" icon={FiTrendingUp}>
          {bookingData.length > 0 ? (
            <BookingTrendChart data={bookingData} />
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              No booking data available
            </div>
          )}
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="User Growth" icon={FiUsers}>
          {userGrowthData.length > 0 ? (
            <UserGrowthChart data={userGrowthData} />
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              No user data available
            </div>
          )}
        </DashboardCard>

        <DashboardCard title="Top Destinations" icon={FiMap}>
          {topDestinations.length > 0 ? (
            <div className="space-y-3">
              {topDestinations.slice(0, 5).map((dest, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-800">{dest.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{dest.bookings} bookings</p>
                    <p className="text-xs text-emerald-600 font-medium">${dest.revenue?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-400">
              No destinations data available
            </div>
          )}
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard 
          title="Top Agents" 
          icon={FiUsers}
          action={<Link to="/admin/agents/manage" className="text-sm text-blue-600 hover:underline">View all</Link>}
        >
          {topAgents.length > 0 ? (
            <div className="space-y-3">
              {topAgents.slice(0, 5).map((agent, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {agent.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{agent.name}</p>
                      <p className="text-xs text-slate-500">{agent.company_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{agent.bookings} bookings</p>
                    <p className="text-xs text-emerald-600 font-medium">${agent.revenue?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-400">
              No agent data available
            </div>
          )}
        </DashboardCard>

        <DashboardCard title="Pending Approvals" icon={FiCalendar}>
          <div className="space-y-3">
            {stats?.pendingApprovals > 0 ? (
              <Link to="/admin/agents" className="flex items-center justify-between p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <FiUsers size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Agent Approvals</p>
                    <p className="text-sm text-slate-500">{stats.pendingApprovals} pending requests</p>
                  </div>
                </div>
                <FiEye className="text-amber-600" size={20} />
              </Link>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No pending approvals
              </div>
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default AdminDashboard
