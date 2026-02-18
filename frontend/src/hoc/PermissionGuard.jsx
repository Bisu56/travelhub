import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PermissionGuard = ({ children, allowedRole }) => {
  const { user } = useAuth()

  // Not logged in at all → send to login
  if (!user) return <Navigate to="/login" />

  // Logged in but wrong role → send to home
  if (allowedRole && user.role !== allowedRole)
    return <Navigate to="/" />

  // All checks passed → render the protected page
  return children
}

export default PermissionGuard