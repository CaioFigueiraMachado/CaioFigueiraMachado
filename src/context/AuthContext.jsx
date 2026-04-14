import { createContext, useContext, useMemo, useState } from 'react'
import { api } from '../services/mockApi'

const AuthContext = createContext(null)

const USER_KEY = 'cc_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem(USER_KEY)
    return session ? JSON.parse(session) : null
  })

  const login = async (email, password) => {
    const userData = await api.login(email, password)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (payload) => {
    const userData = await api.register(payload)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
