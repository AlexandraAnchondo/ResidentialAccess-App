import React, { useState, useEffect } from "react"
import {
    TextField,
    InputAdornment,
    Button,
    Typography,
    Autocomplete
} from "@mui/material"
import {
    Close as CloseIcon,
    Save as SaveIcon,
    NavigateNext,
    AddCard,
    QrCode as QRCodeIcon,
    QrCode,
    House
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import Check from "../../../components/Check"
import QRCodeScanner from "../../../components/QRCodeScanner"
import Loader from "../../../components/Loader"

// Hooks
import { useDomicilios, useValidateAccessCode } from "../../../hooks/domicilio.hook"

// Modals
import NotificationModal from "../../../components/modals/NotificacionModal"

const AddVisitaVehiculoModal = ({ show, onClose, onAdd, conductor, vehiculo, isSaved, setIsSaved, isFailure, setIsFailure, message, setMessage, loading }) => {

    const { domicilios } = useDomicilios(["id", "calle", "numero_calle"])
    const { validateCode } = useValidateAccessCode()

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [step, setStep] = useState(1) // Controla la vista (1 = cámara, 2 = check, 3 = formulario 4 = confirmación)
    const [showScanner, setShowScanner] = useState(false)
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")

    const [formData, setFormData] = useState({
        numero_tarjeton: "",
        id_domicilio: ""
    })

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setStep(1) // Reinicia el paso al cerrar el modal
            setFormData({
                numero_tarjeton: "",
                id_domicilio: ""
            })
        }
    }, [show])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, id_conductor: conductor?.id, id_vehiculo: vehiculo?.id, [name]: value })
    }

    const handleAcceptClick = () => {
        onAdd(formData)
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

    const validateQR = async (accessCode) => {
        try {
            const response = await validateCode({ id: accessCode })
            if (response.success !== false) {
                setStep(2)
                return
            }
            setIsFailure(true)
            setMessage("Código no válido")
        } catch (err) {
            setIsFailure(true)
            setMessage("Código no válido")
        }
    }

    const handleScan = (decodedText) => {
        try {
            const code = decodedText
            validateQR(code)
        } catch (e) {
            handleNotificationModalMessage("QR inválido")
        }
        setShowScanner(false)
    }

    const isFormValid = () => {
        return formData.numero_tarjeton && formData.id_domicilio
    }

    const handleCloseNotificationModal = () => {
        setShowNotificationModal(false)
        setModalMensaje("")
    }

    const handleNotificationModalMessage = (message) => {
        setModalMensaje(message)
        setShowNotificationModal(true)
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

                {!isSaved && !isFailure && !loading && <>
                    {/* Paso 1: Botón de cámara */}
                    {step === 1 && !showScanner && (
                        <div className="add-modal-content-v2" style={{ textAlign: "center", alignItems: "center" }}>
                            <Button
                                onClick={() => setShowScanner(true)}
                                variant="contained"
                                sx={{
                                    width: isMobile ? "80%" : "50%",
                                    height: "150px",
                                    fontSize: isMobile ? "1.2rem" : "1.5rem",

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

                    {showScanner && (
                        <QRCodeScanner
                            onScanSuccess={handleScan}
                            onClose={() => setShowScanner(false)}
                        />
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
                                name="numero_tarjeton"
                                value={formData.numero_tarjeton}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AddCard />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Autocomplete
                                options={domicilios}
                                getOptionLabel={(domicilio) => `${domicilio.calle} ${domicilio.numero_calle}`}
                                value={domicilios.find((d) => d.id === formData.id_domicilio) || null}
                                onChange={(event, newValue) => {
                                    setFormData({
                                        ...formData,
                                        id_domicilio: newValue ? newValue.id : ""
                                    })
                                }}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Selecciona la dirección"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <House />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                        </div>
                    )}
                </>}
                {loading &&
                        <div className="loading-container">
                            <Loader loadingMessage={"Abriendo pluma..."} />
                        </div>
                }

                {/* Paso 4: Check gigante */}
                <Check isFailure={isFailure} isSaved={isSaved} message={message} />

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
                            style={{ marginLeft: 20, marginBottom: 20 }}
                        >
                            Siguiente
                        </Button>
                    )}
                    {!isSaved && !isFailure && step === 3 &&
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
                        style={{ marginLeft: 20, marginBottom: 20 }}
                    >
                        {isSaved || isFailure ? "Cerrar" : "Cancelar"}
                    </Button>
                </div>

                <NotificationModal
                    message={modalMensaje}
                    onClose={handleCloseNotificationModal}
                    isOpen={showNotificationModal}
                />
            </div>
        </div>
    )
}

export default AddVisitaVehiculoModal
