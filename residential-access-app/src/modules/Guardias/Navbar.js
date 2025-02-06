import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faPaperclip, faReceipt, faBars } from "@fortawesome/free-solid-svg-icons"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../../styles/Navbar.css"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Registro from "../Guardias/Registro"
import VisitasActivas from "../Guardias/VisitasActivas"

const Navbar = () => {
    const [activeView, setActiveView] = useState("Registro de visitas")
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [name, setName] = useState("Alexandra Anchondo Robles")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)") // Detecta tamaño de pantalla
    const navigate = useNavigate() // Hook para redirigir a otras páginas
    const [selectedOption, setSelectedOption] = useState("Registro de visitas")

    useEffect(() => {
        if (isSidebarOpen || showLogoutModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
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
        // Can you use relative redirects instead
        navigate("/login")
    }

    /* Function for closing the logout modal when cancel button is pressed */
    const handleLogoutCancel = () => {
        setShowLogoutModal(false)
    }

    /* Function for toggling the sidebar open and closed */
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        /* registro container that contains all the values for the navbar */
        <div className="nav-container">
            {/* Header that contains the pages when desktop screen or the bars icon when tablet or cellphone */}
            <header
                className="nav-header"
                style={{
                    "--s": "60px", // Tamaño del patrón
                    "--c1": "#004f79",
                    "--c2": "#008db8",
                    "--_g": "radial-gradient(#0000 60%, var(--c1) 61% 63%, #0000 64% 77%, var(--c1) 78% 80%, #0000 81%)",
                    "--_c": ",#0000 75%, var(--c2) 0",
                    background: `
                    conic-gradient(at 12% 20% var(--_c)) calc(var(--s) * 0.44) calc(0.9 * var(--s)),
                    conic-gradient(at 12% 20% var(--_c)) calc(var(--s) * -0.06) calc(0.4 * var(--s)),
                    conic-gradient(at 20% 12% var(--_c)) calc(0.9 * var(--s)) calc(var(--s) * 0.44),
                    conic-gradient(at 20% 12% var(--_c)) calc(0.4 * var(--s)) calc(var(--s) * -0.06),
                    var(--_g),
                    var(--_g) calc(var(--s) / 2) calc(var(--s) / 2) var(--c2)
                    `,
                    backgroundSize: "var(--s) var(--s)",
                    color: "white",
                    padding: "20px",
                    textAlign: "center",
                    position: "relative"
                }}
            >
                {isMobile && // Only show icon when is tablet or cellphone
                    <FontAwesomeIcon
                        icon={faBars}
                        className="menu-icon"
                        onClick={toggleSidebar}
                    />
                }
                {!isSidebarOpen && // Hide user name from header when sidebar is open
                    <h1 className="user-name">Guardia.&nbsp;{name}</h1>
                }
                {!isMobile && // Show nav pages when desktop screen
                    <nav className="nav-links">
                        <button
                            className={`nav-button ${activeView === "Registro de visitas" ? "active" : ""}`}
                            onClick={() => handleNavClick("Registro de visitas")}
                        >
                            <FontAwesomeIcon icon={faPaperclip} />&nbsp;Registro
                        </button>
                        <button
                            className={`nav-button ${activeView === "Visitas activas" ? "active" : ""}`}
                            onClick={() => handleNavClick("Visitas activas")}
                        >
                            <FontAwesomeIcon icon={faReceipt} />&nbsp;Visitas activas
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
                                className={`nav-button ${activeView === "Registro de visitas" ? "active" : ""}`}
                                onClick={() => handleNavClick("Registro de visitas")}
                            >
                                <FontAwesomeIcon icon={faPaperclip} />&nbsp;&nbsp;Registro
                            </button>
                            <button
                                className={`nav-button ${activeView === "Visitas activas" ? "active" : ""}`}
                                onClick={() => handleNavClick("Visitas activas")}
                            >
                                <FontAwesomeIcon icon={faReceipt} />&nbsp;&nbsp;Visitas
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

                <div className="welcome-message">
                    <p>{selectedOption}</p>
                </div>

                {/* Main container that contains the active view */}
                <main className="nav-main">
                    {activeView === "Registro de visitas" ? (
                        <Registro
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />
                    ) : (
                        <VisitasActivas />
                    )}
                </main>
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
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar