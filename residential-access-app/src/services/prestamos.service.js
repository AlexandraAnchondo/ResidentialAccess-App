const API_URL = `${process.env.REACT_APP_API_URL}/prestamos`

export const createPrestamo = async (prestamosData) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prestamosData)
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

export const getAllPrestamos = async (fields = []) => {
    try {
        const queryParams = fields.length ? `?fields=${fields.join(",")}` : ""
        const url = `${API_URL}/get_all${queryParams}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener prestamos: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllPrestamos:", error)
        throw error
    }
}

export const getPrestamoById = async id_prestamo => {
    try {
        const url = `${API_URL}/get/${id_prestamo}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener prestamo: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error("Error en getPrestamoById:", error)
        throw error
    }
}

export const updatePrestamo = async (prestamoData) => {
    try {
        const response = await fetch(`${API_URL}/update/${prestamoData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prestamoData)
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar prestamo: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en updatePrestamo:", error)
        throw error
    }
}

export const deletePrestamo = async id_prestamo => {
    try {
        const response = await fetch(`${API_URL}/delete/${id_prestamo}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Error al eliminar prestamo: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en deletePrestamo:", error)
        throw error
    }
}