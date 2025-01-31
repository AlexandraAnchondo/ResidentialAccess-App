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
    Check as CheckIcon
} from "@mui/icons-material"
import "../../../styles/Usuarios/AddModal.css"

const AddResidenteModal = ({ show, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        correo: ""
    })

    useEffect(() => {
        if (!show) {
            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                correo: ""
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
        onClose()
    }

    const isFormValid = () => {
        return (
            formData.nombre &&
            formData.apellido &&
            formData.telefono &&
            formData.correo
        )
    }

    if (!show) {
        return null
    }

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Ingresa la información del residente
                    </Typography>
                </div>
                <div className="add-modal-content">
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
                            name="apellido"
                            value={formData.apellido}
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
                            name="correo"
                            value={formData.correo}
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
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button
                        onClick={handleAcceptClick}
                        variant="contained"
                        startIcon={<CheckIcon />}
                        disabled={!isFormValid()} // Deshabilita el botón si el formulario no es válido
                        sx={{
                            backgroundColor: isFormValid() ? "#00a8cc" : "rgba(0, 0, 0, 0.12)", // Color principal o gris deshabilitado
                            color: isFormValid() ? "#fff" : "rgba(0, 0, 0, 0.26)", // Color del texto según el estado
                            "&:hover": {
                                backgroundColor: isFormValid() ? "#007a99" : "rgba(0, 0, 0, 0.12)" // Color en hover si está activo
                            }
                        }}
                        style={{ marginLeft: 20 }}
                    >
                        Aceptar
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        style={{ marginLeft: 20 }}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddResidenteModal
