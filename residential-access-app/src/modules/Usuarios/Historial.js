// Resources
import React from "react"
import "../../styles/Usuarios/Historial.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"

// Components
import DataTable from "../../components/DataGrid"
import Loader from "../../components/Loader"

// Hooks
import { useGetVisitasByDomicilio } from "../../hooks/visita.hook"

const Historial = ({ id_domicilio }) => {
    // API calls
    const { visitas, loading } = useGetVisitasByDomicilio(id_domicilio)

    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 30 },
        { field: "ingreso", headerAlign: "center", headerName: "Ingreso", flex: 1, minWidth: 180 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellidos", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 150 },
        { field: "telefono", headerAlign: "center", headerName: "Telefono", flex: 1, minWidth: 150 },
        { field: "placas", headerAlign: "center", headerName: "Placas", flex: 1, minWidth: 150 },
        { field: "modelo", headerAlign: "center", headerName: "Modelo", flex: 1, minWidth: 150 },
        { field: "color", headerAlign: "center", headerName: "Color", flex: 1, minWidth: 120 },
        { field: "tipo", headerAlign: "center", headerName: "Tipo", flex: 1, minWidth: 150 },
        { field: "estatus", headerAlign: "center", headerName: "Estatus", flex: 1, minWidth: 150 },
        { field: "salida", headerAlign: "center", headerName: "Salida", flex: 1, minWidth: 180 }
    ]

    return (
        <div className="historial-container">
            {visitas.length === 0 && !loading ? (
                <div className="historial-no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ): loading ? (
                <div className="loading-container" style={{ marginTop: "100px" }}>
                    <Loader/>
                </div>
            ) : (
                <DataTable
                    rows={visitas}
                    columns={columns}
                    showSearchPlacasButton={false}
                />
            )
            }
        </div>
    )
}

export default Historial