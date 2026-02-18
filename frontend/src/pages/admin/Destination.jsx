import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getDestinations, deleteDestination } from '../../services/adminService'
import DestinationForm from '../../components/admin/DestinationForm'
import ConfirmModal from '../../components/admin/ConfirmModal'

const Destinations = () => {
  const [destinations, setDestinations] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)  // null = add mode, object = edit mode
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Destinations</h1>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true) }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Destination
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="text-left p-4">Country</th>
              <th className="text-left p-4">City</th>
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{dest.country}</td>
                <td className="p-4">{dest.city}</td>
                <td className="p-4">
                  {dest.image_url && (
                    <img src={dest.image_url} alt={dest.city} className="w-16 h-10 object-cover rounded"/>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => { setEditTarget(dest); setShowForm(true) }}
                    className="text-blue-600 hover:underline text-sm"
                  >Edit</button>
                  <button
                    onClick={() => setDeleteId(dest.id)}
                    className="text-red-500 hover:underline text-sm"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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