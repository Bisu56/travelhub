import { FiMapPin, FiFileText, FiAlignLeft, FiUsers } from 'react-icons/fi'

const Step1BasicInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Basic Information</h2>
        <p className="text-sm text-slate-500">Provide the essential details about your package</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Package Title</label>
        <div className="relative">
          <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Romantic Paris Getaway"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
        <div className="relative">
          <FiAlignLeft className="absolute left-3 top-3 text-slate-400" size={16} />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what makes this package special..."
            rows={4}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Destination ID</label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              name="destination_id"
              value={formData.destination_id}
              onChange={handleChange}
              placeholder="e.g. 1"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Max Capacity</label>
          <div className="relative">
            <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="number"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleChange}
              placeholder="e.g. 20"
              min="1"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1BasicInfo
