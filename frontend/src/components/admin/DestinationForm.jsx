import { useState } from 'react'
import toast from 'react-hot-toast'
import { createDestination, updateDestination } from '../../services/adminService'
import ImageUpload from './ImageUpload'
import { FiX, FiMapPin, FiGlobe, FiFileText, FiImage } from 'react-icons/fi'

const DestinationForm = ({ initial, onSuccess, onCancel }) => {
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
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            {isEdit ? 'Edit Destination' : 'Add New Destination'}
          </h2>
          <button 
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <FiGlobe size={16} />
                Country
              </div>
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              placeholder="e.g. Nepal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <FiMapPin size={16} />
                City
              </div>
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              placeholder="e.g. Kathmandu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <FiFileText size={16} />
                Description
              </div>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
              placeholder="Short description of this destination..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <FiImage size={16} />
                Image
              </div>
            </label>
            <ImageUpload onUpload={handleImageUpload} />
            {formData.image_url && (
              <div className="mt-3 relative rounded-xl overflow-hidden">
                <img
                  src={formData.image_url}
                  alt="preview"
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image_url: '' })}
                  className="absolute top-2 right-2 p-1.5 bg-slate-900/50 text-white rounded-lg hover:bg-slate-900/70"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
            >Cancel</button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : isEdit ? 'Update Destination' : 'Create Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DestinationForm
