import React, { useState, useEffect } from "react"
import { Button, Typography, IconButton, Modal, Box } from "@mui/material"
import { FaIdCard } from "react-icons/fa"
import { Close as CloseIcon, Delete as DeleteIcon, Lock as LockIcon, LockOpen as LockOpenIcon, Edit } from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

// Modals
import DeleteModal from "../../../components/modals/DeleteModal"
import EditVisitanteFrecuenteModal from "../modals/EditVisitanteFrecuenteModal"
import NotificationModal from "../../../components/modals/NotificacionModal"

// Components
import DataTable from "../../../components/DataGrid"
import Loader from "../../../components/Loader"

// Hooks
import {
    useGetVisitantesFrecuentesByDomicilioManual,
    useUpdateVisitanteFrecuente,
    useDeleteVisitanteFrecuente
} from "../../../hooks/visitante_frecuente.hook"

const ViewFrecuentesModal = ({ show, onClose, domicilioId }) => {
    // API calls
    const { visitantes, setVisitantes, loading, fetchVisitantes  } = useGetVisitantesFrecuentesByDomicilioManual()
    const { editVisitanteFrecuente } = useUpdateVisitanteFrecuente()
    const { removeVisitanteFrecuente } = useDeleteVisitanteFrecuente()

    // State variables
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedVisitanteFrecuente, setSelectedVisitanteFrecuente] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [imageSrc, setImageSrc] = useState("")
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")

    useEffect(() => {
        if (show && domicilioId) {
            fetchVisitantes(domicilioId)
        }
        setClosing(false)
        document.body.style.overflow = showDeleteModal ? "hidden" : "auto"
    }, [show, domicilioId, showDeleteModal]) // Se ejecuta solo cuando showDeleteModal cambia

    const handleEditClick = (visitante_frecuente) => {
        setSelectedVisitanteFrecuente(visitante_frecuente)
        setShowEditModal(true)
    }

    const handleEditarVisitanteFrecuente = async (visitante_frecuente_editado) => {
        try {
            const response = await editVisitanteFrecuente({ ...visitante_frecuente_editado })
            if (response.id_visitante != null) {
                const updatedVisitanteFrecuentes = visitantes.map((visitante_frecuente) =>
                    visitante_frecuente.id === visitante_frecuente_editado.id ? { ...visitante_frecuente_editado } : visitante_frecuente
                )
                setVisitantes(updatedVisitanteFrecuentes)
                setIsSaved(true)
                setMessage(response.message ? response.message : "Operación exitosa")
                return
            }
            setIsFailure(true)
        } catch (err) {
            setIsFailure(true)
            setMessage(err.message || "Operación fallida")
        }
    }

    const handleToggleBlock = async(id) => {
        const updatedVisitanteFrecuentes = await visitantes.map((visitante_frecuente) => {
            if (visitante_frecuente.id === id) {
                editVisitanteFrecuente({ ...visitante_frecuente, bloqueado: !visitante_frecuente.bloqueado })
                return { ...visitante_frecuente, bloqueado: !visitante_frecuente.bloqueado }
            }
            return visitante_frecuente
        })
        setVisitantes(updatedVisitanteFrecuentes)
    }

    const handleDeleteClick = (visitante_frecuente) => {
        setShowDeleteModal(true)
        setSelectedVisitanteFrecuente(visitante_frecuente)
    }

    const handleBorrarVisitanteFrecuente= async () => {
        await removeVisitanteFrecuente(selectedVisitanteFrecuente)
        const newResidentes = visitantes.filter((value) => value.id !== selectedVisitanteFrecuente)
        setVisitantes(newResidentes)
        setShowDeleteModal(false)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const handleCancelClick = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    const handleShowImage = (row) => {
        if (row.ine) {
            const ineUrl = `${process.env.REACT_APP_API_ASSETS_URL}${row.ine}`
            const imagePath = `${ineUrl}`
            setImageSrc(imagePath)
            setShowImageModal(true)
        } else {
            handleNotificationModalMessage("No se encontró ine para este conductor.")
        }
    }

    const handleCloseImageModal = () => {
        setShowImageModal(false)
        setImageSrc("")
    }

    const handleCloseNotificationModal = () => {
        setShowNotificationModal(false)
        setModalMensaje("")
    }

    const handleNotificationModalMessage = (message) => {
        setModalMensaje(message)
        setShowNotificationModal(true)
    }

    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellidos", headerAlign: "center", headerName: "Apellidos", flex: 1, minWidth: 150 },
        { field: "telefono", headerAlign: "center", headerName: "Teléfono", flex: 1, minWidth: 150 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 150 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 50 },
        {
            field: "action",
            headerName: "Acciones",
            flex: 1,
            minWidth: 50,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(params.row)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleToggleBlock(params.row.id)}>
                        {
                            params.row.bloqueado ? (
                                <LockIcon style={{ color: "red" }} />
                            ) : (
                                <LockOpenIcon style={{ color: "green" }} />
                            )
                        }
                    </IconButton>
                    <IconButton onClick={() => handleShowImage(params.row)} color="primary">
                        <FaIdCard color="#004f79" />
                    </IconButton>
                </>
            )
        }
    ]

    if (!show && !closing) {
        return null
    }

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Visitantes Frecuentes Registrados
                    </Typography>
                    <div className="add-modal-close-button">
                        <Button onClick={handleCancelClick} startIcon={<CloseIcon />} color="white" size={isMobile ? "small" : "large"} />
                    </div>
                </div>
                { loading ? (
                    <div className="loading-container" style={{ marginTop: "100px" }}>
                        <Loader />
                    </div>
                ) : (
                    <div className="add-modal-content" style={{ animation: "none", padding: 0 }}>
                        <DataTable rows={visitantes} columns={columns} />
                    </div>
                )}
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button onClick={handleCancelClick} variant="outlined" color="error" startIcon={<CloseIcon />}>
                        Cerrar
                    </Button>
                </div>
            </div>

            <EditVisitanteFrecuenteModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onEdit={handleEditarVisitanteFrecuente}
                visitante_frecuente={selectedVisitanteFrecuente}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseDeleteModal}
                onDelete={handleBorrarVisitanteFrecuente}
            />

            <NotificationModal
                message={modalMensaje}
                onClose={handleCloseNotificationModal}
                isOpen={showNotificationModal}
            />

            {/* Modal para mostrar la imagen */}
            <Modal open={showImageModal} onClose={handleCloseImageModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 800,
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: "center"
                    }}
                >
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Identificación"
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                                maxHeight: "60vh",
                                objectFit: "contain",
                                animation: "popUp 0.3s ease-out"
                            }}
                        />
                    ) : (
                        <p>No se encontró la imagen.</p>
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default ViewFrecuentesModal
