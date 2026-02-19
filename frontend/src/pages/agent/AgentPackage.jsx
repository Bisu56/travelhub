import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlusCircle, FiFilter } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getMyPackages, deletePackage } from '../../services/agentService'
import PackageTable from '../../components/agent/PackageTable'

const AgentPackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await getMyPackages()
      setPackages(res.data || [])
    } catch {
      toast.error('Failed to load packages')
      setPackages([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return
    try {
      await deletePackage(id)
      toast.success('Package deleted')
      setPackages(prev => prev.filter(p => p.id !== id))
    } catch {
      toast.error('Failed to delete package')
    }
  }

  const filtered = filter === 'ALL'
    ? packages
    : packages.filter(p => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Packages</h1>
          <p className="text-slate-500">{packages.length} total package{packages.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          to="/agent/packages/create"
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30 flex items-center gap-2"
        >
          <FiPlusCircle size={18} />
          New Package
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <FiFilter className="text-slate-400" size={16} />
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
            {status !== 'ALL' && (
              <span className="ml-1.5 text-xs">
                ({packages.filter(p => p.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <PackageTable packages={filtered} onDelete={handleDelete} loading={loading} />
    </div>
  )
}

export default AgentPackages
