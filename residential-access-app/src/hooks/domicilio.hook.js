import { useState, useEffect } from "react"
import { getAllDomicilios } from "../services/domicilio.service"

const useDomicilios = (fields = ["*"]) => {
    const [domicilios, setDomicilios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDomicilios = async () => {
            try {
                const data = await getAllDomicilios(fields)
                setDomicilios(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDomicilios()
    }, []) // <- Se ejecuta solo una vez al montar el componente

    return { domicilios, loading, error }
}

export default useDomicilios
