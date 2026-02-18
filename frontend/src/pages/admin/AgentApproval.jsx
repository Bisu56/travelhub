import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import AgentTable from '../../components/admin/AgentTable'
import ConfirmModal from '../../components/admin/ConfirmModal'
import { getPendingAgents, approveAgent, rejectAgent } from '../../services/adminService'

const AgentApproval = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingAction, setPendingAction] = useState(null)
  // pendingAction = { type: 'approve'|'reject', agentId: number }

  // Load agents on mount
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

  // Opens modal with action type and agent id
  const handleApprove = (id) => setPendingAction({ type: 'approve', agentId: id })
  const handleReject = (id) => setPendingAction({ type: 'reject', agentId: id })

  // Called when modal "Yes, Confirm" is clicked
  const handleConfirm = async () => {
    const { type, agentId } = pendingAction
    try {
      if (type === 'approve') {
        await approveAgent(agentId)
        toast.success('✅ Agent Approved!')
      } else {
        await rejectAgent(agentId)
        toast.success('❌ Agent Rejected')
      }
      fetchAgents()  // Refresh list
    } catch {
      toast.error('Something went wrong!')
    } finally {
      setPendingAction(null)  // Close modal
    }
  }

  if (loading) return <p className="text-center py-10">Loading agents...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Agent Approvals</h1>

      <AgentTable
        agents={agents}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Show modal only when pendingAction is set */}
      {pendingAction && (
        <ConfirmModal
          message={
            pendingAction.type === 'approve'
              ? 'This will approve the agent and give them access.'
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