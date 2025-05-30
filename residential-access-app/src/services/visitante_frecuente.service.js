const API_URL = `${process.env.REACT_APP_API_URL}/visitante_frecuente`

export const getAllVisitanteFrecuentesByDomicilio = async id_domicilio => {
    try {
        const url = `${API_URL}/get_all_by_domicilio/${id_domicilio}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener visitante frecuentes: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllVisitanteFrecuentes:", error)
        throw error
    }
}

export const getVisitanteFrecuenteById = async (id_visitante_frecuente, id_vehiculo) => {
    try {
        const url = `${API_URL}/get/${id_visitante_frecuente}`

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id_vehiculo })
        })

        if (!response.ok) {
            throw new Error(`Error al obtener visitante frecuente: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error("Error en getVisitanteFrecuenteById:", error)
        throw error
    }
}

export const createVisitanteFrecuente = async (visitanteFrecuenteData) => {
    try {
        const formData = new FormData()

        // Agregar datos al FormData
        if (visitanteFrecuenteData.nombre) {
            formData.append("nombre", visitanteFrecuenteData.nombre)
        }
        if (visitanteFrecuenteData.apellidos) {
            formData.append("apellidos", visitanteFrecuenteData.apellidos)
        }
        if (visitanteFrecuenteData.telefono) {
            formData.append("telefono", visitanteFrecuenteData.telefono)
        }
        if (visitanteFrecuenteData.id_domicilio) {
            formData.append("id_domicilio", visitanteFrecuenteData.id_domicilio)
        }
        if (visitanteFrecuenteData.placas) {
            formData.append("placas", visitanteFrecuenteData.placas)
        }
        if (visitanteFrecuenteData.modelo) {
            formData.append("modelo", visitanteFrecuenteData.modelo)
        }
        if (visitanteFrecuenteData.color) {
            formData.append("color", visitanteFrecuenteData.color)
        }

        // Agregar el archivo si existe
        if (visitanteFrecuenteData.ine instanceof File) {
            formData.append("ine", visitanteFrecuenteData.ine)
        }

        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Error al crear visitante frecuente: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createVisitanteFrecuente:", error)
        throw error
    }
}

export const updateVisitanteFrecuente = async (visitanteFrecuenteData) => {
    try {
        const formData = new FormData()

        // Agregar datos al FormData
        if (visitanteFrecuenteData.nombre) {
            formData.append("nombre", visitanteFrecuenteData.nombre)
        }
        if (visitanteFrecuenteData.apellidos) {
            formData.append("apellidos", visitanteFrecuenteData.apellidos)
        }
        if (visitanteFrecuenteData.telefono) {
            formData.append("telefono", visitanteFrecuenteData.telefono)
        }
        if (visitanteFrecuenteData.id_domicilio) {
            formData.append("id_domicilio", visitanteFrecuenteData.id_domicilio)
        }
        if (visitanteFrecuenteData.placas) {
            formData.append("placas", visitanteFrecuenteData.placas)
        }
        if (visitanteFrecuenteData.modelo) {
            formData.append("modelo", visitanteFrecuenteData.modelo)
        }
        if (visitanteFrecuenteData.color) {
            formData.append("color", visitanteFrecuenteData.color)
        }

        if (visitanteFrecuenteData.bloqueado) {
            formData.append("bloqueado", visitanteFrecuenteData.bloqueado)
        }

        // Agregar el archivo si existe
        if (visitanteFrecuenteData.ine instanceof File) {
            formData.append("ine", visitanteFrecuenteData.ine)
        }

        const response = await fetch(`${API_URL}/update/${visitanteFrecuenteData.id}`, {
            method: "PUT",
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Error al crear visitante frecuente: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createVisitanteFrecuente:", error)
        throw error
    }
}

export const deleteVisitanteFrecuente = async id_visitante_frecuente => {
    try {
        const response = await fetch(`${API_URL}/delete/${id_visitante_frecuente}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Error al eliminar visitante frecuente: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en deleteVisitanteFrecuente:", error)
        throw error
    }
}

export const getVisitantesFrecuentesWithDomicilio = async () => {
    try {
        const url = `${API_URL}/get_all_with_domicilio`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener visitante frecuentes: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllVisitanteFrecuentes:", error)
        throw error
    }
}

export const assignVehicleToVisitante = async (visitanteFrecuenteData) => {
    try {
        const url = `${API_URL}/assign_vehicle/${visitanteFrecuenteData.id_visitante}`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitanteFrecuenteData.vehiculo)
        })

        if (!response.ok) {
            throw new Error(`Error al asignar vehículo: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en assignVehicleToVisitante:", error)
        throw error
    }
}