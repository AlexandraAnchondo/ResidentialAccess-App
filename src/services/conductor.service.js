const API_URL = `${process.env.REACT_APP_API_URL}/conductor`

export const createConductor = async (conductorData) => {
    try {
        const formData = new FormData()

        // Agregar datos al FormData
        if (conductorData.nombre) {
            formData.append("nombre", conductorData.nombre)
        }
        if (conductorData.apellidos) {
            formData.append("apellidos", conductorData.apellidos)
        }
        if (conductorData.id_vehiculo) {
            formData.append("id_vehiculo", conductorData.id_vehiculo)
        }

        // Agregar el archivo si existe
        if (conductorData.ine instanceof File) {
            formData.append("ine", conductorData.ine)
        }

        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Error al crear conductor: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createConductor:", error)
        throw error
    }
}