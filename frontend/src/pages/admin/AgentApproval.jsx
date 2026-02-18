import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import AgentTable from '../../components/admin/AgentTable'
import ConfirmModal from '../../components/admin/ConfirmModal'
import { getPendingAgents, approveAgent, rejectAgent } from '../../services/adminService'

const AgentApproval = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingAction, setPendingAction] = useState(null)

  useEffect(() => { fetchAgents() }, [])

  const fetchAgents = async () => {
    try {
      const res = await getPendingAgents()
      setAgents(res.data)
    } catch {
      toast.error('Failed to load agents')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = (id) => setPendingAction({ type: 'approve', agentId: id })
  const handleReject = (id) => setPendingAction({ type: 'reject', agentId: id })

  const handleConfirm = async () => {
    const { type, agentId } = pendingAction
    try {
      if (type === 'approve') {
        await approveAgent(agentId)
        toast.success('Agent approved successfully!')
      } else {
        await rejectAgent(agentId)
        toast.success('Agent application rejected')
      }
      fetchAgents()
    } catch {
      toast.error('Something went wrong!')
    } finally {
      setPendingAction(null)
    }
  }

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
        <h1 className="text-2xl font-bold text-slate-800">Agent Approvals</h1>
        <p className="text-slate-500 mt-1">Review and manage agent applications</p>
      </div>

      <AgentTable
        agents={agents}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {pendingAction && (
        <ConfirmModal
          message={
            pendingAction.type === 'approve'
              ? 'This will approve the agent and give them access to the platform.'
              : 'This will permanently reject this agent application.'
          }
          type={pendingAction.type === 'reject' ? 'danger' : 'warning'}
          onConfirm={handleConfirm}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  )
}

export default AgentApproval
