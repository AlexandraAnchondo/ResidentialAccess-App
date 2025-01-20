import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faQrcode, faHouse, faReceipt, faCar, faUserGroup } from "@fortawesome/free-solid-svg-icons";
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

    const handleNavClick = (view) => {
        setActiveView(view);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true); 
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        window.location.href = "http://localhost:3000/"; // Redirigir al inicio de sesión
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false); 
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="user-name">{name}</h1> 
                <nav className="nav-links">
                    <button
                        className={`nav-button ${activeView === "home" ? "active" : ""}`}
                        onClick={() => handleNavClick("home")}
                    >
                        <FontAwesomeIcon icon={faQrcode} /> Códigos QR 
                    </button>
                    <button
                        className={`nav-button ${activeView === "historial" ? "active" : ""}`}
                        onClick={() => handleNavClick("historial")}
                    >
                        <FontAwesomeIcon icon={faReceipt} /> Visitas
                    </button>
                    <button
                        className={`nav-button ${activeView === "visitantes" ? "active" : ""}`}
                        onClick={() => handleNavClick("visitantes")}
                    >
                        <FontAwesomeIcon icon={faUserGroup} /> Visitantes
                    </button>
                    <button
                        className={`nav-button ${activeView === "residentes" ? "active" : ""}`}
                        onClick={() => handleNavClick("residentes")}
                    >
                        <FontAwesomeIcon icon={faHouse} /> Residentes
                    </button>
                    <button
                        className={`nav-button ${activeView === "autos" ? "active" : ""}`}
                        onClick={() => handleNavClick("autos")}
                    >
                        <FontAwesomeIcon icon={faCar} /> Autos
                    </button>
                    <button className="nav-button logout" onClick={handleLogoutClick}>
                        <FontAwesomeIcon icon={faDoorOpen} />
                    </button>
                </nav>
            </header>

            {activeView === "home" ? (
                <div className="welcome-message">
                    <p>Bienvenido (a)</p>
                </div>) : 
            activeView === "historial" ? (
                <div className="welcome-message">
                    <p>Historial de visitas</p>
                </div>) : 
            activeView === "visitantes" ? (
                <div className="welcome-message">
                    <p>Visitantes frecuentes</p>
                </div>) :
            activeView === "residentes" ? (
                <div className="welcome-message">
                    <p>Residentes</p>
                </div>) : 
                <div className="welcome-message">
                    <p>Autos</p>
                </div>
            }

            <main className="home-main">
                {activeView === "historial" ? <Historial /> :
                activeView === "visitantes" ? <Visitantes /> :
                activeView === "residentes" ? <Residentes /> :
                activeView === "autos" ? <Autos /> :
                    <HomePage />
                }
            </main>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="logout-modal-content">
                        <p>¿Deseas cerrar sesión? <FontAwesomeIcon icon={faDoorOpen}/></p>
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
