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
    Person as PersonIcon,
    Phone as PhoneIcon,
    ColorLens as ColorIcon,
    DirectionsCar as CarIcon,
    FormatListNumbered as LicensePlateIcon,
    Close as CloseIcon,
    Save as SaveIcon,
    CheckCircle as CheckCircleIcon,
    CancelRounded as CancelRoundedIcon
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

const AddVisitanteModal = ({ show, onClose, onAdd, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre

    const availableColors = ["Gris", "Blanco", "Negro", "Rojo", "Azul", "Verde", "Amarillo", "Dorado", "Plata", "Morado", "Cafe", "Naranja"]

    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        placas: "",
        modelo: "",
        color: "",
        principal: true
    })

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setFormData({
                nombre: "",
                apellidos: "",
                telefono: "",
                placas: "",
                modelo: "",
                color: "",
                principal: true
            })
        }
    }, [show])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "") // Elimina caracteres no numéricos
        const formattedPhone = value
            .slice(0, 10) // Limita a 10 dígitos
            .replace(/(\d{3})(\d{3})(\d{0,4})/, "($1) $2-$3") // Formato (###) ###-####
        setFormData({ ...formData, telefono: formattedPhone })
    }

    const handleAcceptClick = () => {
        onAdd(formData)
        handleCancelClick()
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
        return (
            formData.nombre &&
            formData.apellidos &&
            formData.telefono &&
            formData.placas &&
            formData.modelo &&
            formData.color
        )
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información guardada" : isFailure ?  "Error al capturar la información" : "Ingresa la información del visitante" }
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
                    {!isSaved && !isFailure &&
                        <Box className="add-modal-options" sx={{ display: "grid", gap: 2 }}>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                            <TextField
                                label="Apellidos"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                            <TextField
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handlePhoneChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                                inputProps={{ maxLength: 14 }}
                            />
                            <TextField
                                label="Placas"
                                name="placas"
                                value={formData.placas}
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
                            <TextField
                                label="Modelo"
                                name="modelo"
                                value={formData.modelo}
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
                        <div className="add-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CancelRoundedIcon className="check-icon" sx={{ fontSize: 150, color: "#c53e39" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#862c29" }}>
                                {message}
                            </Typography>
                        </div>
                    }
                    {isSaved &&
                        <div className="add-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CheckCircleIcon className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                                {message}
                            </Typography>
                        </div>
                    }
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16 }}>
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

export default AddVisitanteModal
