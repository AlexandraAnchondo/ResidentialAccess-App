import React from "react";
import "../../../styles/Usuarios/Modal.css";

const Modal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>¿Qué tipo de código desea crear?</h2>
                </div>
                <div className="modal-content">
                    <div className="modal-options">
                        <label>
                            <input type="checkbox" name="codeType" value="1-month" />
                            Un mes de vigencia
                        </label>
                        <label>
                            <input type="checkbox" name="codeType" value="1-week" />
                            Una semana de vigencia
                        </label>
                        <label>
                            <input type="checkbox" name="codeType" value="1-day" />
                            Un día de vigencia
                        </label>
                    </div>
                </div>
                <button className="modal-close-button" onClick={onClose}>
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default Modal;
