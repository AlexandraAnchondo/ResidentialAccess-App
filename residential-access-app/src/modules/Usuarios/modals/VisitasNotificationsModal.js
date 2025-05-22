import React, { useState } from "react"
import { IconButton } from "@mui/material"
import { Close, Email, WhatsApp } from "@mui/icons-material"
import "../../../styles/Usuarios/VisitasNotificationsModal.scss"

const VisitasNotificationsModal = ({ isOpen, onClose, emailNotifs, setEmailNotifs, whatsappNotifs, setWhatsappNotifs }) => {
    const [closing, setClosing] = useState(false)

    const handleClose = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 300)
    }

    if (!isOpen && !closing) {
        return null
    }

    return (
        <div className={`notifications-overlay ${closing ? "fade-out-notification " : ""}`}>
            <div className={`notifications-modal ${closing ? "scale-down-notification " : ""}`}>
                <h2>Notificaciones</h2>

                <div className="notif-option">
                    <Email className="notif-icon" />
                    <span>Notificaciones por <strong>Correo</strong></span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={emailNotifs}
                            onChange={() => setEmailNotifs(!emailNotifs)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                {/* <div className="notif-option">
                    <WhatsApp className="notif-icon" />
                    <span>Notificaciones por <strong>WhatsApp</strong></span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={whatsappNotifs}
                            onChange={() => setWhatsappNotifs(!whatsappNotifs)}
                        />
                        <span className="slider"></span>
                    </label>
                </div> */}

                <div className="notif-actions">
                    <IconButton onClick={handleClose} className="close-btn" color="error">
                        <Close />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default VisitasNotificationsModal
