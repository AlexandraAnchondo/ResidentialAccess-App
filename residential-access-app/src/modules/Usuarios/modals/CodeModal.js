import React, { useState, useEffect } from "react"
import "../../../styles/Usuarios/CodeModal.css"
import { Button } from "@mui/material"
import { Check as CheckIcon, Cancel as CancelIcon, Close } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"

const CodeModal = ({ show, onClose, existingCodes }) => {
    const [selectedCodes, setSelectedCodes] = useState([])
    const [disabledOptions, setDisabledOptions] = useState([])

    const isMobile = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        if (show) {
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
        const codesToGenerate = selectedCodes.map((value) => ({
            duration:
                value === "1-month"
                    ? "1 mes"
                    : value === "1-week"
                        ? "1 semana"
                        : "1 día",
            id: `${value}-${Date.now()}`
        }))
        onClose(codesToGenerate)
    }

    const handleCancelClick = () => {
        onClose()
    }

    if (!show) {
        return null
    }

    return (
        <div className="code-modal-overlay">
            <div className="code-modal">
                <div className="code-modal-header">
                    <h2>¿Qué tipo de código desea crear?</h2>
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
                    <div className="code-modal-options">
                        {["1-month", "1-week", "1-day"].map((value) => {
                            const isDisabled = disabledOptions.includes(value)
                            const labelText =
                                value === "1-month"
                                    ? "Un mes de vigencia"
                                    : value === "1-week"
                                        ? "Una semana de vigencia"
                                        : "Un día de vigencia"
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
                                    <input
                                        type="checkbox"
                                        name="codeType"
                                        value={value}
                                        onChange={handleCheckboxChange}
                                        disabled={isDisabled}
                                        style={{ marginRight: 8 }}
                                    />
                                    {labelText}
                                </label>
                            )
                        })}
                    </div>
                </div>
                <div className="code-modal-actions">
                    <Button
                        onClick={handleAcceptClick}
                        variant="contained"
                        startIcon={<CheckIcon />}
                        disabled={selectedCodes.length === 0 || existingCodes.length === 3}
                        size={isMobile ? "small" : "large"}
                        sx={{
                            color: "#fff",
                            marginBottom: isMobile ? 0 : 4,
                            marginLeft: isMobile ? 2 : 5,
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