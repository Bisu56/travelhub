import { FiCheck, FiX, FiUser, FiMail, FiBriefcase } from 'react-icons/fi'

const StatusBadge = ({ status }) => {
  const colors = {
    PENDING: 'bg-amber-100 text-amber-700 ring-amber-500/20',
    APPROVED: 'bg-emerald-100 text-emerald-700 ring-emerald-500/20',
    REJECTED: 'bg-red-100 text-red-700 ring-red-500/20'
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${colors[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}

const AgentTable = ({ agents, onApprove, onReject }) => {

  if (!agents.length) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiUser className="text-slate-400" size={32} />
        </div>
        <p className="text-slate-500 font-medium">No pending agents</p>
        <p className="text-slate-400 text-sm mt-1">New agent requests will appear here</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Pending Agents</h3>
        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
          {agents.length} pending
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm">
              <th className="text-left px-6 py-4 font-semibold">Agent</th>
              <th className="text-left px-6 py-4 font-semibold">Company</th>
              <th className="text-left px-6 py-4 font-semibold">Email</th>
              <th className="text-left px-6 py-4 font-semibold">Status</th>
              <th className="text-left px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {agent.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-800">{agent.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <FiBriefcase size={16} className="text-slate-400" />
                    {agent.company_name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiMail size={16} className="text-slate-400" />
                    {agent.email}
                  </div>
                </td>
                <td className="px-6 py-4"><StatusBadge status={agent.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onApprove(agent.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <FiCheck size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(agent.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <FiX size={16} />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AgentTable
