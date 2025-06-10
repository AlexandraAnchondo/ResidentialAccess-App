
import { useState, useEffect } from "react"
import { sendAdvicesToAllUsers, getAllComunicados, setComunicadoLeido, getComunicadosNoLeidosCount } from "../services/comunicados.service"

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

export const useComunicados = (id_domicilio) => {
    const [comunicados, setComunicados] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchComunicados = async () => {
            try {
                const data = await getAllComunicados(id_domicilio)
                setComunicados(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchComunicados()
    }, []) // <- Se ejecuta solo una vez al montar el componente

    const reload = async () => {
        try {
            const data = await getAllComunicados(id_domicilio)
            setComunicados(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { comunicados, loading, error, reload }
}

export const useCreateComunicadoLeido = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveAsComunicadoLeido = async (data) => {
        setLoading(true)
        setError(null)
        try {
            const response = await setComunicadoLeido(data)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveAsComunicadoLeido, loading, error }
}

export const useComunicadosNoLeidosCount = () => {
    const [comunicadosCount, setComunicadosCount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchComunicadosNoLeidosCount = async (id_domicilio) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getComunicadosNoLeidosCount(id_domicilio)
            setComunicadosCount(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { fetchComunicadosNoLeidosCount, comunicadosCount, setComunicadosCount, loading, error }
}