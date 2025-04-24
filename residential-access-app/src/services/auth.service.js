const API_URL = `${process.env.REACT_APP_API_URL}/auth`

export const login = async ({ correo_electronico, contraseña }) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo_electronico, contraseña })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Error en el login")
        }

        return await response.json()
    } catch (error) {
        console.error("Error en login:", error)
        throw error
    }
}

export const refreshToken = async () => {
    try {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }
        const response = await fetch(`${API_URL}/refresh_token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "No se pudo refrescar el token")
        }

        const data = await response.json()
        //localStorage.setItem("token", data.token)
        return data
    } catch (error) {
        console.error("Error al refrescar el token:", error)
        throw error
    }
}
