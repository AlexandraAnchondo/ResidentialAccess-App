import React, { useState } from "react"
import {
    Button,
    Typography
} from "@mui/material"
import {
    Close as CloseIcon,
    AddCircle
} from "@mui/icons-material"
import "../../../styles/AddModal.css"
import DataTable from "../../../components/DataGrid"
import AddVehiculoModal from "./AddAutoModal"

const ViewAutoVisitanteModal = ({ show, onClose, visitante, onAdd }) => {
    if (!show) {
        return null
    }

    const columns_autos_visitantes = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 250 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 250 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 150 }
    ]

    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Autos Registrados
                    </Typography>
                </div>
                <div className="add-modal-content" style={{ animation: "none", padding: 0 }}>
                    <DataTable rows={visitante.autos} columns={columns_autos_visitantes} checkboxSelection={true} />
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    <Button
                        variant="contained"
                        onClick={() => setShowAddVehiculoModal(true)}
                        endIcon={<AddCircle />}
                        sx={{ backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
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

export default ViewAutoVisitanteModal