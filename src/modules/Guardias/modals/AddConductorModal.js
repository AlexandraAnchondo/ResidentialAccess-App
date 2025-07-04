import React, { useState, useEffect } from "react"
import {
    TextField,
    InputAdornment,
    Button,
    Box,
    Typography
} from "@mui/material"
import {
    People,
    Close as CloseIcon,
    Save as SaveIcon,
    CameraAlt as CameraAltIcon,
    UploadFile as UploadFileIcon
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

import Check from "../../../components/Check"
import CameraModal from "../../../components/modals/CameraModal"

const AddConductorModal = ({ show, onClose, onAdd, vehiculoId = null, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        ine: "",
        id_vehiculo: vehiculoId
    })

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [showCameraModal, setShowCameraModal] = useState(false)

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setFormData({
                nombre: "",
                apellidos: "",
                ine: "",
                id_vehiculo: vehiculoId
            })
        }
    }, [show])

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
        onAdd(formData)
    }

    const handleCloseClick = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setClosing(false)
            setIsSaved(false)
            setIsFailure(false)
        }, 500)
    }

    const isFormValid = () => {
        return formData.nombre && formData.apellidos && formData.ine
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Información guardada" : isFailure ?  "Error al capturar la información" : "Ingresa la información del conductor" }
                    </Typography>
                    <div className="add-modal-close-button">
                        <Button
                            onClick={handleCloseClick}
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
                        <>
                            <Box className="add-modal-options" sx={{ display: "grid", gap: 2 }}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <People />
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
                                                <People />
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />

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
                            </Box>
                            {formData.ine && !showCameraModal && (
                                <center>
                                    <img
                                        src={typeof formData.ine === "string" ? `${process.env.REACT_APP_API_ASSETS_URL}${formData.ine}` : URL.createObjectURL(formData.ine)}
                                        alt="INE"
                                        style={{
                                            marginTop: 30,
                                            marginBottom: -40,
                                            width: isMobile ? "80%" : "50%",
                                            maxHeight: "60vh",
                                            objectFit: "contain",
                                            borderRadius: 8
                                        }}
                                    />
                                </center>
                            )}

                            {showCameraModal && (
                                <CameraModal
                                    setFormData={setFormData}
                                    formData={formData}
                                    onClose={() => setShowCameraModal(false)} // Cierra modal después de tomar foto
                                />
                            )}
                        </>
                    }
                    <Check isFailure={isFailure} isSaved={isSaved} message={message} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
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

export default AddConductorModal