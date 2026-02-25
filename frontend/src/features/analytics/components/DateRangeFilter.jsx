import { useState } from "react"
import { FiCalendar, FiX } from "react-icons/fi"

const DateRangeFilter = ({ onChange }) => {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const handleApply = () => {
    onChange({ from, to })
  }

  const handleClear = () => {
    setFrom("")
    setTo("")
    onChange({ from: '', to: '' })
  }

  const hasFilters = from || to

  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
      <FiCalendar className="text-slate-400" size={18} />
      <input 
        type="date" 
        value={from} 
        onChange={(e) => setFrom(e.target.value)}
        className="text-sm border-0 focus:outline-none focus:ring-0 text-slate-600"
      />
      <span className="text-slate-400">to</span>
      <input 
        type="date" 
        value={to} 
        onChange={(e) => setTo(e.target.value)}
        className="text-sm border-0 focus:outline-none focus:ring-0 text-slate-600"
      />
      {hasFilters && (
        <button 
          onClick={handleClear}
          className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
        >
          <FiX size={16} />
        </button>
      )}
      <button 
        onClick={handleApply}
        className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Apply
      </button>
    </div>
  )
}

export default DateRangeFilter
