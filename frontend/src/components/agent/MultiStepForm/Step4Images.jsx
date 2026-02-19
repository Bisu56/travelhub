import { useRef } from 'react'
import { FiUploadCloud, FiImage } from 'react-icons/fi'
import ImageGallery from '../ImageGallery'

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
          <ImageGallery
            images={formData.images.map(img => img.preview || img)}
            onRemove={removeImage}
          />
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
