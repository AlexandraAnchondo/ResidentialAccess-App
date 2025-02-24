import React, { useState, useEffect } from "react"
import { Button, Typography, IconButton } from "@mui/material"
import { Close as CloseIcon, Delete as DeleteIcon, Lock as LockIcon, LockOpen as LockOpenIcon } from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import DataTable from "../../../components/DataGrid"
import useMediaQuery from "@mui/material/useMediaQuery"
import DeleteModal from "../../../components/modals/DeleteModal"

const ViewResidentesModal = ({ show, onClose, domicilioId }) => {

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState(null)

    useEffect(() => {
        setClosing(false)
        document.body.style.overflow = showDeleteModal ? "hidden" : "auto"
    }, [showDeleteModal]) // Se ejecuta solo cuando showDeleteModal cambia

    const [residentes, setResidentes] = useState([
        { id: 1, nombre: "Juan", apellido: "Perez", telefono: "555-555-5555", correo: "juan@example.com", identificacion: "1234567890", bloqueado: false, principal: true },
        { id: 2, nombre: "Maria", apellido: "Garcia", telefono: "666-666-6666", correo: "maria@example.com", identificacion: "9876543210", bloqueado: false },
        { id: 3, nombre: "Pedro", apellido: "Lopez", telefono: "777-777-7777", correo: "pedro@example.com", identificacion: "0987654321", bloqueado: false },
        { id: 4, nombre: "Sofia", apellido: "Martinez", telefono: "888-888-8888", correo: "sofia@example.com", identificacion: "1234567890", bloqueado: true }
    ])

    const handleToggleBlock = (id) => {
        setResidentes((prev) => prev.map((res) => res.id === id ? { ...res, bloqueado: !res.bloqueado } : res))
    }

    const handleDelete = () => {
        setResidentes((prev) => prev.filter((res) => res.id !== indexToDelete))
        setShowDeleteModal(false)
    }

    const handleDeleteClick = (id) => {
        setShowDeleteModal(true)
        setIndexToDelete(id)
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

    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellido", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 150 },
        { field: "telefono", headerAlign: "center", headerName: "Teléfono", flex: 1, minWidth: 150 },
        { field: "correo", headerAlign: "center", headerName: "Correo", flex: 1, minWidth: 200 },
        { field: "identificacion", headerAlign: "center", headerName: "INE", flex: 1, minWidth: 50 },
        {
            field: "action",
            headerName: "Acciones",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <>
                    {!params.row.principal && (
                        <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={() => handleToggleBlock(params.row.id)} color="primary">
                        {params.row.bloqueado ? <LockIcon /> : <LockOpenIcon />}
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
                <div className="add-modal-content" style={{ animation: "none", padding: 0 }}>
                    <DataTable rows={residentes} columns={columns} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button onClick={handleCancelClick} variant="outlined" color="error" startIcon={<CloseIcon />}>
                        Cerrar
                    </Button>
                </div>
            </div>

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseDeleteModal}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default ViewResidentesModal
