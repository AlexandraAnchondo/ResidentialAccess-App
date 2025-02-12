import { useState } from "react"
import { createUsuario } from "../services/usuario.service"

const useUsuario = () => {
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

export default useUsuario
