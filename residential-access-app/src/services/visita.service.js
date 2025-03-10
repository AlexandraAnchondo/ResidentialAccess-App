const API_URL = `${process.env.REACT_APP_API_URL}/visita`

export const createVisitaVisitante = async (visitaData) => {
    try {
        const response = await fetch(`${API_URL}/create_visita_visitante`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitaData)
        })

        if (!response.ok) {
            throw new Error(`Error al crear visita: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error en createVisitaVisitante:", error)
        throw error
    }
}