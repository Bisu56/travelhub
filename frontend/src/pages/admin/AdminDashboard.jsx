import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiUsers, FiMap, FiTrendingUp, FiDollarSign, FiCalendar, 
  FiArrowUpRight, FiArrowDownRight, FiEye, FiPackage, FiCreditCard, FiX
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getDashboardStats, getAllAgents, getAllUsers, getDestinations } from '../../services/adminService'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, link }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
  }
  const colors = colorClasses[color] || colorClasses.blue

  const CardWrapper = link ? Link : 'div'
  const wrapperProps = link ? { to: link } : {}

  return (
    <CardWrapper {...wrapperProps} className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden block ${link ? 'no-underline' : ''}`}>
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
          <span className={`text-sm font-medium ${colors.text} hover:underline mt-2 inline-flex items-center gap-1`}>
            View <FiArrowUpRight size={14} />
          </span>
        )}
      </div>
    </CardWrapper>
  )
}

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

const RevenueChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400">
        No revenue data available
      </div>
    )
  }

  const chartData = {
    labels: data.map((d) => d.month ? new Date(d.month).toLocaleDateString('en-US', { month: 'short' }) : d.month),
    datasets: [
      {
        label: 'Revenue',
        data: data.map((d) => d.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '$' + value.toLocaleString()
        }
      }
    }
  }

  return <Line data={chartData} options={options} />
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [agents, setAgents] = useState([])
  const [users, setUsers] = useState([])
  const [destinations, setDestinations] = useState([])

  useEffect(() => { fetchDashboardData() }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsRes, agentsRes, usersRes, destRes] = await Promise.all([
        getDashboardStats(),
        getAllAgents(),
        getAllUsers(),
        getDestinations()
      ])
      
      setStats(statsRes.data)
      setAgents(agentsRes.data || [])
      setUsers(usersRes.data || [])
      setDestinations(destRes.data || [])
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2">
          <FiCalendar size={18} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiUsers}
          title="Total Users"
          value={stats?.totalUsers}
          color="violet"
          link="/admin/users"
        />
        <StatCard
          icon={FiUsers}
          title="Total Agents"
          value={stats?.totalAgents}
          color="blue"
          link="/admin/agents/manage"
        />
        <StatCard
          icon={FiTrendingUp}
          title="Total Bookings"
          value={stats?.totalBookings}
          color="emerald"
        />
        <StatCard
          icon={FiDollarSign}
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Monthly Revenue" icon={FiDollarSign}>
          <RevenueChart data={stats?.monthlyRevenue || []} />
        </DashboardCard>

        <DashboardCard title="Top Agents" icon={FiUsers}>
          {stats?.topAgents?.length > 0 ? (
            <div className="space-y-3">
              {stats.topAgents.slice(0, 5).map((agent, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {agent.agentName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{agent.agentName}</p>
                      <p className="text-xs text-slate-500">Agent ID: {agent.agentId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">${agent.totalRevenue?.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600 font-medium">revenue</p>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard title="All Agents" icon={FiUsers}>
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-800">{agents.length}</p>
            <p className="text-slate-500 mt-1">Registered Agents</p>
            <Link to="/admin/agents/manage" className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium">
              Manage Agents →
            </Link>
          </div>
        </DashboardCard>

        <DashboardCard title="All Users" icon={FiUsers}>
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-800">{users.length}</p>
            <p className="text-slate-500 mt-1">Registered Users</p>
            <Link to="/admin/users" className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium">
              Manage Users →
            </Link>
          </div>
        </DashboardCard>

        <DashboardCard title="Destinations" icon={FiMap}>
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-800">{destinations.length}</p>
            <p className="text-slate-500 mt-1">Available Destinations</p>
            <Link to="/admin/destinations" className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium">
              Manage Destinations →
            </Link>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Pending Payments" icon={FiCreditCard}>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-amber-600">{stats?.pendingPayments || 0}</p>
            <p className="text-slate-500 mt-1">Awaiting Confirmation</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Failed Payments" icon={FiX}>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-red-600">{stats?.failedPayments || 0}</p>
            <p className="text-slate-500 mt-1">Failed Transactions</p>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default AdminDashboard
