// Resources
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faBars, faKey } from "@fortawesome/free-solid-svg-icons"
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
import { useAuth, useRefreshToken } from "../../hooks/auth.hook"
import { useSessionWarning } from "../../hooks/session.warning"
import { useAuthContext } from "../../context/auth.context"

const Navbar = () => {
    // API calls
    const { logout } = useAuth()
    const { user } = useAuthContext()
    const { showWarning, tiempoRestante, setToken } = useSessionWarning()
    const { getRefreshedToken } = useRefreshToken()
    const { fetchDomicilio, domicilio } = useGetDomicilioById()

    const [activeView, setActiveView] = useState("home")
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")

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

    const handleNavClick = (view) => {
        setActiveView(view)
        setIsSidebarOpen(false)
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
            alert("⚠️ Error al extender sesión. Inicia sesión de nuevo.")
            window.location.href = "/login"
        }
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
                    </nav>
                </div>
            )}

            <div className={`st-pusher ${isSidebarOpen ? "active" : ""}`}>
                <div className={`overlay ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar} />
                {/* Welcome message for corresponding view */}
                {activeView === "home" ? (
                    <div className="welcome-message">
                        <p>Bienvenido&nbsp;(a)</p>
                    </div>
                ) : activeView === "historial" ? (
                    <div className="welcome-message">
                        <p>Historial de visitas</p>
                    </div>
                ) : activeView === "visitantes" ? (
                    <div className="welcome-message">
                        <p>Visitantes frecuentes</p>
                    </div>
                ) : activeView === "residentes" ? (
                    <div className="welcome-message">
                        <p>Residentes</p>
                    </div>
                ) : (
                    <div className="welcome-message">
                        <p>Autos</p>
                    </div>
                )}
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
        </div>
    )
}

export default Navbar
