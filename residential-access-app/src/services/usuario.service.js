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
