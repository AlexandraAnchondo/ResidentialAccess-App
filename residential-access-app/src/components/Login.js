// Resources
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../styles/General/Login.scss"

// Hooks & Context
import { useAuth, useRecoverPassword } from "../hooks/auth.hook"
import { useAuthContext } from "../context/auth.context"

// Modals
import NotificationModal from "../components/modals/NotificacionModal"

const Login = () => {
    // API calls
    const { loginUser } = useAuth()
    const { sendEmailToChangePassword } = useRecoverPassword()
    const { setUser } = useAuthContext()

    const navigate = useNavigate()
    const isMobile = useMediaQuery("(max-width: 849px)")

    // State variables
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [verPassword, setVerPassword] = useState(false)
    const [captchaToken, setCaptchaToken] = useState(null)
    const [recordarContraseña, setRecordarContraseña] = useState(false)
    const [mostrarRecuperar, setMostrarRecuperar] = useState(false)
    const [correoRecuperacion, setCorreoRecuperacion] = useState("")
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")

    useEffect(() => {
        const correoGuardado = localStorage.getItem("recordarCorreo")
        if (correoGuardado) {
            setCorreo(correoGuardado)
            setRecordarContraseña(true) // También marcas el checkbox
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!captchaToken) {
            handleNotificationModalMessage("Por favor, verifica el CAPTCHA antes de continuar.")
            return
        }

        if (recordarContraseña) {
            localStorage.setItem("recordarCorreo", correo)
        } else {
            localStorage.removeItem("recordarCorreo")
        }

        try {
            const { rol, user } = await loginUser({ correo_electronico: correo, contraseña: contraseña })
            setUser({ rol, ...user }) // se guarda en contexto y localStorage

            if (rol === "usuario") {
                navigate("/users")
            } else if (rol === "guardia") {
                navigate("/guards")
            } else if (rol === "admin") {
                navigate("/admin")
            } else {
                handleNotificationModalMessage("Rol no reconocido")
            }
        } catch (err) {
            handleNotificationModalMessage("Error al iniciar sesión: " + err.message)
        }
    }

    const handleRecuperarContraseña = async () => {
        if (!correoRecuperacion) {
            handleNotificationModalMessage("Por favor ingresa un correo válido.")
            return
        }

        try {
            const response = await sendEmailToChangePassword(correoRecuperacion)

            if (response.correo != null) {
                handleNotificationModalMessage("Correo de recuperación enviado. Revisa tu bandeja.")
                setMostrarRecuperar(false)
                setCorreoRecuperacion("")
            } else {
                handleNotificationModalMessage(response.error || "Error al intentar recuperar contraseña.")
            }
        } catch (err) {
            handleNotificationModalMessage("Error de red o del servidor.")
        }
    }

    const handleCloseNotificationModal = () => {
        setShowNotificationModal(false)
        setModalMensaje("")
    }

    const handleNotificationModalMessage = (message) => {
        setModalMensaje(message)
        setShowNotificationModal(true)
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
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                        <span className="icon" style={{ cursor: "default" }}>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                    {/* Campo de contraseña */}
                    <div className="input-container">
                        <input
                            type={verPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            required
                        />
                        <span
                            className="icon"
                            onClick={() => setVerPassword(!verPassword)}
                            title={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            <FontAwesomeIcon icon={verPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>

                    {/* CAPTCHA */}
                    <div style={{ marginBottom: "1rem" }}>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                            onChange={(token) => setCaptchaToken(token)}
                            theme="dark"
                            size={isMobile ? "compact" : "normal"}
                        />
                    </div>

                    {/* Opciones */}
                    <div className="login-options">
                        <label>
                            <input
                                type="checkbox"
                                checked={recordarContraseña}
                                onChange={(e) => setRecordarContraseña(e.target.checked)}
                            />

                            Recordar correo
                        </label>
                    </div>

                    {/* Botón */}
                    <button type="submit">Entrar</button>
                </form>
                {mostrarRecuperar && (
                    <div className="recover-container">
                        <h3>Recuperar contraseña</h3>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo"
                            value={correoRecuperacion}
                            onChange={(e) => setCorreoRecuperacion(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleRecuperarContraseña}>
                            Enviar correo
                        </button>
                        <button type="button" onClick={() => setMostrarRecuperar(false)}>
                            Cancelar
                        </button>
                    </div>
                )}

                <p className="forgot-password">
                    <a href="#" onClick={() => setMostrarRecuperar(true)}>
                        ¿Olvidaste tu contraseña?
                    </a>
                </p>

                <p className="no-account">
                    ¿No tiene cuenta? <br />
                    <a href="#">Comuníquese con el administrador</a>
                </p>
            </div>

            <NotificationModal
                message={modalMensaje}
                onClose={handleCloseNotificationModal}
                isOpen={showNotificationModal}
            />
        </div>
    )
}

export default Login
