const API_URL = `${process.env.REACT_APP_API_URL}/usuario`

export const createUsuario = async (usuarioData) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear usuario: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createUsuario:", error)
        throw error
    }
}

export const getAllGuardias = async () => {
    try {
        const url = `${API_URL}/get_all_guardias`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener guardias: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getAllGuardias:", error)
        throw error
    }
}

export const updateUsuario = async (usuarioData) => {
    try {
        const response = await fetch(`${API_URL}/update/${usuarioData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioData)
        })

        if (!response.ok) {
            throw new Error(`Error al actualizar usuario: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en updateUsuario:", error)
        throw error
    }
}

export const deleteUsuario = async id_usuario => {
    try {
        const response = await fetch(`${API_URL}/delete/${id_usuario}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`Error al eliminar usuario: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en deleteUsuario:", error)
        throw error
    }
}