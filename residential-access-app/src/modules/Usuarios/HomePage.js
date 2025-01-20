import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faImage, faBoxOpen, faShareAlt, faQrcode, faPerson, faHouse, faReceipt, faPencil, faCar } from "@fortawesome/free-solid-svg-icons";
import CodeModal from "./modals/CodeModal";
import Historial from "./Historial";
import Visitantes from "./Visitantes";
import Residentes from "./Residentes";
import Autos from "./Autos";
import "../../styles/Usuarios/HomePage.css";
import { Button } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react"; // Librería para generar QR
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup";

const HomePage = () => {
    // Definir las variables de estado
    const [name, setName] = useState("Alexandra Anchondo Robles");
    const [address, setAddress] = useState("Av. Ficticia 1234 Fraccionamiento Inexistente Para Pruebas");
    const [phone, setPhone] = useState("(686) 420-49-24");
    const [email, setEmail] = useState("correo@gmail.com");
    const [ineSrc, setIneSrc] = useState("INE.png"); 
    const [showModal, setShowModal] = useState(false); 
    const [activeView, setActiveView] = useState("home"); 
    const [showLogoutModal, setShowLogoutModal] = useState(false); 
    const [qrCodes, setQrCodes] = useState([]); 

    const handleNavClick = (view) => {
        setActiveView(view);
    };

    const handleGenerateClick = () => {
        setShowModal(true); 
    };

    const handleCloseModal = (newQrCodes) => {
        setShowModal(false);
        if (newQrCodes && newQrCodes.length > 0) {
            setQrCodes(() => [...newQrCodes]);
        }
    };

    const handleShareClick = (code) => {
        navigator.share({
            title: "Código QR",
            text: `Aquí tienes un código QR con vencimiento en ${code.duration}`,
        });
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
                    <>
                        <div className="combined-info">
                            <section className="resident-info">
                                <h2>Información del residente:</h2>
                                <div className="info-item">
                                    <strong>Dirección:</strong>
                                    <input
                                        type="text"
                                        value={address} 
                                        readOnly
                                    />
                                </div>
                                <div className="info-item">
                                    <strong>Teléfono:</strong>
                                    <input type="text" value={phone} readOnly /> {/* Mostrar teléfono */}
                                </div>
                                <div className="info-item">
                                    <strong>Correo:</strong>
                                    <input type="email" value={email} readOnly /> {/* Mostrar correo */}
                                </div>
                                <Button
                                    variant="contained"
                                    className="edit-button"
                                    sx={{
                                        color: '#ffff',
                                        backgroundColor: "#00a8cc",
                                        borderColor: "#00a8cc",
                                        "&:hover": { borderColor: "#00a8ccCC", backgroundColor: "#00a8ccCC" },
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPencil} /> Editar
                                </Button>
                            </section>

                            <section className="id-photo">
                                <h2>Foto de Identificación:</h2>
                                {ineSrc == null || ineSrc === "" ? (
                                    <div className="no-image">
                                        <p>No se ha proporcionado la INE</p>
                                        <FontAwesomeIcon icon={faImage} className="icon-placeholder" />
                                    </div>
                                ) : (
                                    <center>
                                        <img src={ineSrc} alt="Foto de identificación" />
                                    </center>
                                )}
                            </section>
                        </div>

                        <section className="code-generator">
                            <h2>Generador de códigos:</h2>
                            {qrCodes.length === 0 ? (
                                <div className="no-code">
                                    <p>No existe ningún <br />código vigente</p>
                                    <FontAwesomeIcon icon={faBoxOpen} className="icon-placeholder" />
                                </div>
                            ) : (
                                <div className="qr-codes-container">
                                    {qrCodes.map((code, index) => (
                                        <div
                                            key={code.id}
                                            className={`qr-code-card position-${index % 2 === 0 ? "left" : "right"}`}
                                        >
                                            {/* Imagen QR */}
                                            <QRCodeCanvas value={code.id} size={150} />
                                            {/* Contenedor del texto y botón */}
                                            <div className="content">
                                                <p>Vence en: {code.duration}</p>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<FontAwesomeIcon icon={faShareAlt} />}
                                                    onClick={() => handleShareClick(code)}
                                                >
                                                    Compartir
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleGenerateClick}
                                disabled={qrCodes.length === 3}
                                sx={{
                                    backgroundColor: "#00a8cc",
                                    "&:hover": { backgroundColor: "#00a8ccCC" },
                                }}
                                startIcon={<FontAwesomeIcon icon={faQrcode} />}
                            >
                                Generar
                            </Button>
                        </section>
                    </>
                }
            </main>

            {/* CodeModal */}
            <CodeModal
                show={showModal}
                onClose={handleCloseModal}
                existingCodes={qrCodes} // Lista de códigos existentes
            />

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

export default HomePage;
