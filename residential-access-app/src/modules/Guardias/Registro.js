import React, { useState, useEffect } from "react"
import { FaIdCard, FaUserFriends, FaList } from "react-icons/fa"
import { Button } from "@mui/material"
import { ArrowBack, AddCircle, DirectionsCar } from "@mui/icons-material"
import DataTable from "../../components/DataGrid"
import "../../styles/Guardias/Registro.css"
import AddVehiculoModal from "./modals/AddAutoModal"
import ViewAutoVisitanteModal from "./modals/ViewAutosVisitanteModal"
import ViewConductoresAutoModal from "./modals/ViewConductoresAutoModal"
import AddVisitaFrecuenteModal from "./modals/AddVisitaFrecuenteModal"
import AddVisitaVehiculoModal from "./modals/AddVisitaVehiculoModal"

const Registro = ({ selectedOption, setSelectedOption }) => {
    const columns_visitante = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 100 },
        { field: "calle", headerAlign: "center", headerName: "Calle", flex: 1, minWidth: 250 },
        { field: "numero", headerAlign: "center", headerName: "Número", flex: 1, minWidth: 150 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 250 },
        { field: "apellido", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 250 },
        { field: "telefono", headerAlign: "center", headerName: "Teléfono", flex: 1, minWidth: 150 },
        {
            field: "action",
            headerName: "Acciones",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    onClick={() => handleViewAutoVisitanteClick(params?.row)}
                    sx={{
                        backgroundColor: "#008db8",
                        "&:hover": { backgroundColor: "#0a395f" },
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                >
                    <DirectionsCar />
                </Button>
            )
        }
    ]

    const rows_visitante = [
        { id: 1, calle: "Av. Libertador", numero: 123, nombre: "Alexandra", apellido: "Anchondo", telefono: "686-420-49-24", autos: [{ id: "1", placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo" }, { id: "2", placas: "ORALE456T", modelo: "Honda Civic", color: "Rojo" }] },
        { id: 2, calle: "Av. Libertador", numero: 456, nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", autos: [{ id: "3", placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo" }, { id: "4", placas: "ORALE456T", modelo: "Honda Civic", color: "Rojo" }] },
        { id: 3, calle: "Av. Libertador", numero: 789, nombre: "Carlos", apellido: "Perez", telefono: "686-543-2178", autos: [{ id: "5", placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo" }, { id: "6", placas: "ORALE456T", modelo: "Honda Civic", color: "Rojo" }] }
    ]

    const columns_vehiculo = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 100 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 150 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 150 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 150 },
        {
            field: "action",
            headerName: "Acciones",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    onClick={() => handleViewConductoresAutoClick(params?.row)}
                    sx={{
                        backgroundColor: "#008db8",
                        "&:hover": { backgroundColor: "#0a395f" },
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                >
                    <FaUserFriends />
                </Button>
            )
        }
    ]

    const rows_vehiculo = [
        { id: 1, placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo", conductores: [{ id: "1", nombre: "Alexandra", apellido: "Anchondo", identificacion: "1234567890" }, { id: "2", nombre: "Alexandra", apellido: "Anchondo", identificacion: "1234567890" }] },
        { id: 2, placas: "FJF9FS09", modelo: "Volkswagen Jetta", color: "Azul",  conductores: [{ id: "3", nombre: "Benito", apellido: "Juarez", identificacion: "0987654321" }] },
        { id: 3, placas: "ORALE456H", modelo: "Honda Civic", color: "Negro", conductores: [{ id: "4", nombre: "Carlos", apellido: "Perez", identificacion: "9876543210" }] }
    ]

    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)
    const [showViewAutosVisitanteModal, setShowViewAutosVisitanteModal] = useState(false) // Open the modal for viewing the visitor's cars
    const [showViewConductoresAutoModal, setShowViewConductoresAutoModal] = useState(false) // Open the modal for viewing the car's conductors
    const [showAddVisitaFrecuenteModal, setShowAddVisitaFrecuenteModal] = useState(false) // Open the modal for add a new visit for a frecuent visitor
    const [showAddVisitaVehiculoModal, setShowAddVisitaVehiculoModal] = useState(false) // Open the modal for add a new visit for a vehicle
    const [selectedVisitante, setSelectedVisitante] = useState(null) // Means the selected visitor when open autos-visitor modal without clicking the row
    const [selectedAutoFromVisitante, setSelectedAutoFromVisitante] = useState(null) // Means the current selected auto for the visit from the autos-visitor modal
    const [selectedAutoFromConductor, setSelectedAutoFromConductor] = useState(null) // Means the current selected auto for the visit from the conductors-auto modal
    const [selectedConductor, setSelectedConductor] = useState(null) // Means the current selected conductor for the visit from the conductors-auto modal
    const [selectedRow, setSelectedRow] = useState(null) // Means the visitor row selected in frecuent-visitor table

    useEffect(() => {
        if (showAddVehiculoModal || showViewAutosVisitanteModal || showAddVisitaFrecuenteModal || showAddVisitaVehiculoModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const handleCardSelection = (card) => {
        setSelectedOption(card)
        if (card === "Visitante frecuente") {
            setRows(rows_visitante)
            setColumns(columns_visitante)
        } else {
            setRows(rows_vehiculo)
            setColumns(columns_vehiculo)
        }
    }

    const handleBackClick = () => {
        setSelectedOption("Registro de visitas")
        setSelectedRow(null)
    }

    const handleAddVehiculoClick = (nuevoVehiculo) => {
        if(nuevoVehiculo.visitante_id != null) {
            console.log("Voy a registrar un auto al nombre de un visitante")
            return
        } else {
            console.log("Voy a registrar un auto de un conductor cualquiera")
            return
        }
    }

    const handleAddConductorClick = (nuevoConductor) => {
        console.log("Voy a registrar un conductor de un vehículo")
        console.log(nuevoConductor)
    }

    const handleViewAutoVisitanteClick = (rowData) => {
        setShowViewAutosVisitanteModal(true)
        if (rowData.autos !== null && rowData.autos.length > 0) {
            setSelectedVisitante(rowData)
        }
    }

    const handleViewConductoresAutoClick = (rowData) => {
        setShowViewConductoresAutoModal(true)
        if (rowData.conductores !== null && rowData.conductores.length > 0) {
            setSelectedAutoFromConductor(rowData)
        }
    }

    const handleRowSelection = (selectionModel) => {
        if (selectionModel.length === 1) {
            const selectedRowData = rows.find(row => row.id === selectionModel[0])
            setSelectedRow(selectedRowData)
        } else {
            setSelectedRow(null)
            setSelectedAutoFromVisitante(null)
            setSelectedConductor(null)
        }
    }

    return (
        <div className="registro-container">
            {selectedOption === "Registro de visitas" ? (
                <div className="card-container">
                    <button className="card" onClick={() => handleCardSelection("Visitante frecuente")}>
                        <FaUserFriends size={200} />
                        <span>Visitante frecuente</span>
                    </button>
                    <button className="card" onClick={() => handleCardSelection("Vehículos")}>
                        <FaIdCard size={230} />
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
                                    {selectedRow && selectedAutoFromVisitante != null && (
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

            <ViewAutoVisitanteModal
                show={showViewAutosVisitanteModal}
                onClose={() => setShowViewAutosVisitanteModal(false)}
                visitante={selectedVisitante}
                onAdd={handleAddVehiculoClick}
                setSelectedAuto={setSelectedAutoFromVisitante}
                selectedAuto={selectedAutoFromVisitante}
                isRowSelected={selectedRow != null}
            />

            <ViewConductoresAutoModal
                show={showViewConductoresAutoModal}
                onClose={() => setShowViewConductoresAutoModal(false)}
                auto={selectedAutoFromConductor}
                onAdd={handleAddConductorClick}
                setSelectedConductor={setSelectedConductor}
                selectedConductor={selectedConductor}
                isRowSelected={selectedRow != null}
            />

            <AddVisitaFrecuenteModal
                show={showAddVisitaFrecuenteModal}
                onClose={() => setShowAddVisitaFrecuenteModal(false)}
                visitante={selectedRow}
                auto={selectedAutoFromVisitante}
                setSelectedOption={setSelectedOption}
                setSelectedRow={setSelectedRow}
                setSelectedAuto={setSelectedAutoFromVisitante}
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
