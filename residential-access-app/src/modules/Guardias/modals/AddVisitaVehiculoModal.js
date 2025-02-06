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
    AddCard
} from "@mui/icons-material"
import "../../../styles/AddModal.css"

const AddVisitaVehiculoModal = ({ show, onClose, conductor, setSelectedOption, setSelectedRow, setSelectedConductor }) => {
    const [formData, setFormData] = useState({
        numero_tarjeton: ""
    })

    useEffect(() => {
        if (!show) {
            setFormData({
                numero_tarjeton: ""
            })
        }
    }, [show])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ conductor_id: conductor.id, [name]: value })
    }

    const handleAcceptClick = () => {
        console.log(formData)
        setSelectedOption("Registro de visitas")
        setSelectedRow(null)
        setSelectedConductor(null)
        onClose()
    }

    const isFormValid = () => {
        return formData.numero_tarjeton
    }

    if (!show) {
        return null
    }

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Ingresa el número del tarjetón
                    </Typography>
                </div>
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
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
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

export default AddVisitaVehiculoModal