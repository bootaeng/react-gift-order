import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: string | null
  isLoggedIn: boolean
  login: (username: string) => void
  logout: () => void
}
const STORAGE_KEY_USER = 'user';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY_USER)
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const login = (username: string) => {
    setUser(username)
    localStorage.setItem(STORAGE_KEY_USER, username)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY_USER)
  }
  const isLoggedIn = !!user
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth는 AuthProvider내에서만 실행.')
  return context
}
export default AuthProvider
