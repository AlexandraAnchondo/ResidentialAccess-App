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
import "../../../styles/General/EditModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

const EditVisitanteFrecuenteModal = ({ show, onClose, onEdit, isSaved, setIsSaved, isFailure, setIsFailure, visitante_frecuente, message }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        id_vehiculo: null,
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
            setClosing(false)
            setFormData({
                nombre: "",
                apellidos: "",
                telefono: "",
                id_vehiculo: null,
                placas: "",
                modelo: "",
                color: "",
                bloqueado: false
            })
        }
        if (visitante_frecuente != null) {
            setFormData({
                id: visitante_frecuente.id,
                nombre: visitante_frecuente.nombre,
                apellidos: visitante_frecuente.apellidos,
                telefono: visitante_frecuente.telefono,
                id_vehiculo: visitante_frecuente.id_vehiculo,
                placas: visitante_frecuente.placas,
                modelo: visitante_frecuente.modelo,
                color: visitante_frecuente.color,
                bloqueado: visitante_frecuente.bloqueado
            })
        }
    }, [show, visitante_frecuente])

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
        <div className={`edit-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`edit-modal ${closing ? "scale-down" : ""}`}>
                <div className="edit-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información editada" : isFailure ?  "Error al editar la información" : "Edita la información del visitante frecuente" }
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
                                margin: "visitante_frecuente",
                                pediting:"visitante_frecuente"
                            }}
                        />
                    </div>
                </div>
                <div className="edit-modal-content">
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
                                disabled
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
                        <div className="edit-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CancelRoundedIcon className="check-icon" sx={{ fontSize: 150, color: "#c53e39" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#862c29" }}>
                                {message}
                            </Typography>
                        </div>
                    }
                    {isSaved &&
                        <div className="edit-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CheckCircleIcon className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                                {message}
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

export default EditVisitanteFrecuenteModal