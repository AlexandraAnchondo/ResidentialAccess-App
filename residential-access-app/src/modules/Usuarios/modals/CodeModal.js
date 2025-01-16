import React from "react";
import "../../../styles/Usuarios/CodeModal.css";

const CodeModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="code-modal-overlay">
            <div className="code-modal">
                <div className="code-modal-header">
                    <h2>¿Qué tipo de código desea crear?</h2>
                </div>
                <div className="code-modal-content">
                    <div className="code-modal-options">
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
                <button className="code-modal-close-button" onClick={onClose}>
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default CodeModal;
