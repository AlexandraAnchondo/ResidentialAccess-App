import React, { useState, useEffect } from "react";
import "../../../styles/Usuarios/AddVisitanteModal.css";

const AddVisitanteModal = ({ show, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        placas: "",
        modelo: "",
    });

    useEffect(() => {
        if (!show) {
            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                placas: "",
                modelo: "",
            });
        }
    }, [show]);

    const handleinputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
        const formattedPhone = value
            .slice(0, 10) // Limita a 10 dígitos
            .replace(/(\d{3})(\d{3})(\d{0,4})/, "($1) $2-$3"); // Formato (###) ###-####
        setFormData({ ...formData, telefono: formattedPhone });
    };

    const handleAcceptClick = () => {
        if (
            !formData.nombre ||
            !formData.apellido ||
            !formData.telefono ||
            !formData.placas ||
            !formData.modelo
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }
        onAdd(formData);
        onClose();
    };

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
                            <input
                                iconPosition="left"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleinputChange}
                            />
                        </label>
                        <label>
                            Apellido:
                            <input
                                iconPosition="left"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleinputChange}
                            />
                        </label>
                        <label>
                            Teléfono:
                            <input
                                iconPosition="left"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handlePhoneChange}
                                maxLength={14}
                            />
                        </label>
                        <label>
                            Placas:
                            <input
                                iconPosition="left"
                                name="placas"
                                value={formData.placas}
                                onChange={handleinputChange}
                            />
                        </label>
                        <label>
                            Modelo:
                            <input
                                iconPosition="left"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleinputChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="add-visitante-modal-buttons">
                    <button
                        color="green"
                        onClick={handleAcceptClick}
                        className="add-visitante-modal-confirm-button"
                    >
                        <icon name="check" /> Aceptar
                    </button>
                    <button
                        color="red"
                        onClick={onClose}
                        className="add-visitante-modal-close-button"
                    >
                        <icon name="close" /> Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddVisitanteModal;