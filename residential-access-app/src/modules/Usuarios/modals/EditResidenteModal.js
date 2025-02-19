import React, { useState, useEffect } from "react"
import {
    TextField,
    InputAdornment,
    Button,
    Box,
    Typography
} from "@mui/material"
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Close as CloseIcon,
    Save as SaveIcon,
    CheckCircle,
    CancelRounded
} from "@mui/icons-material"
import "../../../styles/General/EditModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

const EditResidenteModal = ({ show, onClose, onEdit, residente, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        correo_electronico: "",
        is_principal: false
    })

    const isMobile = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        if (!show) {
            setFormData({
                nombre: "",
                apellidos: "",
                telefono: "",
                correo_electronico: "",
                is_principal: false
            })
        }
        if (residente != null) {
            setFormData({
                id: residente.id,
                nombre: residente.nombre,
                apellidos: residente.apellidos,
                telefono: residente.telefono,
                correo_electronico: residente.correo_electronico,
                is_principal: residente.is_principal
            })
        }
    }, [show, residente])

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

    const handleCloseClick = () => {
        onClose()
        setIsSaved(false)
        setIsFailure(false)
    }

    const isFormValid = () => {
        return (
            formData.nombre &&
            formData.apellidos &&
            formData.telefono &&
            formData.correo_electronico
        )
    }

    if (!show) {
        return null
    }

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="edit-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información editada" : isFailure ?  "Error al editar la información" : "Edita la información del residente" }
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
                                margin: "residente",
                                pediting:"residente"
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
                                label="Correo"
                                name="correo_electronico"
                                value={formData.correo_electronico}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                        </Box>
                    }
                    {isFailure &&
                        <div className="edit-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CancelRounded className="check-icon" sx={{ fontSize: 150, color: "#c53e39" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#862c29" }}>
                                {message}
                            </Typography>
                        </div>
                    }
                    {isSaved &&
                        <div className="edit-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                            <CheckCircle className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
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

export default EditResidenteModal