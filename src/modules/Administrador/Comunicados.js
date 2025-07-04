import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@mui/material"
import "../../styles/Administrador/Comunicados.scss"

// Components
import Loader from "../../components/Loader"
import ComunicadosDashboard from "../Usuarios/Comunicados"

// Modals
import NotificationModal from "../../components/modals/NotificacionModal"

// Hooks
import {
    useSendAdvicesToAllUsers
} from "../../hooks/comunicados.hook"

const Comunicados = () => {
    // API calls
    const { sendAdvices, loading } = useSendAdvicesToAllUsers()

    const [titulo, setTitulo] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [mostrarModal, setMostrarModal] = useState(false)
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")
    const [closing, setClosing] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)

    const abrirModal = () => {
        if (titulo.trim() && mensaje.trim()) {
            setMostrarModal(true)
        } else {
            handleNotificationModalMessage("Por favor, completa todos los campos.")
        }
    }

    const handleSendComunicado = async () => {
        try {
            setMostrarModal(false)
            const response = await sendAdvices({ titulo, mensaje })
            if (response.id_comunicado != null) {
                setTitulo("")
                setMensaje("")
                handleNotificationModalMessage("Comunicado enviado correctamente")
                return
            }
            handleNotificationModalMessage("Error al enviar el comunicado")
            setMostrarModal(false)
        } catch (err) {
            handleNotificationModalMessage("Error al enviar el comunicado")
            setMostrarModal(false)
        }
    }

    const handleCloseModal = () => {
        setClosing(true)
        setTimeout(() => {
            setMostrarModal(false)
            setModalMensaje("")
            setClosing(false)
        }, 500)
    }

    const handleNotificationModalMessage = (message) => {
        setModalMensaje(message)
        setShowNotificationModal(true)
    }

    return (
        <>
            {!showDashboard && (
                <div className="comunicados-container">
                    <h1>
                        <FontAwesomeIcon icon={faBell} className="icon-placeholder" />
                &nbsp;Enviar Comunicado&nbsp;
                        <FontAwesomeIcon icon={faBell} className="icon-placeholder" />
                    </h1>

                    {loading ? (
                        <div className="loading-container" style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className="form-group">
                                <label>Título del Comunicado</label>
                                <input
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    placeholder="Ej. Mantenimiento programado, evento, aviso importante..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Mensaje</label>
                                <textarea
                                    rows="8"
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                    placeholder="Escribe aquí el contenido del comunicado..."
                                />
                            </div>

                            <Button className="enviar-btn" onClick={abrirModal}>
                                    Enviar Comunicado
                            </Button>
                            <Button className="dashboard-btn" onClick={() => setShowDashboard(true)}>
                                    MOSTRAR DASHBOARD DE COMUNICADOS
                            </Button>
                        </>
                    )}

                    {mostrarModal && (
                        <div className={`modal-confirmacion ${closing ? "fade-out-notification" : ""}`}>
                            <div className={`modal-contenido ${closing ? "scale-down-notification" : ""}`}>
                                <h2>¿Confirmar envío?</h2>
                                <p>Este comunicado será enviado a todos los residentes por correo electrónico.</p>
                                <div className="modal-botones">
                                    <button className="cancelar" onClick={handleCloseModal}>Cancelar</button>
                                    <button className="confirmar" onClick={handleSendComunicado}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <NotificationModal
                        message={modalMensaje}
                        onClose={() =>setShowNotificationModal(false)}
                        isOpen={showNotificationModal}
                    />
                </div>
            )}
            {showDashboard && (
                <ComunicadosDashboard handleBack={() => setShowDashboard(false)} adminMode={true}/>
            )}
        </>
    )
}

export default Comunicados
