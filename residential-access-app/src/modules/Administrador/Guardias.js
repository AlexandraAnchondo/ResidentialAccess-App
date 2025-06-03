// Resources
import React, { useState, useEffect } from "react"
import "../../styles/Administrador/Guardias.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"
import { FaIdCard } from "react-icons/fa"
import { Delete as DeleteIcon, Lock as LockIcon, LockOpen as LockOpenIcon, Edit } from "@mui/icons-material"
import { IconButton, Modal, Box } from "@mui/material"

// Components
import DataTable from "../../components/DataGrid"
import Loader from "../../components/Loader"

// Modals
import DeleteModal from "../../components/modals/DeleteModal"
import EditGuardiaModal from "./modals/EditGuardiaModal"
import NotificationModal from "../../components/modals/NotificacionModal"

// Hooks
import {
    useGetAllGuardias,
    useDeleteUsuario,
    useUpdateUsuario
} from "../../hooks/usuario.hook"

const Guardias = () => {
    // API calls
    const { guardias, setGuardias, loading } = useGetAllGuardias()
    const { removeUsuario } = useDeleteUsuario()
    const { editUsuario } = useUpdateUsuario()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [guardiaSelected, setGuardiaSelected] = useState(null)
    const [showImageModal, setShowImageModal] = useState(false)
    const [imageSrc, setImageSrc] = useState("")
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedGuardia, setSelectedGuardia] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")

    useEffect(() => {
        document.body.style.overflow = showDeleteModal || showImageModal ? "hidden" : "auto"
    }, [showDeleteModal, showImageModal])

    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellidos", headerAlign: "center", headerName: "Apellidos", flex: 1, minWidth: 150 },
        { field: "telefono", headerAlign: "center", headerName: "Teléfono", flex: 1, minWidth: 150 },
        { field: "correo_electronico", headerAlign: "center", headerName: "Correo", flex: 1, minWidth: 200 },
        { field: "rfc", headerAlign: "center", headerName: "RFC", flex: 1, minWidth: 50 },
        {
            field: "action",
            headerName: "Acciones",
            flex: 1,
            minWidth: 50,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleDeleteClick(params.row)} color="error">
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
                            )}
                    </IconButton>
                    <IconButton onClick={() => handleShowImage(params.row)} color="primary">
                        <FaIdCard color="#004f79" />
                    </IconButton>
                </>
            )
        }
    ]

    const handleEditClick = (guardia) => {
        setSelectedGuardia(guardia)
        setShowEditModal(true)
    }

    const handleToggleBlock = async (id) => {
        const updatedGuardias = await guardias.map((guardia) => {
            if (guardia.id === id) {
                editUsuario({ ...guardia, bloqueado: !guardia.bloqueado })
                return { ...guardia, bloqueado: !guardia.bloqueado }
            }
            return guardia
        })
        setGuardias(updatedGuardias)
    }

    const handleEditarGuardia = async (guardiaEditado) => {
        try {
            const response = await editUsuario({ ...guardiaEditado })
            if (response.id != null) {
                const updatedGuardias = guardias.map((guardia) =>
                    guardia.id === guardiaEditado.id ? { ...guardiaEditado } : guardia
                )
                setGuardias(updatedGuardias)
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

    const handleDeleteGuardia = async () => {
        await removeUsuario(guardiaSelected)
        const newGuardias = guardias.filter((value) => value.id !== guardiaSelected)
        setGuardias(newGuardias)
        setShowDeleteModal(false)
    }

    const handleDeleteClick = (guardia) => {
        setShowDeleteModal(true)
        setGuardiaSelected(guardia.id)
    }

    const handleCloseModal = () => {
        setShowDeleteModal(false)
        setGuardiaSelected(null)
        setShowNotificationModal(false)
        setModalMensaje("")
    }

    const handleShowImage = (row) => {
        if (row.ine) {
            const imagePath = `${process.env.REACT_APP_API_ASSETS_URL}${row.ine}`
            setImageSrc(imagePath)
            setShowImageModal(true)
        } else {
            handleNotificationModalMessage("No se encontró ine para este guardia.")
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

    return (
        <div className="guardias-container">
            {guardias.length === 0 && !loading ? (
                <div className="historial-no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ) : loading ? (
                <div className="loading-container" style={{ marginTop: "100px" }}>
                    <Loader />
                </div>
            ) : (
                <DataTable rows={guardias} columns={columns} />
            )}

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseModal}
                onDelete={handleDeleteGuardia}
            />

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
                            style={{ width: "100%", borderRadius: "8px", animation: "popUp 0.3s ease-out" }}
                        />
                    ) : (
                        <p>No se encontró la imagen.</p>
                    )}
                </Box>
            </Modal>

            <EditGuardiaModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onEdit={handleEditarGuardia}
                guardia={selectedGuardia}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <NotificationModal
                message={modalMensaje}
                onClose={handleCloseModal}
                isOpen={showNotificationModal}
            />
        </div>
    )
}

export default Guardias
