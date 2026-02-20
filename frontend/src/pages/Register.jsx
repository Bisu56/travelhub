import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const result = await register(username, email, password)
      if (result.success) {
        toast.success('Account created successfully!')
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
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
          <p className="text-cyan-100 text-lg mb-8">Create an account and unlock a world of travel possibilities.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <p className="text-cyan-100">Personalized travel recommendations</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">🔔</span>
              </div>
              <p className="text-cyan-100">Price drop alerts for your saved trips</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">⭐</span>
              </div>
              <p className="text-cyan-100">Earn rewards with every booking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-cyan-50 to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-cyan-600 mb-2 inline-block">TravelHub</Link>
            <h1 className="text-2xl font-bold text-cyan-900 mt-2">Create your account</h1>
            <p className="text-cyan-500 mt-1">Join thousands of travelers worldwide</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-8">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-cyan-700 mb-1.5" htmlFor="username">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cyan-50 text-cyan-900 placeholder-cyan-400 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mb-4">
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

            <div className="mb-4">
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
                  placeholder="Min. 6 characters"
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

            <div className="mb-6">
              <label className="block text-sm font-semibold text-cyan-700 mb-1.5" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cyan-50 text-cyan-900 placeholder-cyan-400 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 mb-6 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500" />
              <span className="text-sm text-cyan-600">
                I agree to the <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">Terms of Service</a> and{' '}
                <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-300 text-cyan-900 rounded-xl font-semibold transition-colors shadow-lg shadow-lime-500/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-cyan-600">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
