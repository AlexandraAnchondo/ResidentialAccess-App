import React, { useState, useEffect } from "react";
import "../../../styles/Usuarios/DeleteModal.css";

const DeleteModal =({showDeleteModal, onCloseDeleteModal, onDelete}) => {
    if (!showDeleteModal) return null;

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <div className="delete-modal-header">
                    <h2>¿Estas seguro?</h2>
                </div>
                <div className="delete-modal-content">
                    <div className="delete-modal-options">
                        <button className="delete-modal-delete" onClick={onDelete}>
                            Borrar
                        </button>
                        <button className="delete-modal-cancel" onClick={onCloseDeleteModal}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeleteModal