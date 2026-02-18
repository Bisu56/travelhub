import { useState, useRef } from 'react'
import { FiUpload, FiImage } from 'react-icons/fi'

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
    onUpload(localUrl)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const localUrl = URL.createObjectURL(file)
      setPreview(localUrl)
      onUpload(localUrl)
    }
  }

  return (
    <div>
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            dragActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
          }`}>
            {dragActive ? <FiUpload size={24} /> : <FiImage size={24} />}
          </div>
          <p className="text-sm font-medium text-slate-600">
            {dragActive ? 'Drop image here' : 'Click or drag image to upload'}
          </p>
          <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
