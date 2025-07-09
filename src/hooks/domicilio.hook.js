import { useState, useEffect } from "react"
import { getAllDomicilios, getAvailableDomicilios, getDomicilioById, createAccessCode, validateAccessCode, updateDomicilio } from "../services/domicilio.service"

export const useDomicilios = (fields = ["*"]) => {
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

export const useAvailableDomicilios = (fields = ["*"]) => {
    const [domicilios, setDomicilios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDomicilios = async () => {
            try {
                const data = await getAvailableDomicilios(fields)
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

export const useGetDomicilioById = () => {
    const [domicilio, setDomicilio] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchDomicilio = async (id_domicilio) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getDomicilioById(id_domicilio)
            setDomicilio(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { fetchDomicilio, domicilio, setDomicilio, loading, error }
}

export const useGetDomicilioByIdManual = (id_domicilio) => {
    const [domicilio, setDomicilio] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDomicilio = async () => {
            try {
                const data = await getDomicilioById(id_domicilio)
                setDomicilio(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDomicilio()
    }, []) // <- Se ejecuta solo una vez al montar el componente

    return { domicilio, loading, error }
}

export const useCreateAccessCode = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveCode = async (codeData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createAccessCode(codeData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveCode, loading, error }
}

export const useValidateAccessCode = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const validateCode = async (codeData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await validateAccessCode(codeData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { validateCode, loading, error }
}

export const useUpdateDomicilio = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editDomicilio = async (domicilioData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateDomicilio(domicilioData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { editDomicilio, loading, error }
}
