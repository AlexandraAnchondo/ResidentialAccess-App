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
    CameraAlt as CameraAltIcon,
    UploadFile as UploadFileIcon
} from "@mui/icons-material"
import { FaIdCard } from "react-icons/fa"
import "../../../styles/General/EditModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

import Check from "../../../components/Check"

const EditVisitanteFrecuenteModal = ({ show, onClose, onEdit, isSaved, setIsSaved, isFailure, setIsFailure, visitante_frecuente, message }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        id_vehiculo: null,
        placas: "",
        modelo: "",
        color: "",
        ine: "",
        bloqueado: false
    })

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [showCameraModal, setShowCameraModal] = useState(false)
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
                ine: "",
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
                ine: visitante_frecuente.ine,
                bloqueado: visitante_frecuente.bloqueado
            })
        }
    }, [show, visitante_frecuente])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, ine: file })
        }
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
            formData.color &&
            formData.ine
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
                    {!isSaved && !isFailure && <>
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

                            {/* Botón para tomar foto o subir INE */}
                            <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
                                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                    <FaIdCard size={isMobile ? 20 : 25} color="gray" />
                                    <Typography
                                        variant="caption"
                                        component={!isMobile ? "h2" : "h4"}
                                        gutterBottom
                                        color="gray"
                                        margin={0}
                                        fontFamily="'Lucida Sans', sans-serif"
                                        fontWeight="bold"
                                    >INE</Typography>
                                </div>
                                <Button
                                    variant="contained"
                                    startIcon={!isMobile ? <CameraAltIcon /> : ""}
                                    onClick={() => setShowCameraModal(true)} // Abre el modal de la cámara
                                >
                                    {!isMobile ? "Tomar foto" : <CameraAltIcon />}
                                </Button>

                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={!isMobile ?  <UploadFileIcon /> : ""}
                                >
                                    {!isMobile ? "Subir archivo" : <UploadFileIcon />}
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </div>
                        </Box>
                        {formData.ine && !showCameraModal && (
                            <center><img
                                src={typeof formData.ine === "string" ? formData.ine : URL.createObjectURL(formData.ine)}
                                alt="INE"
                                style={{ marginTop: 10, width: isMobile ? "90%" : "60%", borderRadius: 8 }}
                            /></center>
                        )}
                    </>}
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

export default EditVisitanteFrecuenteModal