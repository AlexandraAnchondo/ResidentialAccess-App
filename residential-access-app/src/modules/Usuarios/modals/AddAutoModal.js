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
import "../../../styles/AddModal.css"
import useMediaQuery from "@mui/material/useMediaQuery"

const AddAutoModal = ({ show, onClose, onAdd, availableColors }) => {
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
    }, [show])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAcceptClick = () => {
        onAdd(formData)
        onClose()
    }

    const isFormValid = () => {
        return formData.placas && formData.modelo && formData.color
    }

    if (!show) {
        return null
    }

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Ingresa la información del auto
                    </Typography>
                    <div className="add-modal-close-button">
                        <Button
                            onClick={onClose}
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
                        style={{ marginLeft: 20, marginBottom:10 }}
                        size={isMobile ? "small" : "large"}
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": "#00a8ccCC"
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        style={{ marginLeft: 20, marginBottom:10 }}
                        size={isMobile ? "small" : "large"}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddAutoModal