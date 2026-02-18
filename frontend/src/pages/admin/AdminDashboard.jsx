import { useEffect, useState } from 'react'
import { FiUsers, FiClock, FiMap, FiTrendingUp, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-${color}/10 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-${color}/10 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`text-${color}`} size={24} />
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

const DashboardCard = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <div className="p-2 bg-slate-50 rounded-lg">
        <Icon className="text-slate-600" size={18} />
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
)

const AdminDashboard = () => {
  const [stats] = useState({
    totalAgents: 25,
    pendingApprovals: 5,
    totalDestinations: 12,
    totalBookings: 148,
  })

  const recentActivity = [
    { id: 1, action: 'New agent registered', agent: 'John Doe', time: '2 minutes ago', type: 'agent' },
    { id: 2, action: 'Destination added', location: 'Paris, France', time: '1 hour ago', type: 'destination' },
    { id: 3, action: 'Booking confirmed', user: 'Sarah Wilson', time: '3 hours ago', type: 'booking' },
    { id: 4, action: 'Agent approved', agent: 'Mike Johnson', time: '5 hours ago', type: 'agent' },
  ]

  const topDestinations = [
    { name: 'Paris, France', bookings: 45, revenue: '$12,500' },
    { name: 'Tokyo, Japan', bookings: 38, revenue: '$10,200' },
    { name: 'New York, USA', bookings: 32, revenue: '$9,800' },
    { name: 'Dubai, UAE', bookings: 28, revenue: '$8,400' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiUsers}
          title="Total Agents"
          value={stats.totalAgents}
          color="blue-500"
          trend="up"
          trendValue="12%"
        />
        <StatCard
          icon={FiClock}
          title="Pending Approvals"
          value={stats.pendingApprovals}
          color="amber-500"
        />
        <StatCard
          icon={FiMap}
          title="Total Destinations"
          value={stats.totalDestinations}
          color="emerald-500"
          trend="up"
          trendValue="8%"
        />
        <StatCard
          icon={FiTrendingUp}
          title="Total Bookings"
          value={stats.totalBookings}
          color="violet-500"
          trend="up"
          trendValue="24%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Activity" icon={FiClock}>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'agent' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'destination' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-violet-100 text-violet-600'
                }`}>
                  {activity.type === 'agent' ? <FiUsers size={18} /> :
                   activity.type === 'destination' ? <FiMap size={18} /> :
                   <FiTrendingUp size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-500">
                    {activity.agent || activity.user || activity.location}
                  </p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Top Destinations" icon={FiMap}>
          <div className="space-y-3">
            {topDestinations.map((dest, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-800">{dest.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">{dest.bookings} bookings</p>
                  <p className="text-xs text-emerald-600 font-medium">{dest.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default AdminDashboard
