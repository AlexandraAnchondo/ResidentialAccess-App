const API_URL = `${process.env.REACT_APP_API_URL}/usuario`

export const createUsuario = async (usuarioData) => {
    try {
        const formData = new FormData()

        // Agregar datos al FormData
        formData.append("nombre", usuarioData.nombre)
        formData.append("apellidos", usuarioData.apellidos)
        formData.append("telefono", usuarioData.telefono)
        formData.append("correo_electronico", usuarioData.correo_electronico)
        formData.append("id_rol", usuarioData.id_rol)
        formData.append("id_domicilio", usuarioData.id_domicilio ? usuarioData.id_domicilio : null)
        formData.append("rfc", usuarioData.rfc ? usuarioData.rfc : null)

        // Agregar el archivo si existe
        if (usuarioData.ine instanceof File) {
            formData.append("ine", usuarioData.ine)
        }

        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            body: formData
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
        const formData = new FormData()

        // Agregar datos al FormData
        formData.append("nombre", usuarioData.nombre)
        formData.append("apellidos", usuarioData.apellidos)
        formData.append("telefono", usuarioData.telefono)
        formData.append("correo_electronico", usuarioData.correo_electronico)
        formData.append("id_rol", usuarioData.id_rol)

        // Agregar el archivo si existe
        if (usuarioData.ine instanceof File) {
            formData.append("ine", usuarioData.ine)
        }

        const response = await fetch(`${API_URL}/update/${usuarioData.id}`, {
            method: "PUT",
            body: formData // No se necesita Content-Type aquí
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