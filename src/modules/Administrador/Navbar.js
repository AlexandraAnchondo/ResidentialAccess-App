// Resources
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faPaperclip, faReceipt, faBars, faHomeUser, faUserLock, faCog, faKey, faBell, faBoxArchive } from "@fortawesome/free-solid-svg-icons"
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../../styles/General/Navbar.scss"
import { Button } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"

// Components
import Registro from "./Registro"
import Visitas from "./Visitas"
import Domicilios from "./Domicilios"
import Guardias from "./Guardias"
import Comunicados from "./Comunicados"
import Prestamos from "./Prestamos"

// Hooks
import { useAuth, useRefreshToken, useResetPassword } from "../../hooks/auth.hook"
import { useSessionWarning } from "../../hooks/session.warning"
import { useAuthContext } from "../../context/auth.context"

// Modals
import NotificationModal from "../../components/modals/NotificacionModal"
import ChangePasswordModal from "../../components/modals/ChangePasswordModal"

const Navbar = () => {
    // API calls
    const { logout } = useAuth()
    const { user } = useAuthContext()
    const { changePassword } = useResetPassword()
    const { showWarning, tiempoRestante, setToken } = useSessionWarning()
    const { getRefreshedToken } = useRefreshToken()

    // State variables
    const [activeView, setActiveView] = useState("Registro de usuarios")
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [name, setName] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)") // Detecta tamaño de pantalla
    const [selectedOption, setSelectedOption] = useState("Registro de usuarios")
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")
    const [showSettingsMenu, setShowSettingsMenu] = useState(false)
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

    // Definir la animación de entrada y salida
    const pageVariants = {
        initial: { opacity: 0, x: -20 }, // Comienza invisible y desplazado
        animate: { opacity: 1, x: 0, transition: { duration: 0.2 } }, // Se anima al entrar
        exit: { opacity: 0, x: 20, transition: { duration: 0.2 } } // Se anima al salir
    }

    useEffect(() => {
        if (isSidebarOpen || showLogoutModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    useEffect(() => {
        if (user) {
            setName(`${user.nombre} ${user.apellidos}`)
        } else {
            setName(null)
        }
    })

    /* Function for asigning the corresponding value for active view state and open the sidebar */
    const handleNavClick = (view) => {
        setActiveView(view)
        setIsSidebarOpen(false)
        setSelectedOption(view)
    }

    /* Function for opening the logout modal */
    const handleLogoutClick = () => {
        setIsSidebarOpen(false)
        setTimeout(() => {
            setShowLogoutModal(true)
        }, 450)
    }

    /* Function for closing the logout modal and redirecting to log in page*/
    const handleLogoutConfirm = () => {
        setShowLogoutModal(false)
        logout()
    }

    /* Function for closing the logout modal when cancel button is pressed */
    const handleLogoutCancel = () => {
        setShowLogoutModal(false)
    }

    /* Function for toggling the sidebar open and closed */
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    document.querySelector(".menu-icon")?.addEventListener("click", function () {
    // Desplazarse a la parte superior de la página con animación
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        // Alternar la visibilidad del sidebar
        document.querySelector(".sidebar").classList.toggle("open")

    })

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
            window.location.href = "/"
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

    return (
        /* registro container that contains all the values for the navbar */
        <div className="nav-container">
            {/* Header that contains the pages when desktop screen or the bars icon when tablet or cellphone */}
            <header className="nav-header">
                {isMobile && // Only show icon when is tablet or cellphone
                    <FontAwesomeIcon
                        icon={faBars}
                        className="menu-icon"
                        onClick={toggleSidebar}
                    />
                }
                {!isSidebarOpen && // Hide user name from header when sidebar is open
                    <h1 className="user-name">Admin.&nbsp;{name}</h1>
                }
                {!isMobile && // Show nav pages when desktop screen
                    <nav className="nav-links">
                        <button
                            className={`nav-button ${activeView === "Registro de usuarios" ? "active" : ""}`}
                            onClick={() => handleNavClick("Registro de usuarios")}
                        >
                            <FontAwesomeIcon icon={faPaperclip} />&nbsp;Registro
                        </button>
                        <button
                            className={`nav-button ${activeView === "Visitas" ? "active" : ""}`}
                            onClick={() => handleNavClick("Visitas")}
                        >
                            <FontAwesomeIcon icon={faReceipt} />&nbsp;Visitas
                        </button>
                        <button
                            className={`nav-button ${activeView === "Domicilios" ? "active" : ""}`}
                            onClick={() => handleNavClick("Domicilios")}
                        >
                            <FontAwesomeIcon icon={faHomeUser} />&nbsp;Domicilios
                        </button>
                        <button
                            className={`nav-button ${activeView === "Guardias" ? "active" : ""}`}
                            onClick={() => handleNavClick("Guardias")}
                        >
                            <FontAwesomeIcon icon={faUserLock} />&nbsp;Guardias
                        </button>
                        <button
                            className={`nav-button ${activeView === "Comunicados" ? "active" : ""}`}
                            onClick={() => handleNavClick("Comunicados")}
                        >
                            <FontAwesomeIcon icon={faBell} />&nbsp;Comunicados
                        </button>
                        <button
                            className={`nav-button ${activeView === "Prestamos" ? "active" : ""}`}
                            onClick={() => handleNavClick("Prestamos")}
                        >
                            <FontAwesomeIcon icon={faBoxArchive} />&nbsp;Préstamos
                        </button>
                        <button
                            onClick={handleSettings}
                            className={`nav-button ${isSidebarOpen ? "sidebar-button" : ""}`}
                        >
                            <FontAwesomeIcon icon={faCog} />
                        </button>
                        <button className="nav-button logout" onClick={handleLogoutClick}>
                            <FontAwesomeIcon icon={faDoorOpen} />
                        </button>
                    </nav>
                }
            </header>

            {/* Sidebar that contains the user name and navigation links when tablet or cellphone */}
            {isMobile &&
            <div className="sidebar-container">
                <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <div className="sidebar-header">
                        <h1 className="sidebar-user-name">{name}</h1>
                        <h2 className="sidebar-perfil-title">Perfil</h2>
                    </div>
                    {isSidebarOpen &&
                        <nav className="nav-links-sidebar">
                            <button
                                className={`nav-button ${activeView === "Registro de usuarios" ? "active" : ""}`}
                                onClick={() => handleNavClick("Registro de usuarios")}
                            >
                                <FontAwesomeIcon icon={faPaperclip} />&nbsp;&nbsp;Registro
                            </button>
                            <button
                                className={`nav-button ${activeView === "Visitas" ? "active" : ""}`}
                                onClick={() => handleNavClick("Visitas")}
                            >
                                <FontAwesomeIcon icon={faReceipt} />&nbsp;&nbsp;Visitas
                            </button>
                            <button
                                className={`nav-button ${activeView === "Domicilios" ? "active" : ""}`}
                                onClick={() => handleNavClick("Domicilios")}
                            >
                                <FontAwesomeIcon icon={faHomeUser} />&nbsp;Domicilios
                            </button>
                            <button
                                className={`nav-button ${activeView === "Guardias" ? "active" : ""}`}
                                onClick={() => handleNavClick("Guardias")}
                            >
                                <FontAwesomeIcon icon={faUserLock} />&nbsp;Guardias
                            </button>
                            <button
                                className={`nav-button ${activeView === "Comunicados" ? "active" : ""}`}
                                onClick={() => handleNavClick("Comunicados")}
                            >
                                <FontAwesomeIcon icon={faBell} />&nbsp;Comunicados
                            </button>
                            <button
                                className={`nav-button ${activeView === "Prestamos" ? "active" : ""}`}
                                onClick={() => handleNavClick("Prestamos")}
                            >
                                <FontAwesomeIcon icon={faBoxArchive} />&nbsp;Prestamos
                            </button>
                            <button
                                onClick={handleSettings}
                                className={`nav-button ${isSidebarOpen ? "sidebar-button" : ""}`}
                            >
                                <FontAwesomeIcon icon={faCog} />&nbsp;Configuración
                            </button>
                            <button className="nav-button logout" onClick={handleLogoutClick}>
                                <FontAwesomeIcon icon={faDoorOpen} />&nbsp;&nbsp;Cerrar sesión
                            </button>
                        </nav>
                    }
                </div>
            </div>
            }

            {/* Container that has the logic for pushing the main content when sidebar is open */}
            <div className={`st-pusher ${isSidebarOpen ? "active" : ""}`}>
                <div
                    className={`overlay ${isSidebarOpen ? "active" : ""}`}
                    onClick={toggleSidebar}
                />

                <div key={selectedOption} className="welcome-message">
                    <p>{selectedOption}</p>
                </div>

                {/* Main container that contains the active view */}
                <AnimatePresence mode="wait">
                    <motion.main
                        key={activeView}
                        initial={isSidebarOpen ? {} : "initial"} // No hay animación si isSidebarOpen es true
                        animate={isSidebarOpen ? {} : "animate"}
                        exit={isSidebarOpen ? {} : "exit"}
                        variants={isSidebarOpen ? {} : pageVariants} // Usa variants solo si el sidebar está cerrado
                        className="nav-main"
                    >
                        {activeView === "Registro de usuarios" ? (
                            <Registro
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                            />
                        ) : activeView === "Visitas" ? (
                            <Visitas />
                        ) : activeView === "Domicilios" ? (
                            <Domicilios />
                        ) : activeView === "Guardias" ? (
                            <Guardias />
                        ) : activeView === "Comunicados" ? (
                            <Comunicados />
                        ) : (
                            <Prestamos />
                        )}
                    </motion.main>
                </AnimatePresence>
            </div>

            {/* Logout modal that appears when user clicks on logout button */}
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
                                onClick={handleLogoutCancel}
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
                    <button onClick={handleRefreshToken}>Seguir conectado</button>
                </div>
            )}

            {showSettingsMenu && (
                <div className="settings-dropdown">
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
                            setShowSettingsMenu(false)
                        }}
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

            <NotificationModal
                message={modalMensaje}
                onClose={handleCloseNotificationModal}
                isOpen={showNotificationModal}
            />
        </div>
    )
}

export default Navbar