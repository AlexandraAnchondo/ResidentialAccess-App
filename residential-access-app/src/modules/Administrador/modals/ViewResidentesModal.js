import React, { useState, useEffect } from "react"
import { Button, Typography, IconButton, Modal, Box } from "@mui/material"
import { Close as CloseIcon, Delete as DeleteIcon, Lock as LockIcon, LockOpen as LockOpenIcon, Edit } from "@mui/icons-material"
import { FaIdCard } from "react-icons/fa"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

// Modals
import DeleteModal from "../../../components/modals/DeleteModal"
import EditResidenteModal from "../modals/EditResidenteModal"
import NotificationModal from "../../../components/modals/NotificacionModal"

// Components
import DataTable from "../../../components/DataGrid"
import Loader from "../../../components/Loader"

// Hooks
import {
    useGetResidentesByDomicilioManual,
    useUpdateResidente,
    useDeleteResidente
} from "../../../hooks/residente.hook"

const ViewResidentesModal = ({ show, onClose, domicilioId }) => {
    // API calls
    const { residentes, setResidentes, loading, fetchResidentes  } = useGetResidentesByDomicilioManual()
    const { editResidente } = useUpdateResidente()
    const { removeResidente } = useDeleteResidente()

    // State variables
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [imageSrc, setImageSrc] = useState("")
    const [showImageModal, setShowImageModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedResidente, setSelectedResidente] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")

    useEffect(() => {
        if (show && domicilioId) {
            fetchResidentes(domicilioId)
        }
        setClosing(false)
        document.body.style.overflow = showDeleteModal ? "hidden" : "auto"
    }, [show, domicilioId, showDeleteModal]) // Se ejecuta solo cuando showDeleteModal cambia

    const handleEditClick = (residente) => {
        setSelectedResidente(residente)
        setShowEditModal(true)
    }

    const handleEditarResidente = async (residenteEditado) => {
        try {
            const response = await editResidente({ ...residenteEditado })
            if (response.id != null) {
                const updatedResidentes = residentes.map((residente) =>
                    residente.id === residenteEditado.id ? { ...residenteEditado } : residente
                )
                setResidentes(updatedResidentes)
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
        const updatedResidentes = await residentes.map((residente) => {
            if (residente.id === id) {
                editResidente({ ...residente, bloqueado: !residente.bloqueado })
                return { ...residente, bloqueado: !residente.bloqueado }
            }
            return residente
        })
        setResidentes(updatedResidentes)
    }

    const handleDeleteClick = (residente) => {
        setShowDeleteModal(true)
        setSelectedResidente(residente)
    }

    const handleBorrarResidente = async () => {
        await removeResidente(selectedResidente)
        const newResidentes = residentes.filter((value) => value.id !== selectedResidente)
        setResidentes(newResidentes)
        setShowDeleteModal(false)
    }

    const handleCloseModal = () => {
        setShowDeleteModal(false)
        setShowNotificationModal(false)
        setModalMensaje("")
    }

    const handleCancelClick = () => {
        setClosing(true)
        setSelectedResidente(null)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    const handleShowImage = (row) => {
        if (row.ine) {
            const imagePath = typeof row.ine === "string" ? row.ine : URL.createObjectURL(row.ine)
            setImageSrc(imagePath)
            setShowImageModal(true)
        } else {
            handleNotificationModalMessage("No se encontró ine para este residente.")
        }
    }

    const handleCloseImageModal = () => {
        setShowImageModal(false)
        setImageSrc("")
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
        { field: "correo_electronico", headerAlign: "center", headerName: "Correo", flex: 1, minWidth: 200 },
        {
            field: "action",
            headerName: "Acciones",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <>
                    {!params.row.is_principal ?(
                        <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    ) :
                        <IconButton onClick={() => handleShowImage(params.row)} color="primary">
                            <FaIdCard color="#004f79" />
                        </IconButton>
                    }
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
                        Residentes Registrados
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
                        <DataTable rows={residentes} columns={columns} />
                    </div>
                )}
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button onClick={handleCancelClick} variant="outlined" color="error" startIcon={<CloseIcon />}>
                        Cerrar
                    </Button>
                </div>
            </div>

            {/* Modal para mostrar la imagen */}
            <Modal open={showImageModal} onClose={handleCloseImageModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
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
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    ) : (
                        <p>No se encontró la imagen.</p>
                    )}
                </Box>
            </Modal>

            <EditResidenteModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onEdit={handleEditarResidente}
                residente={selectedResidente}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseModal}
                onDelete={handleBorrarResidente}
            />

            <NotificationModal
                message={modalMensaje}
                onClose={handleCloseModal}
                isOpen={showNotificationModal}
            />
        </div>
    )
}

export default ViewResidentesModal
