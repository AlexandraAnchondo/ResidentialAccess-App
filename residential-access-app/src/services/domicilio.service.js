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

