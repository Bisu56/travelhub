import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import PackageForm from '../../components/agent/MultiStepForm/PackageForm'
import { getPackageById, updatePackage } from '../../services/agentService'

const EditPackage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [initialData, setInitialData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPackage()
  }, [id])

  const fetchPackage = async () => {
    try {
      const res = await getPackageById(id)
      const pkg = res.data
      setInitialData({
        title: pkg.title || '',
        description: pkg.description || '',
        destination_id: pkg.destination_id || '',
        price: pkg.price || '',
        duration_days: pkg.duration_days || '',
        max_capacity: pkg.max_capacity || '',
        included_services: pkg.included_services || '',
        excluded_services: pkg.excluded_services || '',
        itinerary: pkg.itinerary || [],
        images: (pkg.images || []).map(url => ({ preview: url, name: url.split('/').pop() })),
      })
    } catch {
      toast.error('Failed to load package')
      navigate('/agent/packages')
    } finally {
      setFetching(false)
    }
  }

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

      await updatePackage(id, payload)
      toast.success('Package updated successfully!')
      navigate('/agent/packages')
    } catch {
      toast.error('Failed to update package')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Edit Package</h1>
        <p className="text-slate-500">Update the details of your travel package</p>
      </div>
      {initialData && <PackageForm initialData={initialData} onSubmit={handleSubmit} loading={loading} />}
    </div>
  )
}

export default EditPackage
