import React, { useState, useEffect } from "react"
import { FaIdCard, FaUserFriends, FaList } from "react-icons/fa"
import { Button, TextField } from "@mui/material"
import { ArrowBack, AddCircle, Search } from "@mui/icons-material"
import DataTable from "../../components/DataGrid"
import "../../styles/Guardias/Registro.css"
import AddVehiculoModal from "./AddAutoModal"

const Registro = ({ selectedOption, setSelectedOption }) => {
    const columns_visitante = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "calle", headerName: "Calle", width: 250 },
        { field: "numero", headerName: "Número", width: 150 },
        { field: "nombre", headerName: "Nombre", width: 250 },
        { field: "apellido", headerName: "Apellido", width: 350 },
        { field: "telefono", headerName: "Teléfono", width: 200 },
        { field: "autos", headerName: "Autos", width: 150 }
    ]

    const rows_visitante = [
        { id: 1, calle: "Av. Libertador", numero: 123, nombre: "Alexandra", apellido: "Anchondo", telefono: "686-420-49-24", autos: 2 },
        { id: 2, calle: "Av. Libertador", numero: 456, nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", autos: 1 },
        { id: 3, calle: "Av. Libertador", numero: 789, nombre: "Carlos", apellido: "Perez", telefono: "686-543-2178", autos: 3 }
    ]

    const columns_vehiculo = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "placas", headerName: "Placas", width: 150 },
        { field: "modelo", headerName: "Modelo", width: 150 },
        { field: "color", headerName: "Color", width: 150 },
        { field: "nombre", headerName: "Nombre", width: 300 },
        { field: "apellido", headerName: "Apellido", width: 150 },
        { field: "identificacion", headerName: "INE", width: 200 }
    ]

    const rows_vehiculo = [
        { id: 1, placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo", nombre: "Alexandra", apellido: "Anchondo", identificacion: "1234567890" },
        { id: 2, placas: "FJF9FS09", modelo: "Volkswagen Jetta", color: "Azul", nombre: "Benito", apellido: "Juarez", identificacion: "0987654321" },
        { id: 3, placas: "ORALE456H", modelo: "Honda Civic", color: "Negro", nombre: "Carlos", apellido: "Perez", identificacion: "9876543210" }
    ]

    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (showModal) {
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

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase())
    }

    const handleAddVehiculoClick = (nuevoVehiculo) => {
        setRows([...rows, { id: 0, ...nuevoVehiculo }])
        setSearchQuery("")
        console.log(rows)
    }

    const filteredRows = rows.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchQuery)
        )
    )

    return (
        <div className="registro-container">
            <main className="registro-main">
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
                    selectedOption === "Visitantes frecuentes" ? (
                        <div className="visitantes-frecuentes-container">
                            <TextField
                                variant="outlined"
                                placeholder="Buscar..."
                                onChange={handleSearch}
                                value={searchQuery}
                                InputProps={{ startAdornment: <Search /> }}
                                sx={{ marginBottom: "20px", width: "100%" }}
                            />
                            {filteredRows.length === 0 ? (
                                <div className="visitantes-frecuentes-no-data">
                                    <FaList className="icon-placeholder" />
                                    <p>No se encontró el visitante frecuente</p>
                                </div>
                            ) : (
                                <div className="visitantes-frecuentes-table-section">
                                    <DataTable rows={filteredRows} columns={columns} checkboxSelection={true} />
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowBack />}
                                        sx={{ marginLeft: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                        onClick={() => setSelectedOption("Registro de visitas")}
                                    >Atrás</Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="vehiculo-container">
                            <TextField
                                variant="outlined"
                                placeholder="Buscar..."
                                onChange={handleSearch}
                                value={searchQuery}
                                InputProps={{ startAdornment: <Search /> }}
                                sx={{ marginBottom: "20px", width: "100%" }}
                            />
                            {filteredRows.length === 0 ? (
                                <div className="vehiculo-no-data">
                                    <FaList className="icon-placeholder" />
                                    <p>No se encontró el vehículo</p>
                                    <Button
                                        variant="contained"
                                        onClick={() => setShowModal(true)}
                                        endIcon={<AddCircle />}
                                        sx={{ width: "100%", marginTop: "20px", backgroundColor: "#00a8cc", "&:hover": { backgroundColor: "#00a8cccc" } }}
                                    >Agregar vehículo</Button>
                                </div>
                            ) : (
                                <div className="vehiculo-table-section">
                                    <DataTable rows={filteredRows} columns={columns} checkboxSelection={true} />
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowBack />}
                                        sx={{ marginLeft: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                                        onClick={() => setSelectedOption("Registro de visitas")}
                                    >Atrás</Button>
                                </div>
                            )}
                        </div>
                    )}
            </main>

            <AddVehiculoModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onAdd={handleAddVehiculoClick}
            />
        </div>
    )
}

export default Registro
