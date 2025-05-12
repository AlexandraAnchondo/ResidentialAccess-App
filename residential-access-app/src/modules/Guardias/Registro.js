// Resources
import React, { useState, useEffect } from "react"
import { FaIdCard, FaUserFriends, FaList, FaUserPlus } from "react-icons/fa"
import { Button } from "@mui/material"
import { ArrowBack, AddCircle, DirectionsCar } from "@mui/icons-material"
import "../../styles/Guardias/Registro.scss"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import DataTable from "../../components/DataGrid"
import Loader from "../../components/Loader"

// Modals
import ViewVehiculoVisitanteModal from "./modals/ViewVehiculosVisitanteModal"
import ViewConductoresVehiculoModal from "./modals/ViewConductoresVehiculoModal"
import ViewVehiculoResidenteModal from "./modals/ViewVehiculosResidenteModal"
import AddVehiculoModal from "./modals/AddVehiculoModal"
import AddVisitaFrecuenteModal from "./modals/AddVisitaFrecuenteModal"
import AddVisitaVehiculoModal from "./modals/AddVisitaVehiculoModal"
import AddVisitaResidenteModal from "./modals/AddVisitaResidenteModal"

// Hooks
import {
    useGetVisitantesFrecuentesWithDomicilio,
    useAssignVehicleToVisitante
} from "../../hooks/visitante_frecuente.hook"

import {
    useGetResidentesWithDomicilio
} from "../../hooks/residente.hook"

import {
    useCreateVisitaVisitante,
    useCreateVisitaConductor,
    useCreateVisitaResidente
} from "../../hooks/visita.hook"

import {
    useGetVehiculos,
    useCreateVehiculo
} from "../../hooks/vehiculo.hook"

import {
    useCreateConductor
} from "../../hooks/conductor.hook"

const Registro = ({ selectedOption, setSelectedOption }) => {
    // API calls
    const { visitantes_frecuentes, setVisitanteFrecuentes, loading: loadingVisitantesFrecuentes } = useGetVisitantesFrecuentesWithDomicilio()
    const { vehiculos, setVehiculos, loading: loadingVehiculos } = useGetVehiculos()
    const { residentes, setResidentes, loading: loadingResidentes } = useGetResidentesWithDomicilio()
    const { saveVisitaVisitante, loading: loadingVisitaVisitante } = useCreateVisitaVisitante()
    const { saveVisitaConductor, loading: loadingVisitaConductor } = useCreateVisitaConductor()
    const { saveVisitaResidente, loading: loadingVisitaResidente } = useCreateVisitaResidente()
    const { assignVehicle } = useAssignVehicleToVisitante()
    const { saveConductor } = useCreateConductor()
    const { saveVehiculo } = useCreateVehiculo()

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

    const columns_residente = [
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
                    onClick={() => handleViewVehiculoResidenteClick(params?.row)}
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

    // State variables
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    // Modal handlers
    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)
    const [showViewVehiculosVisitanteModal, setShowViewVehiculosVisitanteModal] = useState(false)
    const [showViewConductoresVehiculoModal, setShowViewConductoresVehiculoModal] = useState(false)
    const [showViewVehiculosResidenteModal, setShowViewVehiculosResidenteModal] = useState(false)
    const [showAddVisitaFrecuenteModal, setShowAddVisitaFrecuenteModal] = useState(false)
    const [showAddVisitaVehiculoModal, setShowAddVisitaVehiculoModal] = useState(false)
    const [showAddVisitaResidenteModal, setShowAddVisitaResidenteModal] = useState(false)

    // Event handlers
    const [selectedVisitante, setSelectedVisitante] = useState(null) // Apunta al visitante seleccionado al abrir el modal de los vehiculos del visitante sin darle clic al row
    const [selectedVehiculoFromVisitante, setSelectedVehiculoFromVisitante] = useState(null) // Apunta al vehiculo seleccionado del visitante para la visita
    const [selectedVehiculo, setSelectedVehiculo] = useState(null) // Apunta al vehiculo seleccionado al abrir el modal de los conductores del vehiculo sin darle clic al row
    const [selectedConductorFromVehiculo, setSelectedConductorFromVehiculo] = useState(null) // Apunta al conductor seleccionado del vehiculo para la visita
    const [selectedResidente, setSelectedResidente] = useState(null) // Apunta al residente seleccionado al abrir el modal de los vehiculos del residente sin darle clic al row
    const [selectedVehiculoFromResidente, setSelectedVehiculoFromResidente] = useState(null) // Apunta al vehiculo seleccionado del residente para la visita
    const [selectedRow, setSelectedRow] = useState(null) // Apunta al row seleccionado desde cualquier tabla
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)

    const isMobile = useMediaQuery("(max-width: 768px)") // Detecta tamaño de pantalla

    useEffect(() => {
        if (showAddVehiculoModal || showViewVehiculosVisitanteModal || showAddVisitaFrecuenteModal || showAddVisitaVehiculoModal || showAddVisitaResidenteModal) {
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
        } else if (card === "Vehículos") {
            setRows(vehiculos)
            setColumns(columns_vehiculo)
        } else {
            setRows(residentes)
            setColumns(columns_residente)
        }
    }

    const handleBackClick = () => {
        setSelectedOption("Registro de visitas")
        setSelectedRow(null)
        setSelectedVisitante(null)
        setSelectedResidente(null)
        setSelectedVehiculo(null)
        setSelectedVehiculoFromVisitante(null)
        setSelectedVehiculoFromResidente(null)
        setSelectedConductorFromVehiculo(null)
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
            try {
                const response = await saveVehiculo({ ...nuevoVehiculo })
                if (response.id != null) {
                    // Actualiza los vehiculos
                    setVehiculos([...vehiculos, { ...nuevoVehiculo, id: response.id }])
                    setIsSaved(true)
                    setMessage(response.message ? response.message : "Operación exitosa")
                    // Si el vehiculo creado pertenece a un domicilio, actualiza el y los residentes
                    if (nuevoVehiculo.id_domicilio != null) {
                        const nuevo_vehiculo_registrado = { ...nuevoVehiculo, id: response.id }
                        setSelectedResidente(prevState => ({
                            ...prevState,
                            vehiculos: [...(prevState.vehiculos || []), nuevo_vehiculo_registrado]
                        }))

                        setResidentes(prevState => prevState.map(v => {
                            if (v.id == response.id_visitante) {
                                return { ...v, vehiculos: [...(v.vehiculos || []), nuevo_vehiculo_registrado] }
                            } else {
                                return v
                            }
                        }))
                    }
                    return
                }
                setIsFailure(true)
            } catch (err) {
                setIsFailure(true)
                setMessage(err.message || "Operación fallida")
            }
        }
    }

    const handleAddConductor = async (nuevoConductor) => {
        try {
            const response = await saveConductor({ ...nuevoConductor })
            if (response.id_conductor != null) {
                const nuevo_conductor_registrado = { ...nuevoConductor, id: response.id_conductor }

                // Actualiza el conductor seleccionado
                setSelectedVehiculo(prevState => ({
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
        setSelectedVehiculo(rowData)
    }

    const handleViewVehiculoResidenteClick = (rowData) => {
        setShowViewVehiculosResidenteModal(true)
        setSelectedResidente(rowData)
    }

    const handleRowSelection = (selectionModel) => {
        if (selectionModel.length === 1) {
            const selectedRowData = rows.find(row => row.id === selectionModel[0])
            setSelectedRow(selectedRowData)
        } else {
            setSelectedRow(null)
            setSelectedVehiculoFromVisitante(null)
            setSelectedVehiculoFromResidente(null)
            setSelectedConductorFromVehiculo(null)
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
                setSelectedVisitante(null)
                setSelectedVehiculoFromVisitante(null)
                return
            }
            setSelectedRow(null)
            setSelectedVisitante(null)
            setSelectedVehiculoFromVisitante(null)
            setIsFailure(true)
        } catch (err) {
            setSelectedRow(null)
            setSelectedVisitante(null)
            setSelectedVehiculoFromVisitante(null)
            setIsFailure(true)
            const bloqueado = checkIfSomethingIsBlocked()
            setMessage(bloqueado != null ? bloqueado : err.message || "Operación fallida")
        }
    }

    const handleAddVisitaConductor = async (nuevaVisita) => {
        try {
            const response = await saveVisitaConductor({ ...nuevaVisita })
            if (response.id_visita != null) {
                setIsSaved(true)
                setMessage(response.message ? response.message : "Operación exitosa")
                setSelectedOption("Registro de visitas")
                setSelectedRow(null)
                setSelectedVehiculo(null)
                setSelectedConductorFromVehiculo(null)
                return
            }
            setSelectedRow(null)
            setSelectedVehiculo(null)
            setSelectedConductorFromVehiculo(null)
            setIsFailure(true)
        } catch (err) {
            setSelectedRow(null)
            setSelectedVehiculo(null)
            setSelectedConductorFromVehiculo(null)
            setIsFailure(true)
            const bloqueado = checkIfSomethingIsBlocked()
            setMessage(bloqueado != null ? bloqueado : err.message || "Operación fallida")
        }
    }

    const handleAddVisitaResidente = async () => {
        try {
            const response = await saveVisitaResidente({ id_residente: selectedResidente.id, id_vehiculo: selectedVehiculoFromResidente.id })
            if (response.id_visita != null) {
                setShowAddVisitaResidenteModal(true)
                setIsSaved(true)
                setMessage(response.message ? response.message : "Operación exitosa")
                setSelectedOption("Registro de visitas")
                setSelectedRow(null)
                setSelectedResidente(null)
                setSelectedVehiculoFromResidente(null)
                return
            }
            setShowAddVisitaResidenteModal(true)
            setSelectedRow(null)
            setSelectedResidente(null)
            setSelectedVehiculoFromResidente(null)
            setIsFailure(true)
        } catch (err) {
            setShowAddVisitaResidenteModal(true)
            setSelectedRow(null)
            setSelectedResidente(null)
            setSelectedVehiculoFromResidente(null)
            setIsFailure(true)
            const bloqueado = checkIfSomethingIsBlocked()
            setMessage(bloqueado != null ? bloqueado : err.message || "Operación fallida")
        }
    }

    const checkIfSomethingIsBlocked = () => {
        if (selectedOption === "Residente" && selectedResidente?.bloqueado === 1) {
            return "Este residente se encuentra bloqueado"
        }
        if (selectedOption === "Residente" && selectedVehiculoFromResidente?.bloqueado === 1) {
            return "Este vehículo se encuentra bloqueado"
        }
        if (selectedOption === "Visitante frecuente" && selectedVisitante?.bloqueado === 1) {
            return "Este visitante frecuente se encuentra bloqueado"
        }
        if (selectedOption === "Visitante frecuente" && selectedVehiculoFromVisitante?.bloqueado === 1) {
            return "Este vehículo se encuentra bloqueado"
        }
        if (selectedOption === "Vehículos" && selectedVehiculo?.bloqueado === 1) {
            return "Este vehículo se encuentra bloqueado"
        }
        return null
    }

    return (
        <div className="guard-registro-container">
            {selectedOption === "Registro de visitas" ? (
                <div className="guard-card-container">
                    <button className="guard-card" onClick={() => handleCardSelection("Visitante frecuente")}>
                        <FaUserFriends size={isMobile ? 130 : 200} />
                        <span>Visitante frecuente</span>
                    </button>
                    <button className="guard-card" onClick={() => handleCardSelection("Vehículos")}>
                        <FaIdCard size={isMobile ? 150 : 230} />
                        <span>Conductor</span>
                    </button>
                    <button className="guard-card" onClick={() => handleCardSelection("Residente")}>
                        <FaUserFriends size={isMobile ? 130 : 200} />
                        <span>Residente</span>
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
                                    sx={{ marginLeft: "20px", marginBottom: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        ) : loadingVisitantesFrecuentes ? (
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
                                    sx={{ marginLeft: "20px", marginBottom: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        )}
                    </div>
                ) : selectedOption === "Vehículos" ? (
                    <div className="vehiculo-container">
                        {rows.length === 0 && !loadingVehiculos ? (
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
                                    sx={{ marginTop: "20px", marginBottom: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        ) : loadingVehiculos ? (
                            <div className="loading-container">
                                <Loader/>
                            </div>
                        ) : (
                            <div className="vehiculo-table-section">
                                <div className="registrar-visita-button-container">
                                    {selectedRow && selectedConductorFromVehiculo != null && (
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
                                    sx={{ marginLeft: "20px", marginBottom: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="residente-moroso-container">
                        {rows.length === 0 && !loadingResidentes ? (
                            <div className="residente-moroso-no-data">
                                <FaList className="icon-placeholder" />
                                <p>No se encontraron residentes</p>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ marginTop: "20px", marginBottom: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>
                            </div>
                        ) : loadingResidentes ? (
                            <div className="loading-container">
                                <Loader/>
                            </div>
                        ) : (
                            <div className="residente-moroso-table-section">
                                <div className="registrar-visita-button-container">
                                    {selectedRow && selectedVehiculoFromResidente != null && (
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: "#004f79", "&:hover": { backgroundColor: "#0a395f" } }}
                                            onClick={handleAddVisitaResidente}
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
                                {loadingVisitaResidente &&
                                    <div className="loading-container">
                                        <Loader loadingMessage={"Abriendo pluma..."} />
                                    </div>
                                }
                                {!loadingVisitaResidente && <DataTable rows={rows} columns={columns} checkboxSelection={true} handleRowSelection={handleRowSelection} />}
                                {!loadingVisitaResidente && <Button
                                    variant="contained"
                                    endIcon={<ArrowBack />}
                                    sx={{ marginLeft: "20px", marginBottom: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                    onClick={handleBackClick}
                                >Atrás</Button>}
                            </div>
                        )}
                    </div>
                )}

            <AddVehiculoModal
                show={showAddVehiculoModal}
                onClose={() => setShowAddVehiculoModal(false)}
                onAdd={handleAddVehiculo}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
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
                vehiculo={selectedVehiculo}
                onAdd={handleAddConductor}
                setSelectedConductor={setSelectedConductorFromVehiculo}
                selectedConductor={selectedConductorFromVehiculo}
                isRowSelected={selectedRow != null}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <ViewVehiculoResidenteModal
                show={showViewVehiculosResidenteModal}
                onClose={() => setShowViewVehiculosResidenteModal(false)}
                residente={selectedResidente}
                onAdd={handleAddVehiculo}
                setSelectedVehiculo={setSelectedVehiculoFromResidente}
                selectedVehiculo={selectedVehiculoFromResidente}
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
                loading={loadingVisitaVisitante}
            />

            <AddVisitaVehiculoModal
                show={showAddVisitaVehiculoModal}
                onClose={() => setShowAddVisitaVehiculoModal(false)}
                onAdd={handleAddVisitaConductor}
                vehiculo={selectedRow}
                conductor={selectedConductorFromVehiculo}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
                setMessage={setMessage}
                loading={loadingVisitaConductor}
                numericCode={1234}
            />

            <AddVisitaResidenteModal
                show={showAddVisitaResidenteModal}
                onClose={() => setShowAddVisitaResidenteModal(false)}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />
        </div>
    )
}

export default Registro
