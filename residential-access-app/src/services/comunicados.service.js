const API_URL = `${process.env.REACT_APP_API_URL}/comunicados`

export const sendAdvicesToAllUsers = async (adviceData) => {
    try {
        const response = await fetch(`${API_URL}/send_advices_to_all_users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adviceData)
        })
        if (!response.ok) {
            throw new Error(`Error al enviar advertencias a todos los usuarios: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error("Error en sendAdvicesToAllUsers:", error)
        throw error
    }
}

export const getAllComunicados = async (fields = []) => {
    try {
        const queryParams = fields.length ? `?fields=${fields.join(",")}` : ""
        const url = `${API_URL}/get_all${queryParams}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener comunicados: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllComunicados:", error)
        throw error
    }
}
