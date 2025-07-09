import { useState, useEffect } from "react"
import { getAllPrestamos, getPrestamoById, createPrestamo, updatePrestamo, deletePrestamo } from "../services/prestamos.service"

export const usePrestamos = (fields = ["*"]) => {
    const [prestamos, setPrestamos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                const data = await getAllPrestamos(fields)
                setPrestamos(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPrestamos()
    }, []) // <- Se ejecuta solo una vez al montar el componente

    const reload = async () => {
        try {
            const data = await getAllPrestamos(fields)
            setPrestamos(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { prestamos, loading, error, reload }
}

export const useGetPrestamoById = () => {
    const [prestamo, setPrestamo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchPrestamo = async (id_prestamo) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getPrestamoById(id_prestamo)
            setPrestamo(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { fetchPrestamo, prestamo, setPrestamo, loading, error }
}

export const useCreatePrestamo = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const savePrestamo = async (prestamoData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createPrestamo(prestamoData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { savePrestamo, loading, error }
}

export const useUpdatePrestamo = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editPrestamo = async (prestamoData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updatePrestamo(prestamoData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { editPrestamo, loading, error }
}

export const useDeletePrestamo = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const removePrestamo = async (id_prestamo) => {
        setLoading(true)
        setError(null)
        try {
            const response = await deletePrestamo(id_prestamo)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { removePrestamo, loading, error }
}
