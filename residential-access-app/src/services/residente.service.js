const API_URL = `${process.env.REACT_APP_API_URL}/residente`

export const getAllResidentesByDomicilio = async id_domicilio => {
    try {
        const url = `${API_URL}/get_all_by_domicilio/${id_domicilio}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener residentes: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllResidentes:", error)
        throw error
    }
}

export const getResidenteById = async id_residente => {
    try {
        const url = `${API_URL}/get/${id_residente}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener residente: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error("Error en getResidenteById:", error)
        throw error
    }
}

export const createResidente = async (residenteData) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(residenteData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear residente: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createResidente:", error)
        throw error
    }
}

export const updateResidente = async (residenteData) => {
    try {
        const response = await fetch(`${API_URL}/update/${residenteData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(residenteData)
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar residente: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en updateResidente:", error)
        throw error
    }
}

export const deleteResidente = async id_residente => {
    try {
        const response = await fetch(`${API_URL}/delete/${id_residente}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Error al eliminar residente: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en deleteResidente:", error)
        throw error
    }
}