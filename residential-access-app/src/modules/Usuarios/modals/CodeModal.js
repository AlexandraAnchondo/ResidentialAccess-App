import React, { useState, useEffect } from "react"
import "../../../styles/Usuarios/CodeModal.scss"
import { Button, Typography } from "@mui/material"
import { Check as CheckIcon, Cancel as CancelIcon, Close } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"

import Check from "../../../components/Check"
import CheckBox from "../../../components/CheckBox"

const CodeModal = ({ show, onClose, existingCodes, onAdd, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {
    const [selectedCodes, setSelectedCodes] = useState([])
    const [disabledOptions, setDisabledOptions] = useState([])
    const [singleUseOption, setSingleUseOption] = useState(null)
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre

    const isMobile = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        if (show) {
            setClosing(false)
            // Determinar los tipos de códigos ya vigentes para deshabilitar sus checkboxes
            const activeDurations = existingCodes.map((code) => code.duration)
            const disabled = []
            if (activeDurations.includes("1 mes")) {
                disabled.push("1-month")
            }
            if (activeDurations.includes("1 semana")) {
                disabled.push("1-week")
            }
            if (activeDurations.includes("1 día")) {
                disabled.push("1-day")
            }
            if (activeDurations.includes("1 uso único")) {
                disabled.push("single-use")
            }
            setDisabledOptions(disabled)
        }
    }, [show, existingCodes])

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target
        if (checked) {
            setSelectedCodes((prev) => [...prev, value])
        } else {
            setSelectedCodes((prev) => prev.filter((code) => code !== value))
        }
    }

    const handleAcceptClick = () => {
        const data = { selectedCodes }
        if (selectedCodes.includes("single-use")) {
            data.singleUseOption = singleUseOption
        }
        onAdd(data)
    }

    const handleCancelClick = () => {
        setSelectedCodes([])
        setSingleUseOption(null)
        setClosing(true)
        setIsSaved(false)
        setIsFailure(false)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    const isFormValid = () => {
        // Si no se selecciona nada, no es válido
        if (selectedCodes.length === 0) {
            return false
        }

        // Si ya hay 4 códigos existentes, no es válido
        if (existingCodes.length === 4) {
            return false
        }

        // Si se selecciona "single-use" pero no se elige una opción, no es válido
        if (selectedCodes.includes("single-use") && singleUseOption == null) {
            return false
        }

        // Si se selecciona "single-use" y si está seleccionado con una opción válida, es válido
        if (selectedCodes.includes("single-use") && singleUseOption != null) {
            return true
        }

        // Si no se selecciona "single-use" o si está seleccionado con una opción válida, es válido
        if (!selectedCodes.includes("single-use")) {
            return true
        }
    }

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`code-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`code-modal ${closing ? "scale-down" : ""}`}>
                <div className="code-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {isSaved ? "Códigos creados" : isFailure ?  "Error al crear los códigos" : "¿Qué tipo de código desea crear?" }
                    </Typography>
                    <div className="close-button">
                        <Button
                            onClick={handleCancelClick}
                            startIcon={<Close />}
                            color="white"
                            size={isMobile ? "small" : "large"}
                            sx={{
                                marginBottom: isMobile ? 0 : 4,
                                marginLeft: isMobile ? 2 : 5,
                                margin: "auto",
                                padding: "auto",
                                justifyContent: "center"
                            }}
                        />
                    </div>
                </div>
                <div className="code-modal-content">
                    {!isSaved && !isFailure &&
                        <div className="code-modal-options">
                            {["1-month", "1-week", "1-day", "single-use"].map((value) => {
                                const isDisabled = disabledOptions.includes(value)
                                const labelText =
                                value === "1-month"
                                    ? "Un mes de vigencia"
                                    : value === "1-week"
                                        ? "Una semana de vigencia"
                                        : value === "1-day"
                                            ? "Un día de vigencia" :
                                            "Un solo uso"
                                return (
                                    <label
                                        key={value}
                                        style={{
                                            color: isDisabled ? "red" : "inherit",
                                            cursor: isDisabled ? "not-allowed" : "pointer"
                                        }}
                                        title={
                                            isDisabled
                                                ? "Ya existe un código con esta duración activo."
                                                : ""
                                        }
                                    >
                                        <CheckBox
                                            isDisabled={isDisabled}
                                            value={value}
                                            onChange={(event) => handleCheckboxChange(event, value)}
                                            checked={selectedCodes.includes(value)}
                                        />
                                        {labelText}
                                    </label>
                                )
                            })}
                            {selectedCodes.includes("single-use") && (
                                <div className="single-use-options">
                                    <h3 className="single-use-title">¿Este código es para...?</h3>

                                    <div className="single-use-checkboxes">
                                        <div className="checkbox-wrapper-12">
                                            <div className="cbx">
                                                <input
                                                    type="checkbox"
                                                    id="proveedor"
                                                    checked={singleUseOption === "Proveedor"}
                                                    onChange={() =>
                                                        setSingleUseOption(singleUseOption === "Proveedor" ? null : "Proveedor")
                                                    }
                                                />
                                                <label htmlFor="proveedor"></label>
                                                <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                                                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                                                </svg>
                                            </div>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <filter id="goo-12">
                                                        <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
                                                        <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
                                                        <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                                                    </filter>
                                                </defs>
                                            </svg>
                                            <label className="checkbox-label" htmlFor="proveedor">Proveedor</label>
                                        </div>

                                        <div className="checkbox-wrapper-12">
                                            <div className="cbx">
                                                <input
                                                    type="checkbox"
                                                    id="recolector"
                                                    checked={singleUseOption === "Recolector"}
                                                    onChange={() =>
                                                        setSingleUseOption(singleUseOption === "Recolector" ? null : "Recolector")
                                                    }
                                                />
                                                <label htmlFor="recolector"></label>
                                                <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                                                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                                                </svg>
                                            </div>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <filter id="goo-12">
                                                        <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
                                                        <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
                                                        <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                                                    </filter>
                                                </defs>
                                            </svg>
                                            <label className="checkbox-label" htmlFor="recolector">Recolector</label>
                                        </div>
                                        <div className="checkbox-wrapper-12">
                                            <div className="cbx">
                                                <input
                                                    type="checkbox"
                                                    id="recolector"
                                                    checked={singleUseOption === "Visita"}
                                                    onChange={() =>
                                                        setSingleUseOption(singleUseOption === "Visita" ? null : "Visita")
                                                    }
                                                />
                                                <label htmlFor="recolector"></label>
                                                <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                                                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                                                </svg>
                                            </div>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <filter id="goo-12">
                                                        <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
                                                        <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
                                                        <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                                                    </filter>
                                                </defs>
                                            </svg>
                                            <label className="checkbox-label" htmlFor="recolector">Visita</label>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    }
                    <Check isFailure={isFailure} isSaved={isSaved} message={message} />
                </div>
                <div className="code-modal-actions">
                    {!isSaved && !isFailure &&
                        <Button
                            onClick={handleAcceptClick}
                            variant="contained"
                            startIcon={<CheckIcon />}
                            disabled={!isFormValid()}
                            size={isMobile ? "small" : "large"}
                            sx={{
                                color: "#fff",
                                marginBottom: isMobile ? 0 : 4,
                                marginLeft: isMobile ? 0 : 5,
                                backgroundColor: selectedCodes.length > 0 ? "#00a8cc" : "#cccccc",
                                "&:hover": {
                                    backgroundColor: selectedCodes.length > 0
                                        ? "#00a8ccCC"
                                        : "#cccccc"
                                }
                            }}
                        >
                            Aceptar
                        </Button>
                    }
                    <Button
                        onClick={handleCancelClick}
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        color="error"
                        size={isMobile ? "small" : "large"}
                        sx={{
                            marginBottom: isMobile ? 0 : 4,
                            marginLeft: isMobile ? 2 : 5
                        }}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CodeModal