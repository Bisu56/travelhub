import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiEye, FiMapPin } from 'react-icons/fi'
import StatusBadge from './StatusBadge'

const PackageTable = ({ packages, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
        <FiMapPin className="mx-auto text-slate-300 mb-3" size={48} />
        <h3 className="text-lg font-semibold text-slate-700 mb-1">No packages yet</h3>
        <p className="text-slate-500 mb-4">Create your first travel package to get started.</p>
        <Link
          to="/agent/packages/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          Create Package
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Package</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {pkg.images?.[0] ? (
                      <img src={pkg.images[0]} alt={pkg.title} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <FiMapPin className="text-emerald-500" size={16} />
                      </div>
                    )}
                    <p className="font-medium text-slate-800 text-sm">{pkg.title || pkg.name || 'Untitled'}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{pkg.destination || '—'}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-800">${(pkg.price || 0).toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{pkg.duration || '—'}</p>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={pkg.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/agent/packages/edit/${pkg.id}`}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </Link>
                    <button
                      onClick={() => onDelete(pkg.id)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
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

export default PackageTable
