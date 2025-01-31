import React from "react"
import "../../styles/Usuarios/Historial.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"
import DataTable from "../../components/DataGrid"

const Historial = () => {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "ingreso", headerName: "Ingreso", width: 150 },
        { field: "nombre", headerName: "Nombre", width: 150 },
        { field: "apellido", headerName: "Apellido", width: 150 },
        { field: "telefono", headerName: "Telefono", width: 150 },
        { field: "placas", headerName: "Placas", width: 150 },
        { field: "modelo", headerName: "Modelo", width: 150 },
        { field: "color", headerName: "Color", width: 120 },
        { field: "tipo", headerName: "Tipo", width: 150 },
        { field: "estatus", headerName: "Estatus", width: 150 },
        { field: "salida", headerName: "Salida", width: 150 }
    ]

    const rows = [
        { id: 1, ingreso: "08 - 01 - 2025", nombre: "Alexandra", apellido: "Anchondo", telefono: "686-420-4924", placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo", tipo: "Visita", estatus: "Terminada", salida: "08 - 01 - 2025" },
        { id: 2, ingreso: "05 - 01 - 2025", nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Visita", estatus: "Activa", salida: "" },
        { id: 3, ingreso: "05 - 01 - 2025", nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Proveedor", estatus: "Terminada", salida: "08 - 01 - 2025" },
        { id: 4, ingreso: "05 - 01 - 2025", nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Proveedor", estatus: "Activa", salida: "" }
    ]

    return (
        <>
            {rows.length === 0 ? (
                <div className="no-data">
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
        </>
    )
}

export default Historial