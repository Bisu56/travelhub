const StatusBadge = ({ status }) => {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700'
  }
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  )
}

const AgentTable = ({ agents, onApprove, onReject }) => {

  if (!agents.length) {
    return <p className="text-gray-500 text-center py-10">No pending agents.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Company</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map(agent => (
            <tr key={agent.id} className="border-t hover:bg-gray-50">
              <td className="p-4 font-medium">{agent.name}</td>
              <td className="p-4">{agent.company_name}</td>
              <td className="p-4 text-gray-500">{agent.email}</td>
              <td className="p-4"><StatusBadge status={agent.status} /></td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => onApprove(agent.id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => onReject(agent.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  ❌ Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AgentTable