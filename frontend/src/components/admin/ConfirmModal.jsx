import { FiAlertTriangle, FiX } from 'react-icons/fi'

const ConfirmModal = ({ message, onConfirm, onCancel, type = 'warning' }) => {
  const isDanger = type === 'danger'

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
        >
          <FiX size={20} />
        </button>

        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDanger ? 'bg-red-100' : 'bg-amber-100'}`}>
            <FiAlertTriangle className={isDanger ? 'text-red-600' : 'text-amber-600'} size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Are you sure?</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 ${isDanger ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium rounded-xl transition-colors shadow-lg shadow-${isDanger ? 'red' : 'blue'}-500/30`}
          >
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
