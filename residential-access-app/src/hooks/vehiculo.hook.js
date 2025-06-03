import { useState, useEffect } from "react"
import { getAllVehiculos, getAllVehiculosByDomicilio, getVehiculoById, createVehiculo, updateVehiculo, deleteVehiculo } from "../services/vehiculo.service"

export const useGetVehiculos = (fields = ["*"]) => {
    const [vehiculos, setVehiculos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchVehiculos = async () => {
        try {
            const data = await getAllVehiculos(fields)
            setVehiculos(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const reload = async() => {
        fetchVehiculos()
    }

    return { fetchVehiculos, vehiculos, setVehiculos, loading, error, reload }
}

export const useGetVehiculosByDomicilio = (id_domicilio) => {
    const [vehiculos, setVehiculos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVehiculos = async () => {
            try {
                const data = await getAllVehiculosByDomicilio(id_domicilio)
                setVehiculos(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchVehiculos()
    }, [])

    return { vehiculos, setVehiculos, loading, error }
}

export const useGetVehiculosByDomicilioManual = () => {
    const [vehiculos, setVehiculos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchVehiculos = async (id_domicilio) => {
        try {
            const data = await getAllVehiculosByDomicilio(id_domicilio)
            setVehiculos(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { vehiculos, setVehiculos, loading, fetchVehiculos, error }
}

export const useGetVehiculoById = () => {
    const [vehiculo, setVehiculo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchVehiculo = async (id_vehiculo) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getVehiculoById(id_vehiculo)
            setVehiculo(response)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { fetchVehiculo, vehiculo, setVehiculo, loading, error }
}

export const useCreateVehiculo = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const saveVehiculo = async (vehiculoData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await createVehiculo(vehiculoData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { saveVehiculo, loading, error }
}

export const useUpdateVehiculo = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editVehiculo = async (vehiculoData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateVehiculo(vehiculoData)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { editVehiculo, loading, error }
}

export const useDeleteVehiculo = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const removeVehiculo = async (id_vehiculo) => {
        setLoading(true)
        setError(null)
        try {
            const response = await deleteVehiculo(id_vehiculo)
            return response
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { removeVehiculo, loading, error }
}