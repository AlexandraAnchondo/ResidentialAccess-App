// Resources
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faBars, faKey, faCog, faBell } from "@fortawesome/free-solid-svg-icons"
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../../styles/General/Navbar.scss"
import { Button } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"

// Components
import Historial from "./Historial"
import Visitantes from "./Visitantes"
import Residentes from "./Residentes"
import Vehiculos from "./Vehiculos"
import HomePage from "./HomePage"
import NavButtons from "./NavButtons"

// Hooks
import {
    useGetDomicilioById
} from "../../hooks/domicilio.hook"
import { useAuth, useRefreshToken, useResetPassword } from "../../hooks/auth.hook"
import { useSessionWarning } from "../../hooks/session.warning"
import { useAuthContext } from "../../context/auth.context"

// Modals
import NotificationModal from "../../components/modals/NotificacionModal"
import ChangePasswordModal from "../../components/modals/ChangePasswordModal"
import VisitasNotificationsModal from "./modals/VisitasNotificationsModal"

const Navbar = () => {
    // API calls
    const { logout } = useAuth()
    const { user } = useAuthContext()
    const { changePassword } = useResetPassword()
    const { showWarning, tiempoRestante, setToken } = useSessionWarning()
    const { getRefreshedToken } = useRefreshToken()
    const { fetchDomicilio, domicilio } = useGetDomicilioById()

    const [activeView, setActiveView] = useState("home")
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [selectedOption, setSelectedOption] = useState("Bienvenido (a)")
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")
    const [showSettingsMenu, setShowSettingsMenu] = useState(false)
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
    const [showVisitasNotificationsModal, setShowVisitasNotificationsModal] = useState(false)
    const [closing, setClosing] = useState(false)

    // Definir la animación de entrada y salida
    const pageVariants = {
        initial: { opacity: 0, x: -20 }, // Comienza invisible y desplazado
        animate: { opacity: 1, x: 0, transition: { duration: 0.2 } }, // Se anima al entrar
        exit: { opacity: 0, x: 20, transition: { duration: 0.2 } } // Se anima al salir
    }

    useEffect(() => {
        if (isSidebarOpen || showLogoutModal) {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }

        if (isSidebarOpen) {
            window.scrollTo(0, window.scrollY)
        }
    }, [isSidebarOpen, showLogoutModal])

    // Cargar domicilio cuando ya se tenga el usuario
    useEffect(() => {
        if (user?.id_domicilio && domicilio == null) {
            fetchDomicilio(user.id_domicilio)
        }
    }, [user, fetchDomicilio])

    const handleNavClick = (view, label) => {
        setActiveView(view)
        setIsSidebarOpen(false)
        setSelectedOption(label)
    }

    const handleLogoutClick = () => {
        setIsSidebarOpen(false)
        setTimeout(() => setShowLogoutModal(true), 450)
    }

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false)
        logout()
    }

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

    const handleRefreshToken = async () => {
        try {
            const response = await getRefreshedToken()
            if (!response?.token) {
                return
            }

            localStorage.setItem("token", response.token)
            setToken(response.token)
        } catch (err) {
            handleNotificationModalMessage("⚠️ Error al extender sesión. Inicia sesión de nuevo.")
            window.location.href = "/login"
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

    const handleSettings = () => {
        setShowSettingsMenu(!showSettingsMenu)
    }

    const handlePasswordChange = async (nuevaContraseña) => {
        const token = localStorage.getItem("token")
        const correo = user.correo_electronico
        try {
            const response = await changePassword({ token, correo, nuevaContraseña })
            if (response.id_usuario != null) {
                handleNotificationModalMessage("Contraseña actualizada con éxito. Ahora puedes iniciar sesión con la nueva contraseña.")
            } else {
                handleNotificationModalMessage(response.error || "Error al cambiar la contraseña")
            }
        } catch (err) {
            handleNotificationModalMessage("Error de red o del servidor.")
        }
        setShowChangePasswordModal(false)
        setShowSettingsMenu(false)
    }

    const handleNotificationsChange = async () => {

    }

    const handleClose = () => {
        setClosing(true)
        setTimeout(() => {
            setShowSettingsMenu(false)
            setClosing(false)
        }, 300)
    }

    return (
        <div className="nav-container">
            <header className="nav-header">
                {isMobile && <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleSidebar} aria-label="Abrir menú" />}
                {!isSidebarOpen && <h1 className="user-name">{`${domicilio?.calle} ${domicilio?.numero_calle}`}</h1>}
                {!isMobile && (
                    <nav className="nav-links">
                        <NavButtons
                            activeView={activeView}
                            onClick={handleNavClick}
                            logout={handleLogoutClick}
                        />
                        <button
                            onClick={handleSettings}
                            className={`nav-button ${isSidebarOpen ? "sidebar-button" : ""}`}
                        >
                            <FontAwesomeIcon icon={faCog} />
                        </button>
                    </nav>
                )}
            </header>

            {isMobile && (
                <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <div className="sidebar-header">
                        <h1 className="sidebar-user-name">{`${domicilio?.calle} ${domicilio?.numero_calle}`}</h1>
                        <h2 className="sidebar-perfil-title">Perfil</h2>
                    </div>
                    <nav className="nav-links-sidebar">
                        <NavButtons
                            activeView={activeView}
                            onClick={handleNavClick}
                            logout={handleLogoutClick}
                            isMobile={isMobile}
                        />
                        <button
                            onClick={handleSettings}
                            className={`nav-button ${isSidebarOpen ? "sidebar-button" : ""}`}
                        >
                            <FontAwesomeIcon icon={faCog} />&nbsp;Configuración
                        </button>
                    </nav>
                </div>
            )}

            <div className={`st-pusher ${isSidebarOpen ? "active" : ""}`}>
                <div className={`overlay ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar} />
                {/* Welcome message for corresponding view */}
                <div key={selectedOption} className="welcome-message">
                    <p>{selectedOption}</p>
                </div>
                <AnimatePresence mode="wait">
                    <motion.main
                        key={activeView}
                        initial={isSidebarOpen ? {} : "initial"} // No hay animación si isSidebarOpen es true
                        animate={isSidebarOpen ? {} : "animate"}
                        exit={isSidebarOpen ? {} : "exit"}
                        variants={isSidebarOpen ? {} : pageVariants} // Usa variants solo si el sidebar está cerrado
                        className="nav-main"
                    >
                        {activeView === "historial" ? (
                            <Historial id_domicilio={user?.id_domicilio}/>
                        ) : activeView === "visitantes" ? (
                            <Visitantes id_domicilio={user?.id_domicilio}/>
                        ) : activeView === "residentes" ? (
                            <Residentes id_domicilio={user?.id_domicilio}/>
                        ) : activeView === "vehiculos" ? (
                            <Vehiculos id_domicilio={user?.id_domicilio}/>
                        ) : (
                            <HomePage id_domicilio={user?.id_domicilio} name={`${user?.nombre} ${user?.apellidos}`} phone={user?.telefono} email={user?.correo_electronico} ineSrc={user?.ine} />
                        )}
                    </motion.main>
                </AnimatePresence>
            </div>

            {showLogoutModal && (
                <div className="logout-modal-background">
                    <div className="logout-modal">
                        <p>
                            ¿Deseas cerrar sesión?&nbsp;<FontAwesomeIcon icon={faDoorOpen} />
                        </p>
                        <svg
                            className="modal-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            viewBox="0 0 300 90"
                            preserveAspectRatio="none"
                        >
                            <rect
                                x="0"
                                y="0"
                                fill="none"
                                width="300"
                                height="90"
                                rx="3"
                                ry="3"
                            ></rect>
                        </svg>
                        <div className="logout-modal-actions">
                            <Button
                                variant="contained"
                                onClick={handleLogoutConfirm}
                                startIcon={<CheckIcon />}
                                sx={{
                                    backgroundColor: "#00a8cc",
                                    "&:hover": { backgroundColor: "#00a8ccCC" }
                                }}
                            >
                                Aceptar
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setShowLogoutModal(false)}
                                startIcon={<CloseIcon />}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {showWarning && (
                <div className="session-warning">
                    <p>⚠️ Tu sesión expira pronto ({Math.round(tiempoRestante)}s)</p>
                    <button onClick={handleRefreshToken}>Seguir conectado &nbsp;<FontAwesomeIcon icon={faKey} color="#855918"/></button>
                </div>
            )}

            {showSettingsMenu && (
                <div className={`settings-dropdown ${closing ? "scale-down-notification " : ""}`}>
                    <Button
                        onClick={() => {
                            setShowChangePasswordModal(true)
                            setShowSettingsMenu(false)
                        }}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon={faKey} />}
                        size="small"
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": "#00a8ccCC"
                        }}
                    >
                        Cambiar contraseña
                    </Button>
                    <Button
                        onClick={() => {
                            setShowVisitasNotificationsModal(true)
                            setShowSettingsMenu(false)
                        }}
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon={faBell} />}
                        size="small"
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": "#00a8ccCC"
                        }}
                    >
                        Notificaciones
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        size="small"
                    >
                        Cancelar
                    </Button>
                </div>
            )}

            <ChangePasswordModal
                isOpen={showChangePasswordModal}
                onClose={() => setShowChangePasswordModal(false)}
                onSubmit={handlePasswordChange}
            />

            <VisitasNotificationsModal
                isOpen={showVisitasNotificationsModal}
                onClose={() => setShowVisitasNotificationsModal(false)}
                onSubmit={handleNotificationsChange}
            />

            <NotificationModal
                message={modalMensaje}
                onClose={handleCloseNotificationModal}
                isOpen={showNotificationModal}
            />
        </div>
    )
}

export default Navbar
