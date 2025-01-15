import React, { useState } from "react";
import "../../styles/Usuarios/Visitantes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AddVisitanteModal from "./modals/AddVisitanteModal";

const Visitantes = () => {
    // Datos de ejemplo
    const [visitantesData, setVisitantesData] = useState([
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
        },
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
        },
    ]);

    const [showModal, setShowModal] = useState(false); // Estado para controlar el AddVisitanteModal

    const handleAgregarVisitanteClick = () => {
        setShowModal(true); // Mostrar AddVisitanteModal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Ocultar AddVisitanteModal
    };

    const handleBorrarVisitante = (index) => {
        const newVisitantes = visitantesData.filter((_, i) => i !== index); // Eliminar visitante
        setVisitantesData(newVisitantes);
    };

    return (
        <>
            {visitantesData.length === 0 ? (
                <div className="no-data">
                    <FontAwesomeIcon icon={faUserGroup} className="icon-placeholder" />
                    <p>No existe ningún visitante frecuente registrado</p>
                    {/* Si hay menos de 3 visitantes, mostrar el botón de agregar */}
                    <button className="agregar-visitante-button" onClick={handleAgregarVisitanteClick}>
                            Agregar visitante
                    </button>
                </div>
            ) : (
                <div className="visitantes-list">
                    {visitantesData.map((item, index) => (
                        <div className="visitor-container">
                        <section key={index} className="visitor-info">
                            <h3>Información del visitante</h3>
                            <div className="info-container">
                                <div className="info-item">
                                    <label>Nombre:</label>
                                    <span>{item.nombre}</span>
                                </div>
                                <div className="info-item">
                                    <label>Apellido:</label>
                                    <span>{item.apellido}</span>
                                </div>
                                <div className="info-item">
                                    <label>Teléfono:</label>
                                    <span>{item.telefono}</span>
                                </div>
                                <div className="info-item">
                                    <label>Placas:</label>
                                    <span>{item.placas}</span>
                                </div>
                                <div className="info-item">
                                    <label>Modelo:</label>
                                    <span>{item.modelo}</span>
                                </div>
                            </div>
                            <button className="edit-button">Editar</button>
                        </section>
                        <button className="delete-button" onClick={() => handleBorrarVisitante(index)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                        
                    ))}
                    {/* Si hay menos de 3 visitantes, mostrar el botón de agregar */}
                    {visitantesData.length < 3 && (
                        <button className="agregar-visitante-button" onClick={handleAgregarVisitanteClick}>
                            Agregar visitante
                        </button>
                    )}
                </div>
            )}

            {/* AddVisitanteModal */}
            <AddVisitanteModal show={showModal} onClose={handleCloseModal} />
        </>
    );
};

export default Visitantes;
