import { useState } from 'react'
import { FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Step1BasicInfo from './Step1BasicInfo'
import Step2Itinerary from './Step2Itinerary'
import Step3Pricing from './Step3Pricing'
import Step4Images from './Step4Images'

const steps = [
  { number: 1, label: 'Basic Info' },
  { number: 2, label: 'Itinerary' },
  { number: 3, label: 'Pricing' },
  { number: 4, label: 'Images' },
]

const PackageForm = ({ initialData, onSubmit, loading }) => {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination_id: '',
    price: '',
    duration_days: '',
    max_capacity: '',
    included_services: '',
    excluded_services: '',
    itinerary: [],
    images: [],
    ...initialData,
  })

  const validateStep1 = () => {
    const errs = {}
    if (!formData.title.trim()) errs.title = 'Title is required'
    if (!formData.description.trim()) errs.description = 'Description is required'
    if (!formData.destination_id) errs.destination_id = 'Please select a destination'
    if (!formData.duration_days || Number(formData.duration_days) < 1) errs.duration_days = 'Duration must be at least 1 day'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep3 = () => {
    const errs = {}
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Price must be greater than 0'
    if (!formData.max_capacity || Number(formData.max_capacity) <= 0) errs.max_capacity = 'Capacity must be greater than 0'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      toast.error('Please fill in all required fields')
      return
    }
    if (step === 3 && !validateStep3()) {
      toast.error('Please fix the pricing errors')
      return
    }
    setErrors({})
    setStep(prev => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setErrors({})
    setStep(prev => Math.max(prev - 1, 1))
  }

  const goToStep = (target) => {
    if (target < step) {
      setErrors({})
      setStep(target)
      return
    }
    if (target > step) {
      if (step === 1 && !validateStep1()) {
        toast.error('Please fill in all required fields before proceeding')
        return
      }
      if (step === 3 && target > 3 && !validateStep3()) {
        toast.error('Please fix the pricing errors before proceeding')
        return
      }
      setErrors({})
      setStep(target)
    }
  }

  const handleSubmit = () => {
    if (!validateStep3()) {
      setStep(3)
      toast.error('Please fix the pricing errors')
      return
    }
    onSubmit(formData)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s.number} className="flex items-center">
            <button
              type="button"
              onClick={() => goToStep(s.number)}
              className="flex items-center gap-2"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > s.number
                  ? 'bg-emerald-500 text-white'
                  : step === s.number
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-100 text-slate-400'
              }`}>
                {step > s.number ? <FiCheck size={18} /> : s.number}
              </div>
              <span className={`hidden sm:block text-sm font-medium ${
                step >= s.number ? 'text-slate-800' : 'text-slate-400'
              }`}>
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div className={`w-12 md:w-20 h-0.5 mx-2 ${
                step > s.number ? 'bg-emerald-500' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        {step === 1 && <Step1BasicInfo formData={formData} setFormData={setFormData} errors={errors} />}
        {step === 2 && <Step2Itinerary formData={formData} setFormData={setFormData} />}
        {step === 3 && <Step3Pricing formData={formData} setFormData={setFormData} errors={errors} />}
        {step === 4 && <Step4Images formData={formData} setFormData={setFormData} />}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <FiArrowLeft size={16} />
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md shadow-emerald-500/20"
            >
              Next
              <FiArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:bg-emerald-400 transition-colors flex items-center gap-2 shadow-md shadow-emerald-500/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FiCheck size={16} />
                  Submit Package
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PackageForm
