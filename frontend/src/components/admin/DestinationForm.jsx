import { useState } from 'react'
import toast from 'react-hot-toast'
import { createDestination, updateDestination } from '../../services/adminService'
import ImageUpload from './ImageUpload'

const DestinationForm = ({ initial, onSuccess, onCancel }) => {
  // If initial is passed → Edit mode, else → Add mode
  const isEdit = !!initial

  const [formData, setFormData] = useState({
    country: initial?.country || '',
    city: initial?.city || '',
    description: initial?.description || '',
    image_url: initial?.image_url || ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Called by ImageUpload after user selects a file
  const handleImageUpload = (url) => {
    setFormData({ ...formData, image_url: url })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (isEdit) {
        await updateDestination(initial.id, formData)
        toast.success('Destination updated!')
      } else {
        await createDestination(formData)
        toast.success('Destination created!')
      }
      onSuccess()
    } catch {
      toast.error('Failed to save destination')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg mx-4">

        <h2 className="text-xl font-bold mb-6">
          {isEdit ? 'Edit Destination' : 'Add Destination'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Nepal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Kathmandu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Short description of this destination..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <ImageUpload onUpload={handleImageUpload} />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="preview"
                className="mt-2 w-full h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded"
            >Cancel</button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
            >
              {submitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default DestinationForm