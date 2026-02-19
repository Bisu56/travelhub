import { useState, useEffect } from 'react'
import { FiMapPin, FiFileText, FiAlignLeft, FiClock, FiAlertCircle } from 'react-icons/fi'
import { getDestinations } from '../../../services/adminService'

const Step1BasicInfo = ({ formData, setFormData, errors }) => {
  const [destinations, setDestinations] = useState([])
  const [loadingDest, setLoadingDest] = useState(true)

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const res = await getDestinations()
      setDestinations(res.data || [])
    } catch {
      setDestinations([])
    } finally {
      setLoadingDest(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const fieldError = (name) => errors?.[name]

  const inputClass = (name) =>
    `w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:border-transparent ${
      fieldError(name)
        ? 'border-red-300 focus:ring-red-500'
        : 'border-slate-200 focus:ring-emerald-500'
    }`

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Basic Information</h2>
        <p className="text-sm text-slate-500">Provide the essential details about your package</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Package Title <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Romantic Paris Getaway"
            className={inputClass('title')}
          />
        </div>
        {fieldError('title') && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><FiAlertCircle size={12} />{fieldError('title')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Description <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FiAlignLeft className="absolute left-3 top-3 text-slate-400" size={16} />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what makes this package special..."
            rows={4}
            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
              fieldError('description') ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'
            }`}
          />
        </div>
        {fieldError('description') && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><FiAlertCircle size={12} />{fieldError('description')}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Destination <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              name="destination_id"
              value={formData.destination_id}
              onChange={handleChange}
              disabled={loadingDest}
              className={inputClass('destination_id')}
            >
              <option value="">{loadingDest ? 'Loading destinations...' : 'Select a destination'}</option>
              {destinations.map(dest => (
                <option key={dest.id} value={dest.id}>
                  {dest.name || dest.title || `Destination #${dest.id}`}
                </option>
              ))}
            </select>
          </div>
          {fieldError('destination_id') && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><FiAlertCircle size={12} />{fieldError('destination_id')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Duration (Days) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="number"
              name="duration_days"
              value={formData.duration_days}
              onChange={handleChange}
              placeholder="e.g. 5"
              min="1"
              className={inputClass('duration_days')}
            />
          </div>
          {fieldError('duration_days') && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><FiAlertCircle size={12} />{fieldError('duration_days')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step1BasicInfo
