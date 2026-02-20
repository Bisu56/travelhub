import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

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
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome Back to TravelHub</h2>
          <p className="text-cyan-100 text-lg mb-8">Sign in to access your bookings, saved trips, and exclusive deals.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">✈</span>
              </div>
              <p className="text-cyan-100">Access your flight and hotel bookings</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <p className="text-cyan-100">Unlock member-only discounts</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">🌍</span>
              </div>
              <p className="text-cyan-100">Track your travel history</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-cyan-50 to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-cyan-600 mb-2 inline-block">TravelHub</Link>
            <h1 className="text-2xl font-bold text-cyan-900 mt-2">Sign in to your account</h1>
            <p className="text-cyan-500 mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-8">
            <div className="mb-5">
              <label className="block text-sm font-semibold text-cyan-700 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cyan-50 text-cyan-900 placeholder-cyan-400 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-cyan-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-cyan-50 text-cyan-900 placeholder-cyan-400 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
                <span className="text-sm text-cyan-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-cyan-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
