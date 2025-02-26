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
    AddCard
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

const AddVisitaFrecuenteModal = ({ show, onClose, visitante, vehiculo, setSelectedOption, setSelectedRow, setSelectedVehiculo }) => {

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre

    const [step, setStep] = useState(1) // Controla la vista (1 = formulario 2 = confirmación)
    const [formData, setFormData] = useState({
        numero_tarjeton: ""
    })

    useEffect(() => {
        if (!show) {
            setClosing(false)
            setStep(1) // Reinicia el paso al cerrar el modal
            setFormData({
                numero_tarjeton: ""
            })
        }
    }, [show])

    const visitanteWithVehiculo = {
        visitante_id: visitante?.id,
        vehiculo_id: vehiculo?.id
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...visitanteWithVehiculo, [name]: value })
    }

    const handleAcceptClick = () => {
        console.log(formData)
        setSelectedOption("Registro de visitas")
        setSelectedRow(null)
        setSelectedVehiculo(null)
    }

    const handleCancelClick = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    const isFormValid = () => {
        return formData.numero_tarjeton
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {step === 1 ? "Ingresa el número del tarjetón" : "Información ingresada" }
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
                {/* Paso 1: Formulario */}
                {step === 1 && (
                    <div className="add-modal-content" style={{ animation: "none" }}>
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
                    </div>
                )}

                {/* Paso 4: Check gigante */}
                {step === 2 && (
                    <div className="add-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                        <CheckCircle className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                            Captura exitosa
                        </Typography>
                    </div>
                )}

                {/* Botones generales */}
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    {step === 1 && (
                        <Button
                            onClick={() => setStep(2)}
                            variant="contained"
                            startIcon={<CheckIcon />}
                            disabled={!isFormValid()}
                            style={{ marginLeft: 20 }}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": "#00a8ccCC"
                            }}
                        >
                        Aceptar
                        </Button>
                    )}
                    {step === 2 && (
                        <Button
                            onClick={handleAcceptClick}
                            variant="contained"
                            startIcon={<CheckIcon />}
                            disabled={!isFormValid()}
                            style={{ marginLeft: 20 }}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": "#00a8ccCC"
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

export default AddVisitaFrecuenteModal