import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const useSessionWarning = () => {
    const [showWarning, setShowWarning] = useState(false)
    const [tiempoRestante, setTiempoRestante] = useState(0)
    const [token, setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        if (!token) {
            return
        }

        let checkInterval = null
        let countdownInterval = null

        const checkTime = () => {
            try {
                const { exp } = jwtDecode(token)
                const now = Date.now() / 1000
                const timeLeft = Math.floor(exp - now)

                if (timeLeft < 60 && timeLeft > 0) {
                    setShowWarning(true)
                    setTiempoRestante(timeLeft)

                    if (!countdownInterval) {
                        countdownInterval = setInterval(() => {
                            setTiempoRestante((prev) => {
                                if (prev <= 1) {
                                    clearInterval(countdownInterval)
                                    countdownInterval = null
                                    return 0
                                }
                                return prev - 1
                            })
                        }, 1000)
                    }
                } else {
                    setShowWarning(false)
                    setTiempoRestante(0)
                    clearInterval(countdownInterval)
                    countdownInterval = null
                }

                if (timeLeft <= 0) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("rol")
                    localStorage.removeItem("user")
                    window.location.href = "/login"
                }
            } catch (err) {
                console.error("Error al decodificar el token", err)
                setShowWarning(false)
                setTiempoRestante(0)
            }
        }

        checkInterval = setInterval(checkTime, 5000)
        checkTime()

        return () => {
            clearInterval(checkInterval)
            clearInterval(countdownInterval)
        }
    }, [token])

    return { showWarning, tiempoRestante, setToken }
}