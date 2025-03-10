// Resources
import React, { useState, useEffect } from "react"
import { FaIdCard, FaUserFriends, FaList, FaUserPlus } from "react-icons/fa"
import { Button } from "@mui/material"
import { ArrowBack, AddCircle, DirectionsCar, CarCrash } from "@mui/icons-material"
import "../../styles/Guardias/Registro.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import DataTable from "../../components/DataGrid"
import Loader from "../../components/Loader"

// Modals
import ViewVehiculoVisitanteModal from "./modals/ViewVehiculosVisitanteModal"
import ViewConductoresVehiculoModal from "./modals/ViewConductoresVehiculoModal"
import AddVehiculoModal from "./modals/AddVehiculoModal"
import AddVisitaFrecuenteModal from "./modals/AddVisitaFrecuenteModal"
import AddVisitaVehiculoModal from "./modals/AddVisitaVehiculoModal"

// Hooks
import {
    useGetVisitantesFrecuentesWithDomicilio,
    useAssignVehicleToVisitante
} from "../../hooks/visitante_frecuente.hook"

import {
    useCreateVisitaVisitante
} from "../../hooks/visita.hook"

import {
    useGetVehiculos
} from "../../hooks/vehiculo.hook"

const Registro = ({ selectedOption, setSelectedOption }) => {
    // API calls
    const { visitantes_frecuentes, setVisitanteFrecuentes, loading: loadingVisitantesFrecuentes } = useGetVisitantesFrecuentesWithDomicilio()
    const { saveVisitaVisitante } = useCreateVisitaVisitante()
    const { assignVehicle } = useAssignVehicleToVisitante()
    const { vehiculos, setVehiculos, loading: loadingVehiculos } = useGetVehiculos()

    // Columns
    const columns_visitante = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 100 },
        { field: "calle", headerAlign: "center", headerName: "Calle", flex: 1, minWidth: 250 },
        { field: "numero", headerAlign: "center", headerName: "Número", flex: 1, minWidth: 150 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellidos", headerAlign: "center", headerName: "Apellidos", flex: 1, minWidth: 250 },
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
                    sx={{
                        backgroundColor:"#008db8",
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

    // State variables
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    // Modal handlers
    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)
    const [showViewVehiculosVisitanteModal, setShowViewVehiculosVisitanteModal] = useState(false) // Open the modal for viewing the visitor's cars
    const [showViewConductoresVehiculoModal, setShowViewConductoresVehiculoModal] = useState(false) // Open the modal for viewing the car's conductors
    const [showAddVisitaFrecuenteModal, setShowAddVisitaFrecuenteModal] = useState(false) // Open the modal for add a new visit for a frecuent visitor
    const [showAddVisitaVehiculoModal, setShowAddVisitaVehiculoModal] = useState(false) // Open the modal for add a new visit for a vehicle

    // Event handlers
    const [selectedVisitante, setSelectedVisitante] = useState(null) // Means the selected visitor when open vehiculos-visitor modal without clicking the row
    const [selectedVehiculoFromVisitante, setSelectedVehiculoFromVisitante] = useState(null) // Means the current selected vehiculo for the visit from the vehiculos-visitor modal
    const [selectedVehiculoFromConductor, setSelectedVehiculoFromConductor] = useState(null) // Means the selected vehicle when open vehiculos-visitor modal without clicking the row
    const [selectedConductor, setSelectedConductor] = useState(null) // Means the current selected conductor for the visit from the conductors-vehiculo modal
    const [selectedRow, setSelectedRow] = useState(null) // Means the visitor row selected in frecuent-visitor table
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)

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
            setRows(vehiculos)
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

    const handleAddVehiculo = async (nuevoVehiculo) => {
        if (nuevoVehiculo.id_visitante != null) {
            try {
                const response = await assignVehicle({ ...nuevoVehiculo })
                if (response.id_visitante != null) {
                    const nuevo_vehiculo_registrado = { ...nuevoVehiculo.vehiculo, id: response.id_vehiculo }

                    // Actualiza el visitante seleccionado
                    setSelectedVisitante(prevState => ({
                        ...prevState,
                        vehiculos: [...(prevState.vehiculos || []), nuevo_vehiculo_registrado]
                    }))

                    // También actualiza visitantes_frecuentes
                    setVisitanteFrecuentes(prevState => prevState.map(v => {
                        if (v.id == response.id_visitante) {
                            return { ...v, vehiculos: [...(v.vehiculos || []), nuevo_vehiculo_registrado] }
                        } else {
                            return v
                        }
                    }))

                    setIsSaved(true)
                    setMessage(response.message ? response.message : "Operación exitosa")
                    return
                }
                setIsFailure(true)
            } catch (err) {
                setIsFailure(true)
                setMessage(err.message || "Operación fallida")
            }
        } else {
            console.log("Voy a registrar un vehiculo de un conductor cualquiera")
            return
        }
    }

    const handleAddConductor = async (nuevoConductor) => {
        try {
            const response = await assignVehicle({ ...nuevoConductor })
            if (response.id_vehiculo != null) {
                const nuevo_conductor_registrado = { ...nuevoConductor.conductor, id: response.id_conductor }

                // Actualiza el vehiculo seleccionado
                selectedVehiculoFromConductor(prevState => ({
                    ...prevState,
                    conductores: [...(prevState.conductores || []), nuevo_conductor_registrado]
                }))

                // También actualiza los vehiculos
                setVehiculos(prevState => prevState.map(v => {
                    if (v.id == response.id_vehiculo) {
                        return { ...v, conductores: [...(v.conductores || []), nuevo_conductor_registrado] }
                    } else {
                        return v
                    }
                }))

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

    const handleViewVehiculoVisitanteClick = (rowData) => {
        setShowViewVehiculosVisitanteModal(true)
        setSelectedVisitante(rowData)
    }

    const handleViewConductoresVehiculoClick = (rowData) => {
        setShowViewConductoresVehiculoModal(true)
        setSelectedVehiculoFromConductor(rowData)
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

    const handleAddVisitaFrecuente = async (nuevaVisita) => {
        try {
            const response = await saveVisitaVisitante({ ...nuevaVisita })
            if (response.id_visita != null) {
                setIsSaved(true)
                setMessage(response.message ? response.message : "Operación exitosa")
                setSelectedOption("Registro de visitas")
                setSelectedRow(null)
                setSelectedVehiculoFromVisitante(null)
                return
            }
            setSelectedRow(null)
            setSelectedVehiculoFromVisitante(null)
            setIsFailure(true)
        } catch (err) {
            setIsFailure(true)
            setSelectedRow(null)
            setSelectedVehiculoFromVisitante(null)
            setMessage(err.message || "Operación fallida")
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
                        {rows.length === 0 && !loadingVisitantesFrecuentes ? (
                            <div className="visitante-frecuente-no-data">
                                <FaList className="icon-placeholder" />
                                <p>No se encontraron visitantes frecuentes</p>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ marginLeft: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        ): loadingVisitantesFrecuentes ? (
                            <div className="loading-container">
                                <Loader/>
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
                                    sx={{ marginTop: "20px", backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                                >Agregar vehículo</Button>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ marginTop: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
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
                onAdd={handleAddVehiculo}
            />

            <ViewVehiculoVisitanteModal
                show={showViewVehiculosVisitanteModal}
                onClose={() => setShowViewVehiculosVisitanteModal(false)}
                visitante={selectedVisitante}
                onAdd={handleAddVehiculo}
                setSelectedVehiculo={setSelectedVehiculoFromVisitante}
                selectedVehiculo={selectedVehiculoFromVisitante}
                isRowSelected={selectedRow != null}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <ViewConductoresVehiculoModal
                show={showViewConductoresVehiculoModal}
                onClose={() => setShowViewConductoresVehiculoModal(false)}
                vehiculo={selectedVehiculoFromConductor}
                onAdd={handleAddConductor}
                setSelectedConductor={setSelectedConductor}
                selectedConductor={selectedConductor}
                isRowSelected={selectedRow != null}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <AddVisitaFrecuenteModal
                show={showAddVisitaFrecuenteModal}
                onClose={() => setShowAddVisitaFrecuenteModal(false)}
                onAdd={handleAddVisitaFrecuente}
                visitante={selectedRow}
                vehiculo={selectedVehiculoFromVisitante}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
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
