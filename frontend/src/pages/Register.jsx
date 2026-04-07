import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    try {
      const result = await register(email, password)
      if (result.success) {
        toast.success('Account created! Please check your email to verify.')
        navigate('/login')
      } else {
        toast.error(result.message || 'Registration failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="-mx-4 -mt-4 min-h-[calc(100vh-140px)] flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-600 via-cyan-700 to-lime-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-20 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">Start Your Journey</h2>
          <p className="text-cyan-100 text-lg mb-10 max-w-md">Create an account and unlock a world of travel possibilities.</p>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <p className="text-cyan-100">Personalized travel recommendations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">🔔</span>
              </div>
              <p className="text-cyan-100">Price drop alerts for your saved trips</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">⭐</span>
              </div>
              <p className="text-cyan-100">Earn rewards with every booking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-b from-cyan-50 to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-cyan-600 mb-3">
              <span className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">✈</span>
              </span>
              TravelHub
            </Link>
            <h1 className="text-2xl font-bold text-cyan-900 mt-4">Create your account</h1>
            <p className="text-cyan-500 mt-2">Join thousands of travelers worldwide</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-cyan-100 p-8">
            <div className="mb-5">
              <label className="block text-sm font-semibold text-cyan-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
                  <FiMail size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-cyan-50 text-cyan-900 placeholder-cyan-400 border-2 border-cyan-100 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-cyan-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
                  <FiLock size={20} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-12 pr-14 py-3.5 rounded-xl bg-cyan-50 text-cyan-900 placeholder-cyan-400 border-2 border-cyan-100 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-cyan-700 mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
                  <FiLock size={20} />
                </div>
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-cyan-50 text-cyan-900 placeholder-cyan-400 border-2 border-cyan-100 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 mb-7 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
              <span className="text-sm text-cyan-600">
                I agree to the <a href="#" className="text-cyan-600 hover:text-cyan-800 font-medium">Terms of Service</a> and{' '}
                <a href="#" className="text-cyan-600 hover:text-cyan-800 font-medium">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-300 text-cyan-900 rounded-xl font-semibold transition-all shadow-lg shadow-lime-500/30 hover:shadow-lime-500/40 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <FiArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-cyan-600">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-600 hover:text-cyan-800 font-semibold inline-flex items-center gap-1">
              Sign in <FiArrowRight size={16} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
