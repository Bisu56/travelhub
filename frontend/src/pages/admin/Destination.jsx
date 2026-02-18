import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getDestinations, deleteDestination } from '../../services/adminService'
import DestinationForm from '../../components/admin/DestinationForm'
import ConfirmModal from '../../components/admin/ConfirmModal'
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiGlobe } from 'react-icons/fi'

const Destinations = () => {
  const [destinations, setDestinations] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => { fetchDestinations() }, [])

  const fetchDestinations = async () => {
    try {
      const res = await getDestinations()
      setDestinations(res.data)
    } catch {
      toast.error('Failed to load destinations')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDestination(deleteId)
      toast.success('Destination deleted')
      fetchDestinations()
    } catch {
      toast.error('Delete failed')
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Destinations</h1>
          <p className="text-slate-500 mt-1">Manage your travel destinations</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/30"
        >
          <FiPlus size={20} />
          Add Destination
        </button>
      </div>

      {!destinations.length ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiGlobe className="text-slate-400" size={32} />
          </div>
          <p className="text-slate-500 font-medium">No destinations yet</p>
          <p className="text-slate-400 text-sm mt-1">Add your first destination to get started</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm">
                  <th className="text-left px-6 py-4 font-semibold">Image</th>
                  <th className="text-left px-6 py-4 font-semibold">Country</th>
                  <th className="text-left px-6 py-4 font-semibold">City</th>
                  <th className="text-left px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map(dest => (
                  <tr key={dest.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {dest.image_url ? (
                        <img src={dest.image_url} alt={dest.city} className="w-16 h-12 object-cover rounded-lg shadow-sm"/>
                      ) : (
                        <div className="w-16 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FiMapPin className="text-slate-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiGlobe className="text-slate-400" size={16} />
                        <span className="font-medium text-slate-800">{dest.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-slate-400" size={16} />
                        <span className="text-slate-600">{dest.city}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditTarget(dest); setShowForm(true) }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(dest.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <DestinationForm
          initial={editTarget}
          onSuccess={() => { setShowForm(false); fetchDestinations() }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {deleteId && (
        <ConfirmModal
          message="This will permanently delete this destination."
          type="danger"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}

export default Destinations
