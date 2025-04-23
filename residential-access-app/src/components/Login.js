import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import "../styles/General/Login.scss"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/auth.hook"

const Login = () => {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const { loginUser } = useAuth()
    const navigate = useNavigate()

    // Función para manejar el inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { rol } = await loginUser({ correo_electronico: correo, contraseña: "ABC123" })

            if (rol === "usuario") {
                navigate("/users")
            } else if (rol === "guardia") {
                navigate("/guards")
            } else if (rol === "admin") {
                navigate("/admin")
            } else {
                alert("Rol no reconocido")
            }
        } catch (err) {
            alert("Error al iniciar sesión: " + err.message)
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Inicio de sesión</h2>
                <form onSubmit={handleLogin}>
                    {/* Campo de usuario */}
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado
                            required
                        />
                        <span className="icon" style={{ cursor: "default" }}>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                    {/* Campo de contraseña */}
                    <div className="input-container">
                        <input
                            type={password ? "text" : "password"}
                            placeholder="Contraseña"
                            required
                        />
                        <span
                            className="icon"
                            onClick={() => setPassword(!password)}
                            title={password ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            <FontAwesomeIcon icon={password ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {/* Opciones */}
                    <div className="login-options">
                        <label>
                            <input type="checkbox" />
                            Recordar contraseña
                        </label>
                    </div>
                    {/* Botón */}
                    <button type="submit">Entrar</button>
                </form>
                <p className="no-account">
                    ¿No tiene cuenta? <br></br>
                    <a href="#">Comuníquese con el administrador</a>
                </p>
            </div>
        </div>
    )
}

export default Login
