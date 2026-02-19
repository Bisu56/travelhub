import { FiDollarSign, FiUsers, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi'

const Step3Pricing = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleListChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const fieldError = (name) => errors?.[name]

  const inputClass = (name) =>
    `w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:border-transparent ${
      fieldError(name)
        ? 'border-red-300 focus:ring-red-500'
        : 'border-slate-200 focus:ring-emerald-500'
    }`

  const includedList = formData.included_services
    ? formData.included_services.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const excludedList = formData.excluded_services
    ? formData.excluded_services.split(',').map(s => s.trim()).filter(Boolean)
    : []

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Pricing & Services</h2>
        <p className="text-sm text-slate-500">Set the price and specify what's included</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Price (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 1299"
              min="1"
              className={inputClass('price')}
            />
          </div>
          {fieldError('price') && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><FiAlertCircle size={12} />{fieldError('price')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Max Capacity <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="number"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleChange}
              placeholder="e.g. 20"
              min="1"
              className={inputClass('max_capacity')}
            />
          </div>
          {fieldError('max_capacity') && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><FiAlertCircle size={12} />{fieldError('max_capacity')}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Included Services
          <span className="font-normal text-slate-400 ml-1">(comma separated)</span>
        </label>
        <textarea
          name="included_services"
          value={formData.included_services}
          onChange={(e) => handleListChange('included_services', e.target.value)}
          placeholder="e.g. Hotel, Flights, Airport Transfer, Breakfast"
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
        />
        {includedList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {includedList.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                <FiCheck size={12} />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Excluded Services
          <span className="font-normal text-slate-400 ml-1">(comma separated)</span>
        </label>
        <textarea
          name="excluded_services"
          value={formData.excluded_services}
          onChange={(e) => handleListChange('excluded_services', e.target.value)}
          placeholder="e.g. Visa Fee, Travel Insurance, Personal Expenses"
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
        />
        {excludedList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {excludedList.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-500 rounded-lg text-xs font-medium">
                <FiX size={12} />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Price Summary</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600">Package price per person</span>
          <span className="text-xl font-bold text-blue-700">
            ${formData.price ? Number(formData.price).toLocaleString() : '0'}
          </span>
        </div>
        {formData.max_capacity && (
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-blue-600">Max capacity</span>
            <span className="text-sm font-medium text-blue-700">{formData.max_capacity} traveler{Number(formData.max_capacity) > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3Pricing
