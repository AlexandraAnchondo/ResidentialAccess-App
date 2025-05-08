const API_URL = `${process.env.REACT_APP_API_URL}/usuario`

export const createUsuario = async (usuarioData) => {
    try {
        const formData = new FormData()

        // Agregar datos al FormData
        if (usuarioData.nombre) {
            formData.append("nombre", usuarioData.nombre)
        }
        if (usuarioData.apellidos) {
            formData.append("apellidos", usuarioData.apellidos)
        }
        if (usuarioData.telefono) {
            formData.append("telefono", usuarioData.telefono)
        }
        if (usuarioData.correo_electronico) {
            formData.append("correo_electronico", usuarioData.correo_electronico)
        }
        if (usuarioData.id_rol) {
            formData.append("id_rol", usuarioData.id_rol)
        }
        if (usuarioData.id_domicilio) {
            formData.append("id_domicilio", usuarioData.id_domicilio)
        }
        if (usuarioData.rfc) {
            formData.append("rfc", usuarioData.rfc)
        }

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

export const getUsuarioById = async id_usuario => {
    try {
        const url = `${API_URL}/get/${id_usuario}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error al obtener usuario: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error("Error en getUsuarioById:", error)
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
        if (usuarioData.nombre) {
            formData.append("nombre", usuarioData.nombre)
        }
        if (usuarioData.apellidos) {
            formData.append("apellidos", usuarioData.apellidos)
        }
        if (usuarioData.telefono) {
            formData.append("telefono", usuarioData.telefono)
        }
        if (usuarioData.correo_electronico) {
            formData.append("correo_electronico", usuarioData.correo_electronico)
        }
        if (usuarioData.id_rol) {
            formData.append("id_rol", usuarioData.id_rol)
        }
        if (usuarioData.id_domicilio) {
            formData.append("id_domicilio", usuarioData.id_domicilio)
        }
        if (usuarioData.rfc) {
            formData.append("rfc", usuarioData.rfc)
        }

        if (usuarioData.bloqueado) {
            formData.append("bloqueado", usuarioData.bloqueado)
        }

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