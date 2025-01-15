import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faImage } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Usuarios/HomePage.css";

const HomePage = () => {
    const imageSrc = "INE.png"; // Ruta de la imagen

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="user-name">Alexandra Anchondo Robles</h1>
                <nav className="nav-links">
                    <button className="nav-button active">Domicilio</button>
                    <button className="nav-button">Historial</button>
                    <button className="nav-button">Visitantes</button>
                    <button className="nav-button logout">
                        <FontAwesomeIcon icon={faDoorOpen} />
                    </button>
                </nav>
            </header>

            <div className="welcome-message">
                <p>Bienvenido (a)</p>
            </div>

            <main className="home-main">
                <div className="combined-info">
                    <section className="resident-info">
                        <h2>Información del residente</h2>
                        <div className="info-item">
                            <strong>Dirección:</strong>
                            <input
                                type="text"
                                defaultValue="Av. Ficticia 1234 Fraccionamiento Inexistente Para Pruebas"
                                readOnly
                            />
                        </div>
                        <div className="info-item">
                            <strong>Teléfono:</strong>
                            <input type="text" defaultValue="(686) 420-49-24" readOnly />
                        </div>
                        <div className="info-item">
                            <strong>Correo:</strong>
                            <input type="email" defaultValue="correo@gmail.com" readOnly />
                        </div>
                        <button className="edit-button">Editar</button>
                    </section>

                    <section className="id-photo">
                        <h2>Foto de Identificación:</h2>
                        {imageSrc == null || imageSrc === "" ? (
                            <div className="no-image">
                                <p>No se ha proporcionado la INE</p>
                                <FontAwesomeIcon icon={faImage} className="icon-placeholder" />
                            </div>
                        ) : <center><img src={imageSrc} alt="Foto de identificación"/></center>
                        }
                    </section>
                </div>

                <section className="code-generator">
                    <h2>Generador de códigos:</h2>
                    <div className="no-code">
                        <p>No existe ningún código vigente</p>
                        <FontAwesomeIcon icon={faImage} className="icon-placeholder" />
                    </div>
                    <button className="generate-button">Generar</button>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
