import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const navigate = useNavigate();

    const login = (newToken: string) => {
        setToken(newToken)
        localStorage.setItem('token', newToken)
        navigate('/')
    }
    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}