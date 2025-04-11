import { useState, useEffect } from "react"
import { createUsuario, getUsuarioById, getAllGuardias, updateUsuario, deleteUsuario } from "../services/usuario.service"

export const useUsuario = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveUsuario = async (usuarioData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createUsuario(usuarioData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveUsuario, loading, error }
}

export const useGetUsuarioById = () => {
    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUsuario = async (id_usuario) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getUsuarioById(id_usuario)
            setUsuario(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { fetchUsuario, usuario, setUsuario, loading, error }
}

export const useGetAllGuardias = () => {
    const [guardias, setGuardias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchguardias = async () => {
            try {
                const data = await getAllGuardias()
                setGuardias(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchguardias()
    }, []) // <- Se ejecuta solo una vez al montar el componente

    return { guardias, setGuardias, loading, error }
}

export const useUpdateUsuario = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editUsuario = async (usuarioData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateUsuario(usuarioData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { editUsuario, loading, error }
}

export const useDeleteUsuario = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const removeUsuario = async (id_usuario) => {
        setLoading(true)
        setError(null)
        try {
            const response = await deleteUsuario(id_usuario)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { removeUsuario, loading, error }
}