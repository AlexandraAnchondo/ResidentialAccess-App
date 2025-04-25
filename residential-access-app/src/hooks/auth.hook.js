import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { login, refreshToken } from "../services/auth.service"

export const useAuth = () => {
    const loginUser = async (credentials) => {
        const data = await login(credentials)
        localStorage.setItem("token", data.token)
        localStorage.setItem("rol", data.rol)
        return data
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
        localStorage.removeItem("user")
        window.location.href = "/login"
    }

    const checkTokenExpiration = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        try {
            const { exp } = jwtDecode(token)
            const now = Date.now() / 1000

            if (exp < now) {
                logout()
            }
        } catch (error) {
            console.error("Token inválido", error)
            logout()
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkTokenExpiration()
        }, 10000) // cada 10 segundos

        return () => clearInterval(interval)
    }, [])

    return { loginUser, logout }
}

export const useRefreshToken = () => {
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getRefreshedToken = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await refreshToken()
            setToken(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { getRefreshedToken, token, loading, error }
}
