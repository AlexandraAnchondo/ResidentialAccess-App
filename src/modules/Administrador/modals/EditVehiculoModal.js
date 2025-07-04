import React, { useState, useEffect } from "react"
import {
    TextField,
    InputAdornment,
    Button,
    Box,
    Typography,
    Select,
    MenuItem
} from "@mui/material"
import {
    DirectionsCar as CarIcon,
    ColorLens as ColorIcon,
    FormatListNumbered as LicensePlateIcon,
    Close as CloseIcon,
    Save as SaveIcon
} from "@mui/icons-material"
import "../../../styles/General/EditModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

import Check from "../../../components/Check"

const EditVehiculoModal = ({ show, onClose, onEdit, vehiculo, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {
    const availableColors = ["Gris", "Blanco", "Negro", "Rojo", "Azul", "Verde", "Amarillo", "Dorado", "Plata", "Morado", "Cafe", "Naranja"]

    const [formData, setFormData] = useState({
        placas: "",
        modelo: "",
        color: "",
        bloqueado: false
    })

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setFormData({
                placas: "",
                modelo: "",
                color: "",
                bloqueado: false
            })
        }
        if (vehiculo != null) {
            setFormData({
                id: vehiculo.id,
                placas: vehiculo.placas,
                modelo: vehiculo.modelo,
                color: vehiculo.color,
                bloqueado: vehiculo.bloqueado
            })
        }
    }, [show, vehiculo])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAcceptClick = () => {
        onEdit(formData)
    }

    const handleCancelClick = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setIsSaved(false)
            setIsFailure(false)
            setClosing(false)
        }, 500)
    }

    const isFormValid = () => {
        return (
            formData.placas &&
            formData.modelo &&
            formData.color
        )
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`edit-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`edit-modal ${closing ? "scale-down" : ""}`}>
                <div className="edit-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información editada" : isFailure ?  "Error al editar la información" : "Edita la información del vehículo" }
                    </Typography>
                    <div className="edit-modal-close-button">
                        <Button
                            onClick={handleCancelClick}
                            startIcon={<CloseIcon />}
                            color="white"
                            size={isMobile ? "small" : "large"}
                            sx={{
                                marginBottom: isMobile ? 0 : 4,
                                marginLeft: isMobile ? 2 : 5,
                                margin: "vehiculo",
                                pediting:"vehiculo"
                            }}
                        />
                    </div>
                </div>
                <div className="edit-modal-content">
                    {!isSaved && !isFailure &&
                        <Box className="edit-modal-options" sx={{ display: "grid", gap: 2 }}>
                            <TextField
                                label="Placas"
                                name="placas"
                                value={formData.placas}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CarIcon />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                            <TextField
                                label="Modelo"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LicensePlateIcon />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                            <Select
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                displayEmpty
                                fullWidth
                                startAdornment={
                                    <InputAdornment position="start">
                                        <ColorIcon />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="" disabled>
                                    Selecciona un color
                                </MenuItem>
                                {availableColors.map((color) => (
                                    <MenuItem key={color} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    }
                    <Check isFailure={isFailure} isSaved={isSaved} message={message} />
                </div>
                <div className="edit-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    {!isSaved && !isFailure &&
                        <Button
                            onClick={handleAcceptClick}
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={!isFormValid() || isFailure}
                            style={{ marginLeft: 20, marginBottom:10 }}
                            size={isMobile ? "small" : "large"}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": "#00a8ccCC"
                            }}
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

export default EditVehiculoModal