const API_URL = `${process.env.REACT_APP_API_URL}/domicilio`

export const getAllDomicilios = async (fields = []) => {
    try {
        const queryParams = fields.length ? `?fields=${fields.join(",")}` : ""
        const url = `${API_URL}/get_all${queryParams}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener domicilios: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllDomicilios:", error)
        throw error
    }
}

export const getAvailableDomicilios = async (fields = []) => {
    try {
        const queryParams = fields.length ? `?fields=${fields.join(",")}` : ""
        const url = `${API_URL}/get_available${queryParams}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener domicilios: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllDomicilios:", error)
        throw error
    }
}

export const getDomicilioById = async id_domicilio => {
    try {
        const url = `${API_URL}/get/${id_domicilio}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener domicilio: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error("Error en getDomicilioById:", error)
        throw error
    }
}

export const createAccessCode = async (codesData) => {
    try {
        const response = await fetch(`${API_URL}/create_access_codes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(codesData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear el código de acceso: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createAccessCode:", error)
        throw error
    }
}

export const validateAccessCode = async (id) => {
    try {
        const response = await fetch(`${API_URL}/validate_access_code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })

        if (!response.ok) {
            throw new Error(`Error al encontrar el código de acceso: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en validateAccessCode:", error)
        throw error
    }
}

export const updateDomicilio = async (domicilioData) => {
    try {
        const response = await fetch(`${API_URL}/update/${domicilioData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(domicilioData)
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar domicilio: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en updateDomicilio:", error)
        throw error
    }
}

