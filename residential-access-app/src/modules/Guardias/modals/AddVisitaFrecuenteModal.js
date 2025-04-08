import React, { useState, useEffect } from "react"
import {
    TextField,
    InputAdornment,
    Button,
    Typography
} from "@mui/material"
import {
    Close as CloseIcon,
    Save as SaveIcon,
    AddCard as AddCardIcon
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

import Check from "../../../components/Check"

const AddVisitaFrecuenteModal = ({ show, onClose, onAdd, visitante, vehiculo, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre

    const [formData, setFormData] = useState({
        numero_tarjeton: ""
    })

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setFormData({
                numero_tarjeton: ""
            })
        }
    }, [show])

    const visitanteWithVehiculo = {
        id_visitante: visitante?.id,
        id_vehiculo: vehiculo?.id
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...visitanteWithVehiculo, [name]: value })
    }

    const handleAcceptClick = () => {
        onAdd(formData)
    }

    const handleCancelClick = () => {
        setClosing(true)
        setIsSaved(false)
        setIsFailure(false)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    const isFormValid = () => {
        return formData.numero_tarjeton
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
                    {!isSaved && !isFailure &&
                        <TextField
                            label="Tarjetón"
                            name="numero_tarjeton"
                            value={formData.numero_tarjeton}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AddCardIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    }
                    <Check isFailure={isFailure} isSaved={isSaved} message={message} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    {!isSaved && !isFailure &&
                        <Button
                            onClick={handleAcceptClick}
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={!isFormValid() || isFailure}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": "#00a8ccCC"
                            }}
                            style={{ marginLeft: 20, marginBottom: 20 }}
                        >
                            Guardar
                        </Button>
                    }
                    <Button
                        onClick={handleCancelClick}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        style={{ marginLeft: 20, marginBottom:10 }}
                        size={isMobile ? "small" : "large"}
                    >
                        {isSaved || isFailure ? "Cerrar" : "Cancelar"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddVisitaFrecuenteModal