import { useEffect, useState } from "react"

const CountdownTimer = ({ expiration, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime()

            // Verificar si expiration es una fecha válida
            const endTime = new Date(expiration).getTime()
            if (expiration === "1 uso único") {
                setTimeLeft("")
                return
            } else if (isNaN(endTime)) {
                setTimeLeft("Fecha no válida")
                return
            }

            const diff = endTime - now

            if (diff <= 0) {
                setTimeLeft("Expirado")
                onExpire?.() // Notificar al padre que expiró
                return
            }

            // Calcular los días restantes
            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        }

        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)
        return () => clearInterval(interval)
    }, [expiration, onExpire])

    // eslint-disable-next-line react/react-in-jsx-scope
    return <span>{timeLeft}</span>
}

export default CountdownTimer
