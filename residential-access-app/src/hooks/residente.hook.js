import { useState, useEffect } from "react"
import { getAllResidentesByDomicilio, getResidenteById, createResidente, updateResidente, deleteResidente } from "../services/residente.service"

export const useGetResidentesByDomicilio = (id_domicilio) => {
    const [residentes, setResidentes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResidentes = async () => {
            try {
                const data = await getAllResidentesByDomicilio(id_domicilio)
                setResidentes(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchResidentes()
    }, [])

    return { residentes, setResidentes, loading, error }
}

export const useGetResidenteById = () => {
    const [residente, setResidente] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchResidente = async (id_residente) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getResidenteById(id_residente)
            setResidente(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { fetchResidente, residente, setResidente, loading, error }
}

export const useCreateResidente = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveResidente = async (residenteData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createResidente(residenteData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveResidente, loading, error }
}

export const useUpdateResidente = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editResidente = async (residenteData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateResidente(residenteData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { editResidente, loading, error }
}

export const useDeleteResidente = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const removeResidente = async (id_residente) => {
        setLoading(true)
        setError(null)
        try {
            const response = await deleteResidente(id_residente)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { removeResidente, loading, error }
}
