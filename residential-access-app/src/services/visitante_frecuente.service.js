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

export const createVisitanteFrecuente = async (visitante_frecuenteData) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitante_frecuenteData)
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

export const updateVisitanteFrecuente = async (visitante_frecuenteData) => {
    try {
        const response = await fetch(`${API_URL}/update/${visitante_frecuenteData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitante_frecuenteData)
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar visitante frecuente: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en updateVisitanteFrecuente:", error)
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