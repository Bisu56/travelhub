const ConfirmModal = ({ message, onConfirm, onCancel, type = 'warning' }) => {
  const buttonColor = type === 'danger'
    ? 'bg-red-500 hover:bg-red-600'
    : 'bg-blue-500 hover:bg-blue-600'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">

        <div className="text-center mb-6">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Are you sure?</h3>
          <p className="text-gray-500 text-sm">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${buttonColor} text-white py-2 rounded font-medium`}
          >
            Yes, Confirm
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmModal