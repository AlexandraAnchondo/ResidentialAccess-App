import React from "react"
import "../../styles/Guardias/VisitasActivas.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"
import DataTable from "../../components/DataGrid"
import { Button } from "@mui/material"

const Visitas = () => {
    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 30 },
        { field: "ingreso", headerAlign: "center", headerName: "Ingreso", flex: 1, minWidth: 150 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "domicilio", headerAlign: "center", headerName: "Domicilio", flex: 1, minWidth: 150 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 150 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 150 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 150 },
        { field: "estatus", headerAlign: "center", headerName: "Estátus", flex: 1, minWidth: 150 },
        { field: "tipo", headerAlign: "center", headerName: "Tipo", flex: 1, minWidth: 150 },
        { field: "numero_tarjeton", headerAlign: "center", headerName: "Tarjetón", flex: 1, minWidth: 120 },
        {
            field: "salida",
            headerName: "Salida",
            flex: 1,
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                params.row.salida ? (
                    params.row.salida
                ) : (
                    <Button
                        onClick={() => handleAsignarSalida(params.row)}
                        size="small"
                        sx={{
                            backgroundColor: "#008db8",
                            "&:hover": { backgroundColor: "#0a395f" },
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }}
                    >
                        Asignar salida
                    </Button>
                )
            )
        }
    ]

    const rows = [
        { id: 1, ingreso: "08 - 01 - 2025", nombre: "Alexandra Anchondo", domicilio: "Av. Mallorca 1110", placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo", tipo: "Visita", estatus: "Terminada", numero_tarjeton: "T01", salida: "08 - 01 - 2025" },
        { id: 2, ingreso: "05 - 01 - 2025", nombre: "Benito Juarez", domicilio: "Av. Espierba 1931", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Visita", estatus: "Activa", numero_tarjeton: "T02", salida: "" },
        { id: 3, ingreso: "05 - 01 - 2025", nombre: "Benito Juarez", domicilio: "Av. Bruma 2942", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Proveedor", estatus: "Terminada", numero_tarjeton: "T03", salida: "08 - 01 - 2025" },
        { id: 4, ingreso: "05 - 01 - 2025", nombre: "Benito Juarez", domicilio: "Av. Montecorto 1234", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Proveedor", estatus: "Activa", numero_tarjeton: "T04", salida: "" }
    ]

    const handleAsignarSalida = (row) => {
        const hoy = new Date().toISOString().split("T")[0]

        // Aquí deberías actualizar el estado o hacer una llamada a la API para guardar el cambio
        console.log(`Asignando salida para ID ${row.id}: ${hoy}`)
    }

    return (
        <div className="visitas-activas-container">
            {rows.length === 0 ? (
                <div className="visitas-activas-no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ): (
                <DataTable
                    rows={rows}
                    columns={columns}
                />
            )
            }
        </div>
    )
}

export default Visitas