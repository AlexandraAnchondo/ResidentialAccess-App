import { useState, useEffect } from "react"
import {
    createVisitaVisitante,
    createVisitaConductor,
    getAllVisitasByDomicilio,
    getAllVisitas,
    updateVisita
} from "../services/visita.service"

export const useGetVisitasByDomicilio = (id_domicilio) => {
    const [visitas, setVisitas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVisitas = async () => {
            try {
                const data = await getAllVisitasByDomicilio(id_domicilio)
                setVisitas(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchVisitas()
    }, [])

    return { visitas, setVisitas, loading, error }
}

export const useGetVisitas = () => {
    const [visitas, setVisitas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVisitas = async () => {
            try {
                const data = await getAllVisitas()
                setVisitas(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchVisitas()
    }, [])

    return { visitas, setVisitas, loading, error }
}

export const useCreateVisitaVisitante = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveVisitaVisitante = async (visitaData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createVisitaVisitante(visitaData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveVisitaVisitante, loading, error }
}

export const useCreateVisitaConductor = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveVisitaConductor = async (visitaData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createVisitaConductor(visitaData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveVisitaConductor, loading, error }
}

export const useUpdateVisita = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editVisita = async (visitaData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateVisita(visitaData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { editVisita, loading, error }
}