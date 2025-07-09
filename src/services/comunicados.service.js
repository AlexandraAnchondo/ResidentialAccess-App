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

export const getAllComunicados = async (id_domicilio) => {
    try {
        const queryParams = id_domicilio ? `?id_domicilio=${id_domicilio}` : ""
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

export const setComunicadoLeido = async (data) => {
    try {
        const response = await fetch(`${API_URL}/set_advice_as_seen`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`Error al marcar comunicado como leído: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error("Error en setComunicadoLeido:", error)
        throw error
    }
}

export const getComunicadosNoLeidosCount = async (id_domicilio) => {
    try {
        const queryParams = id_domicilio ? `?id_domicilio=${id_domicilio}` : ""
        const url = `${API_URL}/get_unseen_advice_count${queryParams}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Error al obtener el número de comunicados no leídos: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error("Error en getComunicadosNoLeidosCount:", error)
        throw error
    }
}
