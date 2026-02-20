import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const result = await login(email, password)
      if (result.success) {
        toast.success('Welcome back!')
        navigate('/')
      } else {
        toast.error(result.message || 'Login failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="-mx-4 -mt-4 min-h-[calc(100vh-140px)] flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-20 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">Welcome Back to TravelHub</h2>
          <p className="text-cyan-100 text-lg mb-10 max-w-md">Sign in to access your bookings, saved trips, and exclusive deals.</p>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">✈</span>
              </div>
              <p className="text-cyan-100">Access your flight and hotel bookings</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <p className="text-cyan-100">Unlock member-only discounts</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">🌍</span>
              </div>
              <p className="text-cyan-100">Track your travel history</p>
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
            <h1 className="text-2xl font-bold text-cyan-900 mt-4">Sign in to your account</h1>
            <p className="text-cyan-500 mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-cyan-100 p-8">
            <div className="mb-6">
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

            <div className="mb-6">
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between mb-7">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
                <span className="text-sm text-cyan-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-600 hover:text-cyan-800 font-medium">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-cyan-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-600 hover:text-cyan-800 font-semibold inline-flex items-center gap-1">
              Create one <FiArrowRight size={16} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
