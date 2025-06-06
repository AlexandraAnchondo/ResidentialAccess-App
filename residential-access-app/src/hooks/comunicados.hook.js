
import { useState, useEffect } from "react"
import { sendAdvicesToAllUsers, getAllComunicados } from "../services/comunicados.service"

export const useSendAdvicesToAllUsers = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendAdvices = async (adviceData) => {
        setLoading(true)
        setError(null)
        try {
            return await sendAdvicesToAllUsers(adviceData)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { sendAdvices, loading, error }
}

export const useComunicados = (fields = ["*"]) => {
    const [comunicados, setComunicados] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchComunicados = async () => {
            try {
                const data = await getAllComunicados(fields)
                setComunicados(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchComunicados()
    }, []) // <- Se ejecuta solo una vez al montar el componente

    return { comunicados, loading, error }
}