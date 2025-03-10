import { useState, useEffect } from "react"
import {
    createVisitaVisitante
} from "../services/visita.service"

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