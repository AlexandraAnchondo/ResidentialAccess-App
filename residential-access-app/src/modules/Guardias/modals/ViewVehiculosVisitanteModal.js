import React, { useState } from "react"
import {
    Button,
    Typography
} from "@mui/material"
import {
    Close as CloseIcon,
    AddCircle
} from "@mui/icons-material"
import "../../../styles/General/AddModal.css"
import DataTable from "../../../components/DataGrid"
import AddVehiculoModal from "./AddVehiculoModal"
import useMediaQuery from "@mui/material/useMediaQuery"

const ViewVehiculosVisitanteModal = ({ show, onClose, visitante, onAdd, setSelectedVehiculo, selectedVehiculo, isRowSelected }) => {
    if (!show) {
        return null
    }

    const isMobile = useMediaQuery("(max-width: 768px)")

    const columns_vehiculos_visitantes = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 250 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 250 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 150 },
        ...(isRowSelected
            ? [
                {
                    field: "action",
                    headerName: "Acciones",
                    flex: 1,
                    minWidth: 150,
                    headerAlign: "center",
                    align: "center",
                    renderCell: (params) => {
                        const isSelected = selectedVehiculo?.id === params.row.id
                        return (
                            <Button
                                onClick={() => {
                                    setSelectedVehiculo(params?.row)
                                    onClose()
                                }}
                                size="small"
                                disabled={isSelected}
                                sx={{
                                    backgroundColor: isSelected ? "#a8ffc9" : "#008db8",
                                    "&:hover": {
                                        backgroundColor: "#0a395f"
                                    },
                                    color: "white",
                                    border: "none",
                                    cursor: isSelected ? "default" : "pointer",
                                    borderRadius: "5px"
                                }}
                            >
                                {isSelected ? "Seleccionado" : "Seleccionar"}
                            </Button>
                        )
                    }
                }
            ]
            : []) // Si no hay fila seleccionada, no agregar la columna
    ]

    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Vehículos Registrados
                    </Typography>
                    <div className="add-modal-close-button">
                        <Button
                            onClick={onClose}
                            startIcon={<CloseIcon />}
                            color="white"
                            size={isMobile ? "small" : "large"}
                            sx={{
                                marginBottom: isMobile ? 0 : 4,
                                marginLeft: isMobile ? 2 : 5,
                                margin: "auto",
                                padding:"auto"
                            }}
                        />
                    </div>
                </div>
                <div className="add-modal-content" style={{ animation: "none", padding: 0 }}>
                    <DataTable rows={visitante.vehiculos} columns={columns_vehiculos_visitantes} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button
                        variant="contained"
                        onClick={() => setShowAddVehiculoModal(true)}
                        endIcon={<AddCircle />}
                        sx={{ marginBottom: 2, marginTop: -5, backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                    >Agregar vehículo</Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        style={{ marginLeft: 20 }}
                    >
                        Cancelar
                    </Button>
                </div>

                <AddVehiculoModal
                    show={showAddVehiculoModal}
                    onClose={() => setShowAddVehiculoModal(false)}
                    onAdd={onAdd}
                    visitanteId={visitante.id}
                />
            </div>
        </div>
    )
}

export default ViewVehiculosVisitanteModal