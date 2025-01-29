import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "../../../styles/Usuarios/DeleteModal.css";

const DeleteModal =({showDeleteModal, onCloseDeleteModal, onDelete}) => {
    if (!showDeleteModal) { 
        document.body.style.overflow = 'auto'; 
        return null;
    }

    document.body.style.overflow = 'hidden'; 
    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <div className="delete-modal-header">
                    <h2>¿Estás seguro?</h2>
                </div>
                <div className="delete-modal-content">
                    <div className="delete-modal-options">
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={onDelete}>
                            Borrar
                        </Button>
                        <Button 
                            variant="outlined" 
                            sx={
                                    {
                                        color:"gray", 
                                        borderColor: "gray",
                                        backgroundColor: "white", 
                                        "&:hover":
                                            {
                                                backgroundColor:"rgba(240, 240, 240, 0.8)"
                                            }
                                    }
                                } 
                            onClick=
                            {
                                onCloseDeleteModal
                            }>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeleteModal