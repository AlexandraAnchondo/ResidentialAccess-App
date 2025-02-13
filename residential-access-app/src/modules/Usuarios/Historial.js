import React from "react"
import "../../styles/Usuarios/Historial.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"
import DataTable from "../../components/DataGrid"

const Historial = () => {
    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 30 },
        { field: "ingreso", headerAlign: "center", headerName: "Ingreso", flex: 1, minWidth: 150 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellido", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 150 },
        { field: "telefono", headerAlign: "center", headerName: "Telefono", flex: 1, minWidth: 150 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 150 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 150 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 120 },
        { field: "tipo", headerAlign: "center", headerName: "Tipo", flex: 1, minWidth: 150 },
        { field: "estatus", headerAlign: "center", headerName: "Estatus", flex: 1, minWidth: 150 },
        { field: "salida", headerAlign: "center", headerName: "Salida", flex: 1, minWidth: 150 }
    ]

    const rows = [
        { id: 1, ingreso: "08 - 01 - 2025", nombre: "Alexandra", apellido: "Anchondo", telefono: "686-420-4924", placas: "ORALE123J", modelo: "Hyundai Sonata", color: "Rojo", tipo: "Visita", estatus: "Terminada", salida: "08 - 01 - 2025" },
        { id: 2, ingreso: "05 - 01 - 2025", nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Visita", estatus: "Activa", salida: "" },
        { id: 3, ingreso: "05 - 01 - 2025", nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Proveedor", estatus: "Terminada", salida: "08 - 01 - 2025" },
        { id: 4, ingreso: "05 - 01 - 2025", nombre: "Benito", apellido: "Juarez", telefono: "686-453-4376", placas: "ORALE456H", modelo: "Honda Civic", color: "Azul", tipo: "Proveedor", estatus: "Activa", salida: "" }
    ]

    return (
        <div className="historial-container">
            {rows.length === 0 ? (
                <div className="historial-no-data">
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

export default Historial