import { FiPlus, FiTrash2, FiCalendar, FiAlignLeft } from 'react-icons/fi'

const Step2Itinerary = ({ formData, setFormData }) => {
  const addDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day_number: prev.itinerary.length + 1, title: '', description: '' }
      ]
    }))
  }

  const removeDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, day_number: i + 1 }))
    }))
  }

  const updateDay = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Itinerary</h2>
          <p className="text-sm text-slate-500">Plan the day-by-day schedule for this package</p>
        </div>
        <button
          type="button"
          onClick={addDay}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md shadow-emerald-500/20"
        >
          <FiPlus size={16} />
          Add Day
        </button>
      </div>

      {formData.itinerary.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <FiCalendar className="mx-auto text-slate-300 mb-3" size={40} />
          <p className="text-slate-500 mb-2">No days added yet</p>
          <button
            type="button"
            onClick={addDay}
            className="text-emerald-600 text-sm font-semibold hover:text-emerald-700"
          >
            Add your first day
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.itinerary.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    {item.day_number}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Day {item.day_number}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeDay(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateDay(index, 'title', e.target.value)}
                    placeholder="Day title, e.g. Arrival & City Tour"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <FiAlignLeft className="absolute left-3 top-2.5 text-slate-400" size={14} />
                  <textarea
                    value={item.description}
                    onChange={(e) => updateDay(index, 'description', e.target.value)}
                    placeholder="What happens on this day..."
                    rows={2}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Step2Itinerary
