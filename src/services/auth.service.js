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

export const recoverPassword = async (correoRecuperacion) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/recuperar_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo: correoRecuperacion })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "No se pudo recuperar la contraseña")
        }

        return await response.json()
    } catch (error) {
        console.error("Error en al recuperar contraseña:", error)
        throw error
    }
}

export const resetPassword = async ({ token, correo, nuevaContraseña }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/reset_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token, correo_electronico: correo, nuevaContraseña: nuevaContraseña })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "No se pudo resetear la contraseña")
        }

        return await response.json()
    } catch (error) {
        console.error("Error en al resetear contraseña:", error)
        throw error
    }
}
