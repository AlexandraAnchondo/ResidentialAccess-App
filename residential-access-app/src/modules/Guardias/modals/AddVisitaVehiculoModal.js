import React, { useState, useEffect } from "react"
import {
    TextField,
    InputAdornment,
    Button,
    Typography
} from "@mui/material"
import {
    Close as CloseIcon,
    Check as CheckIcon,
    CheckCircle,
    NavigateNext,
    AddCard,
    House as HouseIcon,
    Numbers as NumbersIcon,
    QrCode as QRCodeIcon,
    QrCode
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

const AddVisitaVehiculoModal = ({ show, onClose, conductor, setSelectedOption, setSelectedRow, setSelectedConductor }) => {

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [step, setStep] = useState(1) // Controla la vista (1 = cámara, 2 = check, 3 = formulario 4 = confirmación)
    const [formData, setFormData] = useState({
        numero_calle_tarjeton: "",
        calle: "",
        numero_calle: ""
    })

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setStep(1) // Reinicia el paso al cerrar el modal
            setFormData({
                numero_calle_tarjeton: "",
                calle: "",
                numero_calle: ""
            })
        }
    }, [show])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, conductor_id: conductor.id, [name]: value })
    }

    const handleAcceptClick = () => {
        console.log(formData)
        setSelectedOption("Registro de visitas")
        setSelectedRow(null)
        setSelectedConductor(null)
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
        return formData.numero_calle_tarjeton && formData.calle && formData.numero_calle
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {step === 3 ? "Ingresa la información de la visita" : step === 4 ? "Información ingresada" :  "Captura la información"}
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

                {/* Paso 1: Botón de cámara */}
                {step === 1 && (
                    <div className="add-modal-content-v2" style={{ textAlign: "center" }}>
                        <Button
                            onClick={() => setStep(2)}
                            variant="contained"
                            sx={{
                                width: "50%",
                                height: "150px",
                                fontSize: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#5bc7f1",
                                "&:hover": { backgroundColor: "#5bc7f1CC" }
                            }}
                        >
                            <QRCodeIcon sx={{ fontSize: 80 }} />
                            Escanear QR
                        </Button>
                    </div>
                )}

                {/* Paso 2: QR gigante + Botón Siguiente */}
                {step === 2 && (
                    <div className="add-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                        <QrCode className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                            Código verificado
                        </Typography>
                    </div>
                )}

                {/* Paso 3: Formulario */}
                {step === 3 && (
                    <div className="add-modal-content-v2">
                        <TextField
                            label="Tarjetón"
                            name="numero_calle_tarjeton"
                            value={formData.numero_calle_tarjeton}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AddCard />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="Calle"
                            name="calle"
                            value={formData.calle}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HouseIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="Número"
                            name="numero_calle"
                            value={formData.numero_calle}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NumbersIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                )}

                {/* Paso 4: Check gigante */}
                {step === 4 && (
                    <div className="add-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                        <CheckCircle className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                            Captura exitosa
                        </Typography>
                    </div>
                )}

                {/* Botones generales */}
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    {step === 2 && (
                        <Button
                            onClick={() => setStep(3)}
                            variant="contained"
                            startIcon={<NavigateNext />}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#008ba3" }
                            }}
                        >
                            Siguiente
                        </Button>
                    )}
                    {step === 3 && (
                        <Button
                            onClick={() => setStep(4)}
                            variant="contained"
                            startIcon={<CheckIcon />}
                            disabled={!isFormValid()}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#008ba3" }
                            }}
                        >
                            Aceptar
                        </Button>
                    )}
                    {step === 4 && (
                        <Button
                            onClick={handleAcceptClick}
                            variant="contained"
                            startIcon={<CheckIcon />}
                            disabled={!isFormValid()}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#008ba3" }
                            }}
                        >
                            Aceptar
                        </Button>
                    )}
                    <Button
                        onClick={handleCancelClick}
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

export default AddVisitaVehiculoModal
