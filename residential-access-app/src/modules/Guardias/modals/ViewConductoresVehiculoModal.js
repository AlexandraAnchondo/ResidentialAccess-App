import React, { useState } from "react"
import {
    Button,
    Typography
} from "@mui/material"
import {
    Close as CloseIcon,
    AddCircle, 
    User as UserIcon
} from "@mui/icons-material"
import { FaUserFriends } from "react-icons/fa"
import "../../../styles/General/AddModal.scss"
import DataTable from "../../../components/DataGrid"
import AddConductorModal from "./AddConductorModal"
import useMediaQuery from "@mui/material/useMediaQuery"

const ViewConductoresVehiculoModal = ({ show, onClose, vehiculo, onAdd, setSelectedConductor, selectedConductor, isRowSelected, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {

    const [closing, setClosing] = useState(false)
    const [showAddConductorModal, setShowAddConductorModal] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")

    if (!show && !closing) {
        return null
    }

    const handleCancelClick = () => {
        setClosing(true) // Activa la animación de cierre
        setTimeout(() => {
            onClose()
            setClosing(false) // Resetea el estado para futuras aperturas
        }, 500) // Tiempo de la animación en ms
    }

    const columns_conductores_vehiculos = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 300 },
        { field: "apellidos", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 150 },
        { field: "ine", headerAlign: "center", headerName: "INE", flex: 1, minWidth: 150 },
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
                                    handleCancelClick()
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

    return (
        <div className={`add-modal-overlay ${closing ? "fade-out" : ""}`}>
            <div className={`add-modal ${closing ? "scale-down" : ""}`}>
                <div className="add-modal-header">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Conductores Registrados
                    </Typography>
                    <div className="add-modal-close-button">
                        <Button
                            onClick={handleCancelClick}
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
                    {vehiculo?.conductores == null || vehiculo?.conductores.length === 0 ? (
                        <div className="vehiculo-no-data" style={{ margin: 0, fontSize: "1.5rem" }}>
                            <FaUserFriends className="icon-placeholder" style={{ marginTop: "20px", fontSize: "8rem" }}/>
                            <p>No se encontraron conductores relacionados</p>
                        </div>
                    ) : (
                        <DataTable rows={vehiculo.conductores} columns={columns_conductores_vehiculos} />
                    )}
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    {isRowSelected &&
                        <Button
                            variant="contained"
                            onClick={() => setShowAddConductorModal(true)}
                            endIcon={<AddCircle />}
                            sx={{ marginBottom: isMobile ? 2 : 0, marginTop: isMobile ? -5 : 0, backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                        >Agregar conductor</Button>
                    }
                    <Button
                        onClick={handleCancelClick}
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        style={{ marginLeft: 20 }}
                    >
                        {isRowSelected ? "Cancelar" : "Cerrar"}
                    </Button>
                </div>

                <AddConductorModal
                    show={showAddConductorModal}
                    onClose={() => setShowAddConductorModal(false)}
                    onAdd={onAdd}
                    vehiculoId={vehiculo.id}
                    isSaved={isSaved}
                    setIsSaved={setIsSaved}
                    isFailure={isFailure}
                    setIsFailure={setIsFailure}
                    message={message}
                />
            </div>
        </div>
    )
}

export default ViewConductoresVehiculoModal