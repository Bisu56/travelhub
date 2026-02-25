import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FiSearch, FiFilter, FiTrash2, FiUser, FiMail, FiBriefcase, FiCalendar, FiCheck, FiX } from 'react-icons/fi'
import { getAllAgents, deleteAgent } from '../../services/adminService'
import ConfirmModal from '../../components/admin/ConfirmModal'

const StatusBadge = ({ status }) => {
  const colors = {
    true: 'bg-emerald-100 text-emerald-700 ring-emerald-500/20',
    false: 'bg-amber-100 text-amber-700 ring-amber-500/20',
  }
  const statusText = status === true ? 'Approved' : status === false ? 'Pending' : 'Unknown'
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${colors[status] || 'bg-slate-100 text-slate-600'}`}>
      {statusText}
    </span>
  )
}

const AgentManagement = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [pendingAction, setPendingAction] = useState(null)

  useEffect(() => { fetchAgents() }, [])

  const fetchAgents = async () => {
    try {
      setLoading(true)
      const res = await getAllAgents()
      setAgents(res.data || [])
    } catch {
      toast.error('Failed to load agents')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id) => setPendingAction({ type: 'delete', agentId: id })

  const handleConfirm = async () => {
    const { agentId } = pendingAction
    try {
      await deleteAgent(agentId)
      toast.success('Agent deleted successfully')
      fetchAgents()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!')
    } finally {
      setPendingAction(null)
    }
  }

  const filteredAgents = agents.filter(agent => 
    agent.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(agent => {
    if (statusFilter === 'ALL') return true
    if (statusFilter === 'APPROVED') return agent.approvalStatus === true
    if (statusFilter === 'PENDING') return agent.approvalStatus === false
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Agent Management</h1>
        <p className="text-slate-500 mt-1">View and manage all registered agents</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>

        {filteredAgents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="text-slate-400" size={32} />
            </div>
            <p className="text-slate-500 font-medium">No agents found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm">
                  <th className="text-left px-6 py-4 font-semibold">Company</th>
                  <th className="text-left px-6 py-4 font-semibold">License Number</th>
                  <th className="text-left px-6 py-4 font-semibold">Email</th>
                  <th className="text-left px-6 py-4 font-semibold">Phone</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-left px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map(agent => (
                  <tr key={agent.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                          {agent.companyName?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-800">{agent.companyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FiBriefcase size={16} className="text-slate-400" />
                        {agent.licenseNumber || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <FiMail size={16} className="text-slate-400" />
                        {agent.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {agent.phone || '-'}
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={agent.approvalStatus} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(agent.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pendingAction && (
        <ConfirmModal
          message="This will permanently delete this agent and all their data."
          type="danger"
          onConfirm={handleConfirm}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  )
}

export default AgentManagement
