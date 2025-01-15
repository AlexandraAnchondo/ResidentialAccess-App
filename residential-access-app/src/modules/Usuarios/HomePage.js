import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faImage, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import CodeModal from "./modals/CodeModal";
import Historial from "./Historial";
import Visitantes from "./Visitantes";
import "../../styles/Usuarios/HomePage.css";

const HomePage = () => {
    // Definir las variables de estado
    const [name, setName] = useState("Alexandra Anchondo Robles");
    const [address, setAddress] = useState("Av. Ficticia 1234 Fraccionamiento Inexistente Para Pruebas");
    const [phone, setPhone] = useState("(686) 420-49-24");
    const [email, setEmail] = useState("correo@gmail.com");
    const [ineSrc, setIneSrc] = useState("INE.png"); // Ruta de la imagen
    const [showModal, setShowModal] = useState(false); // Estado para controlar el CodeModal
    const [activeView, setActiveView] = useState("home"); // Controlar la vista activa

    const handleNavClick = (view) => {
        setActiveView(view);
    };

    const handleGenerateClick = () => {
        setShowModal(true); // Mostrar CodeModal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Ocultar CodeModal
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="user-name">{name}</h1> {/* Mostrar el nombre desde la variable */}
                <nav className="nav-links">
                    <button
                        className={`nav-button ${activeView === "home" ? "active" : ""}`}
                        onClick={() => handleNavClick("home")}
                    >
                        Domicilio
                    </button>
                    <button
                        className={`nav-button ${activeView === "historial" ? "active" : ""}`}
                        onClick={() => handleNavClick("historial")}
                    >
                        Historial
                    </button>
                    <button
                        className={`nav-button ${activeView === "visitantes" ? "active" : ""}`}
                        onClick={() => handleNavClick("visitantes")}
                    >
                        Visitantes
                    </button>
                    <button className="nav-button logout">
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
                <div className="welcome-message">
                    <p>Visitantes frecuentes</p>
                </div>}

            <main className="home-main">
                {activeView === "historial" ? <Historial /> :
                activeView === "visitantes" ? <Visitantes /> :
                    <>
                        <div className="combined-info">
                            <section className="resident-info">
                                <h2>Información del residente:</h2>
                                <div className="info-item">
                                    <strong>Dirección:</strong>
                                    <input
                                        type="text"
                                        value={address} // Mostrar la dirección desde la variable
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
                                <button className="edit-button">Editar</button>
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
                            <div className="no-code">
                                <p>No existe ningún <br></br>código vigente</p>
                                <FontAwesomeIcon icon={faBoxOpen} className="icon-placeholder" />
                            </div>
                            <button className="generate-button" onClick={handleGenerateClick}>
                                Generar
                            </button>
                        </section>
                    </>
                }
            </main>

            {/* CodeModal */}
            <CodeModal show={showModal} onClose={handleCloseModal} />
        </div>
    );
};

export default HomePage;
