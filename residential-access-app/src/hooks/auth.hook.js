import { useState } from "react"
import { login } from "../services/auth.service"

export const useAuth = () => {
    const [loading, setLoading] = useState(false)

    const loginUser = async (credentials) => {
        setLoading(true)
        try {
            const data = await login(credentials)
            localStorage.setItem("token", data.token)
            localStorage.setItem("rol", data.rol)
            return data
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
    }

    return { loginUser, logout, loading }
}
