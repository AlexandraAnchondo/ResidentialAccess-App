import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faQrcode, faHouse, faReceipt, faCar, faUserGroup, faBars } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "@mui/material/useMediaQuery";
import Historial from "./Historial";
import Visitantes from "./Visitantes";
import Residentes from "./Residentes";
import Autos from "./Autos";
import HomePage from "./HomePage";
import "../../styles/Usuarios/Navbar.css";
import { Button } from "@mui/material";

const Navbar = () => {
    const [activeView, setActiveView] = useState("home");
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [name, setName] = useState("Alexandra Anchondo Robles");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)"); // Detecta tamaño de pantalla

    /* Function for asigning the corresponding value for active view state and open the sidebar */
    const handleNavClick = (view) => {
        setActiveView(view);
        setIsSidebarOpen(false); 
    };

    /* Function for opening the logout modal */
    const handleLogoutClick = () => {
        toggleSidebar();
        setTimeout(() => {
            setShowLogoutModal(true);
        }, 350);
        
    };

    /* Function for closing the logout modal and redirecting to log in page*/
    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        window.location.href = "http://localhost:3000/";
    };

    /* Function for closing the logout modal when cancel button is pressed */
    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    /* Function for toggling the sidebar open and closed */
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        /* Home container that contains all the values for the navbar */
        <div className="home-container">
            {/* Header that contains the pages when desktop screen or the bars icon when tablet or cellphone */}
            <header className="home-header">
                {isMobile && // Only show icon when is tablet or cellphone
                    <FontAwesomeIcon
                    icon={faBars}
                    className="menu-icon"
                    onClick={toggleSidebar}
                />
                }
                {!isSidebarOpen && // Hide user name from header when sidebar is open
                    <h1 className="user-name">{name}</h1>
                }
                {!isMobile && // Show nav pages when desktop screen
                    <nav className="nav-links">
                    <button
                        className={`nav-button ${activeView === "home" ? "active" : ""}`}
                        onClick={() => handleNavClick("home")}
                    >
                        <FontAwesomeIcon icon={faQrcode} />&nbsp;Códigos QR 
                    </button>
                    <button
                        className={`nav-button ${activeView === "historial" ? "active" : ""}`}
                        onClick={() => handleNavClick("historial")}
                    >
                        <FontAwesomeIcon icon={faReceipt} />&nbsp;Visitas
                    </button>
                    <button
                        className={`nav-button ${activeView === "visitantes" ? "active" : ""}`}
                        onClick={() => handleNavClick("visitantes")}
                    >
                        <FontAwesomeIcon icon={faUserGroup} />&nbsp;Visitantes
                    </button>
                    <button
                        className={`nav-button ${activeView === "residentes" ? "active" : ""}`}
                        onClick={() => handleNavClick("residentes")}
                    >
                        <FontAwesomeIcon icon={faHouse} />&nbsp;Residentes
                    </button>
                    <button
                        className={`nav-button ${activeView === "autos" ? "active" : ""}`}
                        onClick={() => handleNavClick("autos")}
                    >
                        <FontAwesomeIcon icon={faCar} />&nbsp;Autos
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
                    <nav className="nav-links-sidebar">
                        <button
                            className={`nav-button ${activeView === "home" ? "active" : ""}`}
                            onClick={() => handleNavClick("home")}
                        >
                            <FontAwesomeIcon icon={faQrcode} />&nbsp;&nbsp;Códigos QR
                        </button>
                        <button
                            className={`nav-button ${activeView === "historial" ? "active" : ""}`}
                            onClick={() => handleNavClick("historial")}
                        >
                            <FontAwesomeIcon icon={faReceipt} />&nbsp;&nbsp;Visitas
                        </button>
                        <button
                            className={`nav-button ${activeView === "visitantes" ? "active" : ""}`}
                            onClick={() => handleNavClick("visitantes")}
                        >
                            <FontAwesomeIcon icon={faUserGroup} />&nbsp;&nbsp;Visitantes
                        </button>
                        <button
                            className={`nav-button ${activeView === "residentes" ? "active" : ""}`}
                            onClick={() => handleNavClick("residentes")}
                        >
                            <FontAwesomeIcon icon={faHouse} />&nbsp;&nbsp;Residentes
                        </button>
                        <button
                            className={`nav-button ${activeView === "autos" ? "active" : ""}`}
                            onClick={() => handleNavClick("autos")}
                        >
                            <FontAwesomeIcon icon={faCar} />&nbsp;&nbsp;Autos
                        </button>
                        <button className="nav-button logout" onClick={handleLogoutClick}>
                            <FontAwesomeIcon icon={faDoorOpen} />&nbsp;&nbsp;Cerrar sesión
                        </button>
                    </nav>
                </div>
            </div>
            }
            
            {/* Container that has the logic for pushing the main content when sidebar is open */}
            <div className={`st-pusher ${isSidebarOpen ? "active" : ""}`}>
                <div
                    className={`overlay ${isSidebarOpen ? "active" : ""}`}
                    onClick={toggleSidebar}
                />

                {/* Welcome message for corresponding view */}
                {activeView === "home" ? (
                    <div className="welcome-message">
                        <p>Bienvenido (a)</p>
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

                {/* Main container that contains the active view */}
                <main className="nav-main">
                    {activeView === "historial" ? (
                        <Historial />
                    ) : activeView === "visitantes" ? (
                        <Visitantes />
                    ) : activeView === "residentes" ? (
                        <Residentes />
                    ) : activeView === "autos" ? (
                        <Autos />
                    ) : (
                        <HomePage />
                    )}
                </main>
            </div>

            {/* Logout modal that appears when user clicks on logout button */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="logout-modal-content">
                        <p>
                            ¿Deseas cerrar sesión? <FontAwesomeIcon icon={faDoorOpen} />
                        </p>
                        <div className="logout-modal-actions">
                            <Button
                                variant="contained"
                                onClick={handleLogoutConfirm}
                                sx={{
                                    backgroundColor: "#00a8cc",
                                    "&:hover": { backgroundColor: "#00a8ccCC" },
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
    );
};

export default Navbar;