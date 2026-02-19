import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PackageForm from '../../components/agent/MultiStepForm/PackageForm'
import { createPackage } from '../../services/agentService'

const CreatePackage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      const payload = new FormData()
      payload.append('title', formData.title)
      payload.append('description', formData.description)
      payload.append('destination_id', formData.destination_id)
      payload.append('price', formData.price)
      payload.append('duration_days', formData.duration_days)
      payload.append('max_capacity', formData.max_capacity)
      payload.append('included_services', formData.included_services)
      payload.append('excluded_services', formData.excluded_services)
      payload.append('itinerary', JSON.stringify(formData.itinerary))
      formData.images.forEach((img) => {
        if (img.file) payload.append('images', img.file)
      })

      await createPackage(payload)
      toast.success('Package created successfully!')
      navigate('/agent/packages')
    } catch {
      toast.error('Failed to create package')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Create New Package</h1>
        <p className="text-slate-500">Fill in the details to create a travel package</p>
      </div>
      <PackageForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default CreatePackage
