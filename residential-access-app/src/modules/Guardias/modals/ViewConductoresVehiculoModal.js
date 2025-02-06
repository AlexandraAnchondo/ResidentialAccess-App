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
import AddConductorModal from "./AddConductorModal"
import useMediaQuery from "@mui/material/useMediaQuery"

const ViewConductoresVehiculoModal = ({ show, onClose, vehiculo, onAdd, setSelectedConductor, selectedConductor, isRowSelected }) => {
    if (!show) {
        return null
    }

    const isMobile = useMediaQuery("(max-width: 768px)")

    const columns_vehiculos_visitantes = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 300 },
        { field: "apellido", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 150 },
        { field: "identificacion", headerAlign: "center", headerName: "INE", flex: 1, minWidth: 150 },
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
                        const isSelected = selectedConductor?.id === params.row.id
                        return (
                            <Button
                                onClick={() => {
                                    setSelectedConductor(params?.row)
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

    const [showAddConductorModal, setShowAddConductorModal] = useState(false)

    const isMobile = useMediaQuery("(max-width: 768px)")

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Conductores Registrados
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
                    <DataTable rows={vehiculo.conductores} columns={columns_vehiculos_visitantes} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button
                        variant="contained"
                        onClick={() => setShowAddConductorModal(true)}
                        endIcon={<AddCircle />}
                        sx={{ marginBottom: isMobile ? 2 : 0, marginTop: isMobile ? -5 : 0, backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                    >Agregar conductor</Button>
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

                <AddConductorModal
                    show={showAddConductorModal}
                    onClose={() => setShowAddConductorModal(false)}
                    onAdd={onAdd}
                />
            </div>
        </div>
    )
}

export default ViewConductoresVehiculoModal