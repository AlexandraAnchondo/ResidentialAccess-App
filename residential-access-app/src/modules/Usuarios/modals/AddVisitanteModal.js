import React from "react";
import "../../../styles/Usuarios/AddVisitanteModal.css";

const CodeModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="add-visitante-modal-overlay">
            <div className="add-visitante-modal">
                <div className="add-visitante-modal-header">
                    <h2>Ingresa la información del visitante</h2>
                </div>
                <div className="add-visitante-modal-content">
                    <div className="add-visitante-modal-options">
                        <label>
                            Nombre:
                            <input type="text" name="nombre"/>
                        </label>
                        <label>
                            Apellido:
                            <input type="text" name="apellido" />
                        </label>
                        <label>
                            Teléfono:
                            <input type="text" name="telefono"/>
                        </label>
                        <label>
                            Placas:
                            <input type="text" name="placas" />
                        </label>
                        <label>
                            Modelo:
                            <input type="text" name="modelo" />
                        </label>
                    </div>
                </div>
                <button className="add-visitante-modal-close-button" onClick={onClose}>
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default CodeModal;
