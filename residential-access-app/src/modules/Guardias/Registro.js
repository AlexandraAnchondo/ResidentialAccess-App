import React, { useState, useEffect } from "react"
import { FaIdCard, FaUserFriends, FaList } from "react-icons/fa"
import { Button } from "@mui/material"
import { ArrowBack, AddCircle, DirectionsCar } from "@mui/icons-material"
import DataTable from "../../components/DataGrid"
import "../../styles/Guardias/Registro.css"
import AddVehiculoModal from "./modals/AddAutoModal"
import ViewAutoVisitanteModal from "./modals/ViewAutoVisitanteModal"
import AddVisitaFrecuenteModal from "./modals/AddVisitaFrecuenteModal"

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
                <button
                    onClick={() => handleViewAutoVisitanteClick(params?.row)}
                    style={{
                        backgroundColor: "#008db8",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        marginTop: "5px"
                    }}
                >
                    <DirectionsCar />
                </button>
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
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 300 },
        { field: "apellido", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 150 },
        { field: "identificacion", headerAlign: "center", headerName: "INE", flex: 1, minWidth: 150 }
    ]

    const rows_vehiculo = [
        { id: 1, placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo", nombre: "Alexandra", apellido: "Anchondo", identificacion: "1234567890" },
        { id: 2, placas: "FJF9FS09", modelo: "Volkswagen Jetta", color: "Azul", nombre: "Benito", apellido: "Juarez", identificacion: "0987654321" },
        { id: 3, placas: "ORALE456H", modelo: "Honda Civic", color: "Negro", nombre: "Carlos", apellido: "Perez", identificacion: "9876543210" }
    ]

    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [showAddVehiculoModal, setShowAddVehiculoModal] = useState(false)
    const [showViewAutoVisitanteModal, setShowViewAutoVisitanteModal] = useState(false)
    const [showAddVisitaFrecuenteModal, setShowAddVisitaFrecuenteModal] = useState(false)
    const [selectedVisitante, setSelectedVisitante] = useState(null)
    const [selectedRow, setSelectedRow] = useState(null)

    useEffect(() => {
        if (showAddVehiculoModal || showViewAutoVisitanteModal) {
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

    const handleViewAutoVisitanteClick = (rowData) => {
        setShowViewAutoVisitanteModal(true)
        if (rowData.autos !== null && rowData.autos.length > 0) {
            setSelectedVisitante(rowData)
        }
    }

    const handleRowSelection = (selectionModel) => {
        if (selectionModel.length === 1) {
            const selectedRowData = rows.find(row => row.id === selectionModel[0])
            setSelectedRow(selectedRowData)
        } else {
            setSelectedRow(null)
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
                                    {selectedRow && (
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
                                <DataTable rows={rows} columns={columns} checkboxSelection={true} />
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
                show={showViewAutoVisitanteModal}
                onClose={() => setShowViewAutoVisitanteModal(false)}
                visitante={selectedVisitante}
                onAdd={handleAddVehiculoClick}
            />

            <AddVisitaFrecuenteModal /* TODO: TE QUEDASTE HACIENDO EL MODAL PARA EL TARJETÓN */
                show={showAddVisitaFrecuenteModal}
                onClose={() => setShowViewAutoVisitanteModal(false)}
                visitante={selectedRow}
            />
        </div>
    )
}

export default Registro
