import React, { useState, useEffect } from "react"
import { Button } from "@mui/material"
import "../../../styles/Usuarios/NumericCodeModal.scss"

import Check from "../../../components/Check"

const NumericCodeModal = ({ open, onClose, onSave, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {
    const [codigo, setCodigo] = useState("")
    const [closing, setClosing] = useState(false)

    const generarAleatorio = () => {
        const aleatorio = Math.floor(100000 + Math.random() * 900000).toString()
        setCodigo(aleatorio)
    }

    const handleGuardar = () => {
        onSave(codigo)
    }

    const handleCloseClick = () => {
        setClosing(true)
        setIsSaved(false)
        setIsFailure(false)
        setCodigo("")
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    useEffect(() => {
        if (!open) {
            setClosing(false)
        }
    }, [open])

    if (!open && !closing) {
        return null
    }

    const isFormValid = () => {
        return (
            codigo
        )
    }

    return (
        <div className={`modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`modal-content ${closing ? "scale-down" : ""}`}>
                <h2>Cambiar código de acceso</h2>
                {!isSaved && !isFailure &&
                    <>
                        <p>
                        Ingrese el nuevo código de acceso que desea asignar a su domicilio o presione el botón de abajo para que el sistema genere uno aleatoriamente.
                        </p>
                        <input
                            type="text"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            className="codigo-input"
                            placeholder="Código"
                        />
                        <Button variant="contained" onClick={generarAleatorio} fullWidth sx={{ mt: 2 }} >
                            GENERAR CÓDIGO DE FORMA ALEATORIA
                        </Button>
                    </>
                }
                <Check isFailure={isFailure} isSaved={isSaved} message={message} />
                <div className="numeric-code-modal-buttons">
                    <Button onClick={handleCloseClick}>
                            CANCELAR
                    </Button>
                    {!isSaved && !isFailure &&
                        <Button onClick={handleGuardar} disabled={!isFormValid() || isFailure}>
                                GUARDAR
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default NumericCodeModal
