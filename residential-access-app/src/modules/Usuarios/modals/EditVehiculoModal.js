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
    Save as SaveIcon,
    CheckCircle,
    CancelRounded
} from "@mui/icons-material"
import "../../../styles/General/EditModal.css"
import useMediaQuery from "@mui/material/useMediaQuery"

const EditVehiculoModal = ({ show, onClose, onEdit, availableColors, isSaved, setIsSaved, isFailure, setIsFailure, vehiculo }) => {
    const [formData, setFormData] = useState({
        placas: "",
        modelo: "",
        color: ""
    })

    const isMobile = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        if (!show) {
            setFormData({
                placas: "",
                modelo: "",
                color: ""
            })
        }
        if (vehiculo != null) {
            setFormData({ id: vehiculo.id, placas: vehiculo.placas, modelo: vehiculo.modelo, color: vehiculo.color })
        }
    }, [show, vehiculo])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAcceptClick = () => {
        onEdit(formData)
    }

    const handleCloseClick = () => {
        onClose()
        setIsSaved(false)
        setIsFailure(false)
    }

    const isFormValid = () => {
        return formData.placas && formData.modelo && formData.color
    }

    if (!show) {
        return null
    }

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="edit-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información editada" : isFailure ?  "Error al editar la información" : "Edita la información del vehículo" }
                    </Typography>
                    <div className="edit-modal-close-button">
                        <Button
                            onClick={onClose}
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
                    {isFailure &&
                        <div className="edit-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CancelRounded className="check-icon" sx={{ fontSize: 150, color: "#c53e39" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#862c29" }}>
                                Contactar a soporte
                            </Typography>
                        </div>
                    }
                    {isSaved &&
                        <div className="edit-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CheckCircle className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                                Edición exitosa
                            </Typography>
                        </div>
                    }
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
                        onClick={handleCloseClick}
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