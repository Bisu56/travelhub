import { useRef } from 'react'
import { FiUploadCloud, FiX, FiImage } from 'react-icons/fi'

const Step4Images = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null)

  const handleFiles = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Package Images</h2>
        <p className="text-sm text-slate-500">Upload photos that showcase your travel package</p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 hover:border-emerald-400 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-emerald-50/30"
      >
        <FiUploadCloud className="mx-auto text-slate-400 mb-3" size={40} />
        <p className="text-sm font-medium text-slate-700 mb-1">Drag & drop images here</p>
        <p className="text-xs text-slate-500">or click to browse files</p>
        <p className="text-xs text-slate-400 mt-2">PNG, JPG, WEBP up to 5MB each</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {formData.images.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Uploaded Images ({formData.images.length})
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                <img
                  src={img.preview || img}
                  alt={img.name || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                <p className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs px-2 py-1 truncate">
                  {img.name || `Image ${index + 1}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.images.length === 0 && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <FiImage className="text-amber-500 shrink-0" size={20} />
          <p className="text-sm text-amber-700">Adding high-quality images significantly increases booking rates.</p>
        </div>
      )}
    </div>
  )
}

export default Step4Images
