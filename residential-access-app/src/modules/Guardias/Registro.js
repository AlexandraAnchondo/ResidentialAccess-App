// Resources
import React, { useState, useEffect } from "react"
import { FaIdCard, FaUserFriends, FaList, FaUserPlus } from "react-icons/fa"
import { Button } from "@mui/material"
import { ArrowBack, AddCircle, DirectionsCar, CarCrash } from "@mui/icons-material"
import "../../styles/Guardias/Registro.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import DataTable from "../../components/DataGrid"

// Modals
import ViewVehiculoVisitanteModal from "./modals/ViewVehiculosVisitanteModal"
import ViewConductoresVehiculoModal from "./modals/ViewConductoresVehiculoModal"
import AddVehiculoModal from "./modals/AddVehiculoModal"
import AddVisitaFrecuenteModal from "./modals/AddVisitaFrecuenteModal"
import AddVisitaVehiculoModal from "./modals/AddVisitaVehiculoModal"

// Hooks
import {
    useGetVisitantesFrecuentesWithDomicilio
} from "../../hooks/visitante_frecuente.hook"

const Registro = ({ selectedOption, setSelectedOption }) => {
    // API calls
    const { visitantes_frecuentes, setVisitanteFrecuentes, loading } = useGetVisitantesFrecuentesWithDomicilio()

    const columns_visitante = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 100 },
        { field: "calle", headerAlign: "center", headerName: "Calle", flex: 1, minWidth: 250 },
        { field: "numero", headerAlign: "center", headerName: "Número", flex: 1, minWidth: 150 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellido", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 250 },
        { field: "telefono", headerAlign: "center", headerName: "Teléfono", flex: 1, minWidth: 150 },
        {
            field: "action",
            headerName: "Vehículos",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    onClick={() => handleViewVehiculoVisitanteClick(params?.row)}
                    disabled={params.row.vehiculos == null}
                    sx={{
                        backgroundColor: params.row.vehiculos != null ? "#008db8" : "#ffff",
                        "&:hover": { backgroundColor: "#0a395f" },
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                >
                    {params.row.vehiculos != null ? <DirectionsCar /> : <CarCrash />}
                </Button>
            )
        }
    ]

    const columns_vehiculo = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 100 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 150 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 150 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 150 },
        {
            field: "action",
            headerName: "Conductores",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    onClick={() => handleViewConductoresVehiculoClick(params?.row)}
                    disabled={params.row.conductores == null}
                    sx={{
                        backgroundColor: params.row.conductores != null ? "#008db8" : "#ffff",
                        "&:hover": { backgroundColor: "#0a395f" },
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                >
                    {params.row.conductores != null ? <FaUserFriends /> : <FaUserPlus />}
                </Button>
            )
        }
    ]

    const rows_vehiculo = [
        { id: 1, placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo", conductores: [{ id: "1", nombre: "Alexandra", apellido: "Anchondo", identificacion: "1234567890" }, { id: "2", nombre: "Alexandra", apellido: "Anchondo", identificacion: "1234567890" }] },
        { id: 2, placas: "FJF9FS09", modelo: "Volkswagen Jetta", color: "Azul",  conductores: [{ id: "3", nombre: "Benito", apellido: "Juarez", identificacion: "0987654321" }] },
        { id: 3, placas: "ORALE456H", modelo: "Honda Civic", color: "Negro" }
    ]

    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)
    const [showViewVehiculosVisitanteModal, setShowViewVehiculosVisitanteModal] = useState(false) // Open the modal for viewing the visitor's cars
    const [showViewConductoresVehiculoModal, setShowViewConductoresVehiculoModal] = useState(false) // Open the modal for viewing the car's conductors
    const [showAddVisitaFrecuenteModal, setShowAddVisitaFrecuenteModal] = useState(false) // Open the modal for add a new visit for a frecuent visitor
    const [showAddVisitaVehiculoModal, setShowAddVisitaVehiculoModal] = useState(false) // Open the modal for add a new visit for a vehicle
    const [selectedVisitante, setSelectedVisitante] = useState(null) // Means the selected visitor when open vehiculos-visitor modal without clicking the row
    const [selectedVehiculoFromVisitante, setSelectedVehiculoFromVisitante] = useState(null) // Means the current selected vehiculo for the visit from the vehiculos-visitor modal
    const [selectedVehiculoFromConductor, setSelectedVehiculoFromConductor] = useState(null) // Means the current selected vehiculo for the visit from the conductors-vehiculo modal
    const [selectedConductor, setSelectedConductor] = useState(null) // Means the current selected conductor for the visit from the conductors-vehiculo modal
    const [selectedRow, setSelectedRow] = useState(null) // Means the visitor row selected in frecuent-visitor table

    const isMobile = useMediaQuery("(max-width: 768px)") // Detecta tamaño de pantalla

    useEffect(() => {
        if (showAddVehiculoModal || showViewVehiculosVisitanteModal || showAddVisitaFrecuenteModal || showAddVisitaVehiculoModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const handleCardSelection = (card) => {
        setSelectedOption(card)
        if (card === "Visitante frecuente") {
            setRows(visitantes_frecuentes)
            setColumns(columns_visitante)
        } else {
            setRows(rows_vehiculo)
            setColumns(columns_vehiculo)
        }
    }

    const handleBackClick = () => {
        setSelectedOption("Registro de visitas")
        setSelectedRow(null)
        setSelectedVisitante(null)
        setSelectedVehiculoFromConductor(null)
        setSelectedVehiculoFromVisitante(null)
        setSelectedConductor(null)
    }

    const handleAddVehiculoClick = (nuevoVehiculo) => {
        if(nuevoVehiculo.visitante_id != null) {
            console.log("Voy a registrar un vehiculo al nombre de un visitante")
            return
        } else {
            console.log("Voy a registrar un vehiculo de un conductor cualquiera")
            return
        }
    }

    const handleAddConductorClick = (nuevoConductor) => {
        console.log("Voy a registrar un conductor de un vehículo")
        console.log(nuevoConductor)
    }

    const handleViewVehiculoVisitanteClick = (rowData) => {
        setShowViewVehiculosVisitanteModal(true)
        if (rowData.vehiculos !== null && rowData.vehiculos.length > 0) {
            setSelectedVisitante(rowData)
        }
    }

    const handleViewConductoresVehiculoClick = (rowData) => {
        setShowViewConductoresVehiculoModal(true)
        if (rowData.conductores !== null && rowData.conductores.length > 0) {
            setSelectedVehiculoFromConductor(rowData)
        }
    }

    const handleRowSelection = (selectionModel) => {
        if (selectionModel.length === 1) {
            const selectedRowData = rows.find(row => row.id === selectionModel[0])
            setSelectedRow(selectedRowData)
        } else {
            setSelectedRow(null)
            setSelectedVehiculoFromVisitante(null)
            setSelectedConductor(null)
        }
    }

    return (
        <div className="registro-container">
            {selectedOption === "Registro de visitas" ? (
                <div className="card-container">
                    <button className="card" onClick={() => handleCardSelection("Visitante frecuente")}>
                        <FaUserFriends size={isMobile ? 130 : 200} />
                        <span>Visitante frecuente</span>
                    </button>
                    <button className="card" onClick={() => handleCardSelection("Vehículos")}>
                        <FaIdCard size={isMobile ? 150 : 230} />
                        <span>Conductor</span>
                    </button>
                </div>
            ) :
                selectedOption === "Visitante frecuente" ? (
                    <div className="visitante-frecuente-container">
                        {rows.length === 0 ? (
                            <div className="visitante-frecuente-no-data">
                                <FaList className="icon-placeholder" />
                                <p>No se encontraron visitantes frecuentes</p>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ flex: 1, minWidth: "100%", marginTop: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        ) : (
                            <div className="visitante-frecuente-table-section">
                                <div className="registrar-visita-button-container">
                                    {selectedRow && selectedVehiculoFromVisitante != null && (
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: "#004f79", "&:hover": { backgroundColor: "#0a395f" } }}
                                            onClick={() => setShowAddVisitaFrecuenteModal(true)}
                                            style={{
                                                marginRight: "20px",
                                                marginBottom: "-20px",
                                                marginTop: "20px",
                                                zIndex: 10
                                            }}
                                        >
                                    Registrar visita
                                        </Button>
                                    )}
                                </div>
                                <DataTable rows={rows} columns={columns} checkboxSelection={true} handleRowSelection={handleRowSelection} />
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ marginLeft: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="vehiculo-container">
                        {rows.length === 0 ? (
                            <div className="vehiculo-no-data">
                                <FaList className="icon-placeholder" />
                                <p>No se encontraron vehículos</p>
                                <Button
                                    variant="contained"
                                    onClick={() => setShowAddVehiculoModal(true)}
                                    endIcon={<AddCircle />}
                                    sx={{ flex: 1, minWidth: "100%", marginTop: "20px", backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                                >Agregar vehículo</Button>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ flex: 1, minWidth: "100%", marginTop: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        ) : (
                            <div className="vehiculo-table-section">
                                <div className="registrar-visita-button-container">
                                    {selectedRow && selectedConductor != null && (
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: "#004f79", "&:hover": { backgroundColor: "#0a395f" } }}
                                            onClick={() => setShowAddVisitaVehiculoModal(true)}
                                            style={{
                                                marginRight: "20px",
                                                marginBottom: "-20px",
                                                marginTop: "20px",
                                                zIndex: 10
                                            }}
                                        >
                                    Registrar visita
                                        </Button>
                                    )}
                                </div>
                                <DataTable rows={rows} columns={columns} checkboxSelection={true} handleRowSelection={handleRowSelection}/>
                                <Button
                                    variant="contained"
                                    onClick={() => setShowAddVehiculoModal(true)}
                                    endIcon={<AddCircle />}
                                    sx={{ flex: 1, minWidth: "40%", marginLeft: "20px", backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                                >Agregar vehículo</Button>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ marginLeft: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        )}
                    </div>
                )}

            <AddVehiculoModal
                show={showAddVehiculoModal}
                onClose={() => setShowAddVehiculoModal(false)}
                onAdd={handleAddVehiculoClick}
            />

            <ViewVehiculoVisitanteModal
                show={showViewVehiculosVisitanteModal}
                onClose={() => setShowViewVehiculosVisitanteModal(false)}
                visitante={selectedVisitante}
                onAdd={handleAddVehiculoClick}
                setSelectedVehiculo={setSelectedVehiculoFromVisitante}
                selectedVehiculo={selectedVehiculoFromVisitante}
                isRowSelected={selectedRow != null}
            />

            <ViewConductoresVehiculoModal
                show={showViewConductoresVehiculoModal}
                onClose={() => setShowViewConductoresVehiculoModal(false)}
                vehiculo={selectedVehiculoFromConductor}
                onAdd={handleAddConductorClick}
                setSelectedConductor={setSelectedConductor}
                selectedConductor={selectedConductor}
                isRowSelected={selectedRow != null}
            />

            <AddVisitaFrecuenteModal
                show={showAddVisitaFrecuenteModal}
                onClose={() => setShowAddVisitaFrecuenteModal(false)}
                visitante={selectedRow}
                vehiculo={selectedVehiculoFromVisitante}
                setSelectedOption={setSelectedOption}
                setSelectedRow={setSelectedRow}
                setSelectedVehiculo={setSelectedVehiculoFromVisitante}
            />

            <AddVisitaVehiculoModal
                show={showAddVisitaVehiculoModal}
                onClose={() => setShowAddVisitaVehiculoModal(false)}
                conductor={selectedConductor}
                setSelectedOption={setSelectedOption}
                setSelectedRow={setSelectedRow}
                setSelectedConductor={setSelectedConductor}
            />
        </div>
    )
}

export default Registro
