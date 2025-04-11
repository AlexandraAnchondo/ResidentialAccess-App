import React, { useState, useEffect } from "react"
import {
    TextField,
    InputAdornment,
    Button,
    Box,
    Typography,
    IconButton
} from "@mui/material"
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    CameraAlt as CameraAltIcon,
    UploadFile as UploadFileIcon,
    Save as SaveIcon,
    Close as CloseIcon
} from "@mui/icons-material"
import "../../../styles/General/EditModal.scss"

import useMediaQuery from "@mui/material/useMediaQuery"

import Check from "../../../components/Check"

import CameraModal from "../../../components/modals/CameraModal"

const EditGuardiaModal = ({ show, onClose, onEdit, residente, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) // Estado para manejar animacion de cierre
    const [showCameraModal, setShowCameraModal] = useState(false)

    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        correo_electronico: "",
        ine: null,
        is_principal: false
    })

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setFormData({
                nombre: "",
                apellidos: "",
                telefono: "",
                correo_electronico: "",
                ine: null,
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
                ine: residente.ine,
                is_principal: residente.is_principal
            })
        }
    }, [show, residente])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, ine: file }) // Guarda el archivo como File
        }
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
        if (residente.is_principal) {
            return (
                formData.nombre &&
                formData.apellidos &&
                formData.telefono &&
                formData.correo_electronico &&
                formData.ine
            )
        } else {
            return (
                formData.nombre &&
                formData.apellidos &&
                formData.telefono &&
                formData.correo_electronico
            )
        }
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`edit-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`edit-modal ${closing ? "scale-down" : ""}`}>
                <div className="edit-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información editada" : isFailure ?  "Error al editar la información" : "Edita la información del residente" }
                    </Typography>
                    <IconButton onClick={handleCancelClick} color="error">
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="edit-modal-content">
                    {!isSaved && !isFailure &&
                            <Box sx={{ display: "grid", gap: 2 }}>
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
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    label="Correo Electrónico"
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

                                {/* Botón para tomar foto o subir INE */}
                                {residente.is_principal ? (
                                    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<CameraAltIcon />}
                                            onClick={() => setShowCameraModal(true)} // Abre el modal de la cámara
                                        >
                                        Abrir cámara
                                        </Button>

                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<UploadFileIcon />}
                                        >
                                        Subir archivo
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </Button>
                                    </div>
                                ) : <br></br>}

                                {residente.is_principal && formData.ine && !showCameraModal ? (
                                    <center><img
                                        src={typeof formData.ine === "string" ? formData.ine : URL.createObjectURL(formData.ine)}
                                        alt="INE"
                                        style={{ marginTop: 10, width: isMobile ? "100%" : "60%", borderRadius: 8, maxHeight: "60vh", objectFit: "contain" }}
                                    /></center>
                                ) : null}

                                {residente.is_principal && showCameraModal ? (
                                    <CameraModal
                                        setFormData={setFormData}
                                        formData={formData}
                                        onClose={() => setShowCameraModal(false)} // Cierra modal después de tomar foto
                                    />
                                ) : null}
                            </Box>
                    }
                    <Check isFailure={isFailure} isSaved={isSaved} message={message} />
                </div>
                <div className="edit-modal-buttons" style={{ marginTop: isMobile ? -90 : -50, marginBottom: 16 }}>
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

export default EditGuardiaModal
