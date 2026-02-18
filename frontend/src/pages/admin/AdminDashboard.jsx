import { useEffect, useState } from 'react'
// Later: import { getDashboardStats } from '../../services/adminService'

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white p-5 rounded-lg shadow flex items-center gap-4 border-l-4 ${color}`}>
    <><span className="text-3xl">{icon}</span><div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div></>
  </div>
)

const AdminDashboard = () => {
  // Hardcoded for now — replace with API call later
  const stats = {
    totalAgents: 25,
    pendingApprovals: 5,
    totalDestinations: 12
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, Admin!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon="🧑‍💼"
          title="Total Agents"
          value={stats.totalAgents}
          color="border-blue-500"
        />
        <StatCard
          icon="⏳"
          title="Pending Approvals"
          value={stats.pendingApprovals}
          color="border-yellow-500"
        />
        <StatCard
          icon="🌍"
          title="Total Destinations"
          value={stats.totalDestinations}
          color="border-green-500"
        />
      </div>
    </div>
  )
}

export default AdminDashboard