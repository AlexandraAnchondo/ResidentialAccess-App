const API_URL = `${process.env.REACT_APP_API_URL}/conductor`

export const createConductor = async (conductorData) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(conductorData)
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