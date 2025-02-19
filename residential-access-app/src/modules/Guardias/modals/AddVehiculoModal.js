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
    Check as CheckIcon
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

const AddVehiculoModal = ({ show, onClose, onAdd, visitanteId = null }) => {
    const [formData, setFormData] = useState({
        placas: "",
        modelo: "",
        color: "",
        bloqueado: false
    })

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre

    const availableColors = ["Gris", "Blanco", "Negro", "Rojo", "Azul", "Verde", "Amarillo", "Dorado", "Plata", "Morado", "Cafe", "Naranja"]

    useEffect(() => {
        if (!show) {
            setFormData({
                placas: "",
                modelo: "",
                color: "",
                bloqueado: false
            })
        }
    }, [show])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAcceptClick = () => {
        if(visitanteId != null) {
            const visitante = {
                visitante_id: visitanteId,
                vehiculo: { ...formData }
            }
            onAdd(visitante)
            handleCancelClick()
            return
        }
        onAdd(formData)
        handleCancelClick()
    }

    const handleCancelClick = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    const isFormValid = () => {
        return formData.placas && formData.modelo && formData.color
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Ingresa la información del vehículo
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
                <div className="add-modal-content">
                    <Box className="add-modal-options" sx={{ display: "grid", gap: 2 }}>
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
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button
                        onClick={handleAcceptClick}
                        variant="contained"
                        startIcon={<CheckIcon />}
                        disabled={!isFormValid()}
                        style={{ marginLeft: 20 }}
                        size={isMobile ? "small" : "large"}
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": "#00a8ccCC"
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button
                        onClick={handleCancelClick}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        style={{ marginLeft: 20 }}
                        size={isMobile ? "small" : "large"}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddVehiculoModal