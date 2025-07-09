import React, { useState, useEffect } from "react"
import {
    Button,
    Typography
} from "@mui/material"
import {
    Close as CloseIcon
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

import Check from "../../../components/Check"

const AddVisitaResidenteModal = ({ show, onClose, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre

    useEffect(() => {
        if (!show) {
            setClosing(false)
        }
    }, [show])

    const handleCancelClick = () => {
        setClosing(true)
        setIsSaved(false)
        setIsFailure(false)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información guardada" : isFailure ?  "Error al capturar la información" : "Ingresa el número del tarjetón" }
                    </Typography>
                    <div className="add-modal-close-button">
                        <Button
                            onClick={handleCancelClick}
                            startIcon={<CloseIcon />}
                            color="white"
                            size={isMobile ? "small" : "large"}
                            sx={{
                                marginBottom: isMobile ? 0 : 4,
                                marginLeft: isMobile ? 2 : 5,
                                margin: "auto",
                                padding:"auto"
                            }}
                        />
                    </div>
                </div>
                <div className="add-modal-content" style={{ animation: "none" }}>
                    <Check isFailure={isFailure} isSaved={isSaved} message={message} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button
                        onClick={handleCancelClick}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        style={{ marginLeft: 20, marginBottom:10 }}
                        size={isMobile ? "small" : "large"}
                    >
                        Cerrar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddVisitaResidenteModal