// Resources
import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import "../styles/General/ResetPassword.scss"

// Hooks
import { useResetPassword } from "../hooks/auth.hook"

const ResetPassword = () => {
    const { changePassword } = useResetPassword()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [nuevaContraseña, setNuevaContraseña] = useState("")
    const [confirmarContraseña, setConfirmarContraseña] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [mostrarContraseña, setMostrarContraseña] = useState(false)
    const [errores, setErrores] = useState({ nueva: false, confirmar: false })

    const token = searchParams.get("token")
    const correo = searchParams.get("correo")

    useEffect(() => {
        if (!token) {
            setMensaje("Token inválido o expirado")
        }
    }, [token])

    const validarContraseñaFuerte = (contraseña) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
        return regex.test(contraseña)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const esFuerte = validarContraseñaFuerte(nuevaContraseña)
        const coinciden = nuevaContraseña === confirmarContraseña

        if (!esFuerte || !coinciden) {
            setErrores({
                nueva: !esFuerte,
                confirmar: !coinciden
            })
            setMensaje(
                !esFuerte
                    ? "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo."
                    : "Las contraseñas no coinciden"
            )
            return
        }

        try {
            const response = await changePassword({ token, correo, nuevaContraseña })
            if (response.id_usuario != null) {
                alert("Contraseña actualizada con éxito. Ahora puedes iniciar sesión.")
                navigate("/")
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
                    <div className="input-group">
                        <input
                            type={mostrarContraseña ? "text" : "password"}
                            placeholder="Nueva contraseña"
                            value={nuevaContraseña}
                            onChange={(e) => setNuevaContraseña(e.target.value)}
                            className={errores.nueva ? "input-error" : ""}
                            required
                        />
                        <FontAwesomeIcon
                            icon={mostrarContraseña ? faEyeSlash : faEye}
                            className="toggle-icon"
                            onClick={() => setMostrarContraseña(!mostrarContraseña)}
                        />
                    </div>

                    <div className="input-group" style={{ marginTop: "15px" }}>
                        <input
                            type={mostrarContraseña ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={confirmarContraseña}
                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                            className={errores.confirmar ? "input-error" : ""}
                            required
                        />
                    </div>

                    {mensaje && <p style={{ color: "red", marginTop: "10px" }}>{mensaje}</p>}
                    <button style={{ marginTop: "15px" }} type="submit">
                        Cambiar contraseña
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
