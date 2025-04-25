import React, { useState, useEffect } from "react"
import { Button, Typography, IconButton } from "@mui/material"
import { Close as CloseIcon, Delete as DeleteIcon, Lock as LockIcon, LockOpen as LockOpenIcon, Edit } from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

// Modals
import DeleteModal from "../../../components/modals/DeleteModal"
import EditVehiculoModal from "../modals/EditVehiculoModal"

// Components
import DataTable from "../../../components/DataGrid"
import Loader from "../../../components/Loader"

// Hooks
import {
    useGetVehiculosByDomicilioManual,
    useUpdateVehiculo,
    useDeleteVehiculo
} from "../../../hooks/vehiculo.hook"

const ViewVehiculosModal = ({ show, onClose, domicilioId }) => {
    // API calls
    const { vehiculos, setVehiculos, loading, fetchVehiculos  } = useGetVehiculosByDomicilioManual()
    const { editVehiculo } = useUpdateVehiculo()
    const { removeVehiculo } = useDeleteVehiculo()

    // State variables
    const isMobile = useMediaQuery("(max-width: 768px)")
    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedVehiculo, setSelectedVehiculo] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)

    useEffect(() => {
        if (show && domicilioId) {
            fetchVehiculos(domicilioId)
        }
        setClosing(false)
        document.body.style.overflow = showDeleteModal ? "hidden" : "auto"
    }, [show, domicilioId, showDeleteModal]) // Se ejecuta solo cuando showDeleteModal cambia

    const handleEditClick = (residente) => {
        setSelectedVehiculo(residente)
        setShowEditModal(true)
    }

    const handleEditarVehiculo = async (vehiculo_editado) => {
        try {
            const response = await editVehiculo({ ...vehiculo_editado })
            if (response.id != null) {
                const updatedVehiculos = vehiculos.map((residente) =>
                    residente.id === vehiculo_editado.id ? { ...vehiculo_editado } : residente
                )
                setVehiculos(updatedVehiculos)
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
        const updatedVehiculos = await vehiculos.map((vehiculo) => {
            if (vehiculo.id === id) {
                editVehiculo({ ...vehiculo, bloqueado: !vehiculo.bloqueado })
                return { ...vehiculo, bloqueado: !vehiculo.bloqueado }
            }
            return vehiculo
        })
        setVehiculos(updatedVehiculos)
    }

    const handleDeleteClick = (vehiculo) => {
        setShowDeleteModal(true)
        setSelectedVehiculo(vehiculo)
    }

    const handleBorrarVehiculo= async () => {
        await removeVehiculo(selectedVehiculo)
        const newResidentes = vehiculos.filter((value) => value.id !== selectedVehiculo)
        setVehiculos(newResidentes)
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
                    <IconButton onClick={() => handleEditClick(params.row)} color="primary">
                        <Edit />
                    </IconButton>
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
                        Vehículos Registrados
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
                        <DataTable rows={vehiculos} columns={columns} />
                    </div>
                )}
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button onClick={handleCancelClick} variant="outlined" color="error" startIcon={<CloseIcon />}>
                        Cerrar
                    </Button>
                </div>
            </div>

            <EditVehiculoModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onEdit={handleEditarVehiculo}
                vehiculo={selectedVehiculo}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseDeleteModal}
                onDelete={handleBorrarVehiculo}
            />
        </div>
    )
}

export default ViewVehiculosModal
