// Resources
import React from "react"
import "../../styles/Guardias/VisitasActivas.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@mui/material"

// Components
import DataTable from "../../components/DataGrid"
import Loader from "../../components/Loader"

// Hooks
import {
    useGetVisitas,
    useUpdateVisita
} from "../../hooks/visita.hook"

const VisitasActivas = () => {
    // API calls
    const { visitas, setVisitas, loading } = useGetVisitas()
    const { editVisita } = useUpdateVisita()

    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 30 },
        { field: "ingreso", headerAlign: "center", headerName: "Ingreso", flex: 1, minWidth: 180 },
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
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            renderCell: (params) =>
                params.row.salida !== "Sin registrar" ? (
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
        }
    ]

    const handleAsignarSalida = async (row) => {
        const horaSalida = new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        })
        const fechaSalida = new Date().toLocaleDateString("es-MX", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        })
        const fechaHoraSalida = `${fechaSalida} ${horaSalida}`
        const hora_salida = new Date()

        // Actualiza la visita en la API
        try {
            await editVisita({ id: row.id, hora_salida: hora_salida })

            // Actualiza el estado de visitas para reflejar el cambio
            setVisitas((prevState) =>
                prevState.map((v) =>
                    v.id === row.id ? { ...v, salida: fechaHoraSalida } : v
                )
            )
        } catch (error) {
            console.error("Error al asignar salida:", error)
        }
    }

    return (
        <div className="visitas-activas-container">
            {visitas.length === 0 && !loading ? (
                <div className="historial-no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ) : loading ? (
                <div className="loading-container" style={{ marginTop: "100px" }}>
                    <Loader />
                </div>
            ) : (
                <DataTable rows={visitas} columns={columns} />
            )}
        </div>
    )
}

export default VisitasActivas
