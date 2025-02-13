import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import "../styles/General/Login.scss"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("") // Estado para el usuario
    const [passwordVisible, setPasswordVisible] = useState(false) // Estado para mostrar u ocultar la contraseña
    const navigate = useNavigate() // Hook para redirigir a otras páginas

    // Función para manejar el inicio de sesión
    const handleLogin = (e) => {
        e.preventDefault() // Evita que se recargue la página
        if (username === "Usuario") {
            navigate("/users") // Redirige a HomePage si el usuario es "Usuario"
        } else if (username === "Guardia")  {
            navigate("/guards") // Redirige a Registro si el usuario es "Guardia"
        } else{
            alert("Usuario no válido") // Mensaje si el usuario no es válido
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
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado
                            required
                        />
                        <span className="icon" style={{ cursor: "default" }}>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                    {/* Campo de contraseña */}
                    <div className="input-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Contraseña"
                            required
                        />
                        <span
                            className="icon"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            title={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
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
