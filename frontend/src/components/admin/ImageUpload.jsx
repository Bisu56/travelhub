import { useState } from 'react'

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Show local preview
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    // TODO: Replace with actual upload to Cloudinary / S3
    // For now, pass the local URL back
    onUpload(localUrl)

    // Real implementation example:
    // const formData = new FormData()
    // formData.append('file', file)
    // const res = await axiosInstance.post('/upload', formData)
    // onUpload(res.data.url)
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {preview && (
        <img src={preview} alt="Preview" className="mt-2 w-full h-28 object-cover rounded border"/>
      )}
    </div>
  )
}

export default ImageUpload