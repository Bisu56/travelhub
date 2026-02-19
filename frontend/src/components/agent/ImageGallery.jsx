import { FiX } from 'react-icons/fi'

const ImageGallery = ({ images, onRemove }) => {
  if (!images || images.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img, index) => (
        <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
          <img
            src={typeof img === 'string' ? img : img.preview || img}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {onRemove && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
