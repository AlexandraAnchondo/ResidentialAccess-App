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
                    <IconButton onClick={() => handleToggleBlock(params.row.id)} color="error">
                        <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleToggleBlock(params.row.id)} color="">
                        {params.row.bloqueado ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleShowImage(params.row)} color="primary">
                        <FaIdCard color="green" />
                    </IconButton>
                </>
            )
        }
    ]

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
    }

    const handleShowImage = (row) => {
        if (row.ine) {
            const imagePath = "INE.png"
            setImageSrc(imagePath)
            setShowImageModal(true)
        } else {
            alert("No se encontró imagen para este guardia.")
        }
    }

    const handleCloseImageModal = () => {
        setShowImageModal(false)
        setImageSrc("")
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
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    ) : (
                        <p>No se encontró la imagen.</p>
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default Guardias
