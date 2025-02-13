import React, { useState, useEffect } from "react"
import { Button, Typography, IconButton } from "@mui/material"
import { Close as CloseIcon, Delete as DeleteIcon, Lock as LockIcon, LockOpen as LockOpenIcon } from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import DataTable from "../../../components/DataGrid"
import useMediaQuery from "@mui/material/useMediaQuery"
import DeleteModal from "../../../components/modals/DeleteModal"

const ViewVehiculosModal = ({ show, onClose, domicilioId }) => {
    if (!show) {
        return null
    }

    useEffect(() => {
        if (showDeleteModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const isMobile = useMediaQuery("(max-width: 768px)")

    const [vehiculos, setVehiculos] = useState([
        { id: 1, placas: "ABC123", modelo: "Toyota", color: "Rojo", bloqueado: false },
        { id: 2, placas: "DEF456", modelo: "Ford", color: "Azul", bloqueado: false },
        { id: 3, placas: "GHI789", modelo: "Chevrolet", color: "Negro", bloqueado: false },
    ])

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState(null)

    const handleToggleBlock = (id) => {
        setVehiculos((prev) => prev.map((res) => res.id === id ? { ...res, bloqueado: !res.bloqueado } : res))
    }

    const handleDelete = () => {
        setVehiculos((prev) => prev.filter((res) => res.id !== indexToDelete))
        setShowDeleteModal(false)
    }

    const handleDeleteClick = (id) => {
        setShowDeleteModal(true)
        setIndexToDelete(id)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 150 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 50 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 150 },
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
                    <IconButton onClick={() => handleToggleBlock(params.row.id)} color="primary">
                        {params.row.bloqueado ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                </>
            )
        }
    ]

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Vehículos Registrados
                    </Typography>
                    <div className="add-modal-close-button">
                        <Button onClick={onClose} startIcon={<CloseIcon />} color="white" size={isMobile ? "small" : "large"} />
                    </div>
                </div>
                <div className="add-modal-content" style={{ animation: "none", padding: 0 }}>
                    <DataTable rows={vehiculos} columns={columns} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button onClick={onClose} variant="outlined" color="error" startIcon={<CloseIcon />}>
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

export default ViewVehiculosModal
