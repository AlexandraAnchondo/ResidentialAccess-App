import React from "react"
import { Button } from "@mui/material"
import "../../styles/General/DeleteModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Close as CloseIcon, Delete } from "@mui/icons-material"

const DeleteModal =({ showDeleteModal, onCloseDeleteModal, onDelete }) => {

    const isMobile = useMediaQuery("(max-width: 768px)")

    if (!showDeleteModal) {
        return null
    }

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
                            size={isMobile ? "small" : "large"}
                            color="error"
                            onClick={onDelete}
                            startIcon={<Delete />}
                        >
                            Borrar
                        </Button>
                        <Button
                            variant="outlined"
                            size={isMobile ? "small" : "large"}
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
                            onClick={onCloseDeleteModal}
                            startIcon={<CloseIcon />}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal