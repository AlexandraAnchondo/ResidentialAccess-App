const API_URL = `${process.env.REACT_APP_API_URL}/visita`

export const getAllVisitasByDomicilio = async id_domicilio => {
    try {
        const url = `${API_URL}/get_all_by_domicilio/${id_domicilio}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener visitas: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllVisitasByDomicilio:", error)
        throw error
    }
}

export const getAllVisitas = async () => {
    try {
        const url = `${API_URL}/get_all`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener visitas: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllVisitas:", error)
        throw error
    }
}

export const createVisitaVisitante = async (visitaData) => {
    try {
        const response = await fetch(`${API_URL}/create_visita_visitante`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitaData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear visita: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createVisitaVisitante:", error)
        throw error
    }
}

export const createVisitaConductor = async (visitaData) => {
    try {
        const response = await fetch(`${API_URL}/create_visita_conductor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitaData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear visita: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createVisitaConductor:", error)
        throw error
    }
}

export const createVisitaResidente = async (visitaData) => {
    try {
        const response = await fetch(`${API_URL}/create_visita_residente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitaData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear visita: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createVisitaResidente:", error)
        throw error
    }
}

export const updateVisita = async (visitaData) => {
    try {
        const response = await fetch(`${API_URL}/update/${visitaData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitaData)
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar visita: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en updateVisita:", error)
        throw error
    }
}
