const API_URL = `${process.env.REACT_APP_API_URL}/vehiculo`

export const getAllVehiculos = async (fields = []) => {
    try {
        const queryParams = fields.length ? `?fields=${fields.join(",")}` : ""
        const url = `${API_URL}/get_all${queryParams}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener vehiculos: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllVehiculos:", error)
        throw error
    }
}

export const getAllVehiculosByDomicilio = async id_domicilio => {
    try {
        const url = `${API_URL}/get_all_by_domicilio/${id_domicilio}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener vehiculos: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllVehiculos:", error)
        throw error
    }
}

export const getVehiculoById = async id_vehiculo => {
    try {
        const url = `${API_URL}/get/${id_vehiculo}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener vehiculo: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error("Error en getVehiculoById:", error)
        throw error
    }
}

export const createVehiculo = async (vehiculoData) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehiculoData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear vehiculo: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createVehiculo:", error)
        throw error
    }
}

export const updateVehiculo = async (vehiculoData) => {
    try {
        const response = await fetch(`${API_URL}/update/${vehiculoData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehiculoData)
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar vehiculo: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en updateVehiculo:", error)
        throw error
    }
}

export const deleteVehiculo = async id_vehiculo => {
    try {
        const response = await fetch(`${API_URL}/delete/${id_vehiculo}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Error al eliminar vehiculo: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en deleteVehiculo:", error)
        throw error
    }
}
