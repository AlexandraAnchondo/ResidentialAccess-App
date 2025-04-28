// Resources
import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

// Hooks
import { useResetPassword } from "../hooks/auth.hook"

const ResetPassword = () => {
    // API calls
    const { changePassword } = useResetPassword()

    const navigate = useNavigate()

    // State variables
    const [searchParams] = useSearchParams()
    const [nuevaContraseña, setNuevaContraseña] = useState("")
    const [confirmarContraseña, setConfirmarContraseña] = useState("")
    const [mensaje, setMensaje] = useState("")

    // Parameters
    const token = searchParams.get("token")
    const correo = searchParams.get("correo")

    useEffect(() => {
        if (!token) {
            setMensaje("Token inválido o expirado")
        }
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (nuevaContraseña !== confirmarContraseña) {
            setMensaje("Las contraseñas no coinciden")
            return
        }

        try {
            const response = await changePassword({ token, correo, nuevaContraseña })
            if (response.id_usuario != null) {
                alert("Contraseña actualizada con éxito. Ahora puedes iniciar sesión.")
                navigate("/login") // Redirigir al login
            } else {
                alert(response.error || "Error al cambiar la contraseña")
            }
        } catch (err) {
            alert("Error de red o del servidor.")
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Restablecer contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={nuevaContraseña}
                        onChange={(e) => setNuevaContraseña(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirmarContraseña}
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                        style={{ marginTop: "15px" }}
                        required
                    />
                    {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
                    <button style={{ marginTop: "15px" }} type="submit">Cambiar contraseña</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
