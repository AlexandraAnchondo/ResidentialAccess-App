import React, { useState } from "react"
import {
    Button,
    Typography
} from "@mui/material"
import {
    Close as CloseIcon,
    AddCircle,
    DirectionsCar as DirectionsCarIcon
} from "@mui/icons-material"
import "../../../styles/General/AddModal.scss"
import DataTable from "../../../components/DataGrid"
import AddVehiculoModal from "./AddVehiculoModal"
import useMediaQuery from "@mui/material/useMediaQuery"

const ViewVehiculoResidenteModal = ({ show, onClose, residente, onAdd, setSelectedVehiculo, selectedVehiculo, isRowSelected, isSaved, setIsSaved, isFailure, setIsFailure, message }) => {

    const [closing, setClosing] = useState(false) //Estado para manejar animacion de cierre
    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)
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

    const columns_vehiculos_residentes = [
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
                        Vehículos Registrados
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
                    {residente?.vehiculos == null || residente?.vehiculos.length === 0 ? (
                        <div className="vehiculo-no-data" style={{ margin: 0, fontSize: "1.5rem" }}>
                            <DirectionsCarIcon className="icon-placeholder" style={{ marginTop: "20px", fontSize: "8rem" }}/>
                            <p>No se encontraron vehículos relacionados</p>
                        </div>
                    ) : (
                        <DataTable rows={residente.vehiculos} columns={columns_vehiculos_residentes} viewFromModal={true}/>
                    )}
                </div>
                <div className="add-modal-buttons" style={{ marginTop: 16, marginBottom: 16 }}>
                    {isRowSelected &&
                        <Button
                            variant="contained"
                            onClick={() => setShowAddVehiculoModal(true)}
                            endIcon={<AddCircle />}
                            sx={{ marginBottom: isMobile ? 2 : 0, marginTop: isMobile ? -5 : 0, backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                        >Agregar vehículo</Button>
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

                <AddVehiculoModal
                    show={showAddVehiculoModal}
                    onClose={() => setShowAddVehiculoModal(false)}
                    id_domicilio={residente.id_domicilio}
                    onAdd={onAdd}
                    residenteId={residente.id}
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

export default ViewVehiculoResidenteModal