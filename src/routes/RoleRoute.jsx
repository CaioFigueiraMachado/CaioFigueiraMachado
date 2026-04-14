import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth()
  if (!user || !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />
  return children
}

export default RoleRoute
