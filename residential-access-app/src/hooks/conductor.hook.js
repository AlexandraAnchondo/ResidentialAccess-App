import { useState } from "react"
import { createConductor } from "../services/conductor.service"

export const useCreateConductor = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveConductor = async (conductorData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createConductor(conductorData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveConductor, loading, error }
}