import { useState, useEffect } from "react"
import { getAllVisitanteFrecuentesByDomicilio, getVisitanteFrecuenteById, createVisitanteFrecuente, updateVisitanteFrecuente, deleteVisitanteFrecuente } from "../services/visitante_frecuente.service"

export const useGetVisitanteFrecuentesByDomicilio = (id_domicilio) => {
    const [visitante_frecuentes, setVisitanteFrecuentes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVisitanteFrecuentes = async () => {
            try {
                const data = await getAllVisitanteFrecuentesByDomicilio(id_domicilio)
                setVisitanteFrecuentes(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchVisitanteFrecuentes()
    }, [])

    return { visitante_frecuentes, setVisitanteFrecuentes, loading, error }
}

export const useGetVisitanteFrecuenteById = () => {
    const [visitante_frecuente, setVisitanteFrecuente] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchVisitanteFrecuente = async (id_visitante_frecuente) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getVisitanteFrecuenteById(id_visitante_frecuente)
            setVisitanteFrecuente(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { fetchVisitanteFrecuente, visitante_frecuente, setVisitanteFrecuente, loading, error }
}

export const useCreateVisitanteFrecuente = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveVisitanteFrecuente = async (visitante_frecuenteData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createVisitanteFrecuente(visitante_frecuenteData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveVisitanteFrecuente, loading, error }
}

export const useUpdateVisitanteFrecuente = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editVisitanteFrecuente = async (visitante_frecuenteData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateVisitanteFrecuente(visitante_frecuenteData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { editVisitanteFrecuente, loading, error }
}

export const useDeleteVisitanteFrecuente = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const removeVisitanteFrecuente = async (id_visitante_frecuente) => {
        setLoading(true)
        setError(null)
        try {
            const response = await deleteVisitanteFrecuente(id_visitante_frecuente)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { removeVisitanteFrecuente, loading, error }
}
