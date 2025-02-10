import React, { useState, useEffect } from "react"
import "../../styles/Administrador/Domicilios.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faCar, faHomeUser, faUserClock } from "@fortawesome/free-solid-svg-icons"
import DataTable from "../../components/DataGrid"
import { Button } from "@mui/material"
import ViewResidentesModal from "./modals/ViewResidentesModal"
import ViewVehiculosModal from "./modals/ViewVehiculosModal"
import ViewFrecuentesModal from "./modals/ViewFrecuentesModal"

const Domicilios = () => {
    const columns = [
        { field: "id", headerName: "ID", flex: 1, minWidth: 30, hide: true },
        { field: "calle", headerAlign: "center", headerName: "Calle", flex: 1, minWidth: 150 },
        { field: "numero_calle", headerAlign: "center", headerName: "Número", flex: 1, minWidth: 100 },
        { field: "ciudad", headerAlign: "center", headerName: "Ciudad", flex: 1, minWidth: 150 },
        { field: "estado", headerAlign: "center", headerName: "Estado", flex: 1, minWidth: 150 },
        { field: "codigo_postal", headerAlign: "center", headerName: "Código Postal", flex: 1, minWidth: 120 },
        { field: "pais", headerAlign: "center", headerName: "País", flex: 1, minWidth: 150 },
        {
            field: "residentes",
            headerName: "Residentes",
            flex: 1,
            minWidth: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    variant="contained"
                    onClick={() => handleViewResidentesClick(params.row.id)}
                    sx={{
                        padding: "10px",
                        backgroundColor: "#004f79",
                        "&:hover": { backgroundColor: "#004f79cc" }
                    }}
                >
                    <FontAwesomeIcon icon={faHomeUser} />
                </Button>
            )
        },
        {
            field: "vehiculos",
            headerName: "Vehículos",
            flex: 1,
            minWidth: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    variant="contained"
                    onClick={() => handleViewVehiculosClick(params.row.id)}
                    sx={{
                        padding: "10px",
                        backgroundColor: "#008db8",
                        "&:hover": { backgroundColor: "#008db8cc" }
                    }}
                >
                    <FontAwesomeIcon icon={faCar} />
                </Button>
            )
        },
        {
            field: "frecuentes",
            headerName: "Frecuentes",
            flex: 1,
            minWidth: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    variant="contained"
                    onClick={() => handleViewFrecuentesClick(params.row.id)}
                    sx={{
                        padding: "10px",
                        backgroundColor: "#0cccc2",
                        "&:hover": { backgroundColor: "#0cccc2cc" }
                    }}
                >
                    <FontAwesomeIcon icon={faUserClock} />
                </Button>
            )
        }
    ]

    const rows = [
        { id: 1, calle: "Av. Mallorca", numero_calle: "1110", ciudad: "Ciudad A", estado: "Estado A", codigo_postal: "12345", pais: "México" },
        { id: 2, calle: "Av. Espierba", numero_calle: "9302", ciudad: "Ciudad B", estado: "Estado B", codigo_postal: "67890", pais: "México" }
    ]

    useEffect(() => {
        if (showViewResidentesModal  || showViewVehiculosModal || showViewFrecuentesModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const [showViewResidentesModal, setShowViewResidentesModal] = useState(false)
    const [showViewVehiculosModal, setShowViewVehiculosModal] = useState(false)
    const [showViewFrecuentesModal, setShowViewFrecuentesModal] = useState(false)
    const [selectedDomicilioId, setSelectedDomicilioId] = useState(null)

    const handleViewResidentesClick = (idDomicilio) => {
        setShowViewResidentesModal(true)
        setSelectedDomicilioId(idDomicilio)
    }

    const handleViewVehiculosClick = (idDomicilio) => {
        setShowViewVehiculosModal(true)
        setSelectedDomicilioId(idDomicilio)
    }

    const handleViewFrecuentesClick = (idDomicilio) => {
        setShowViewFrecuentesModal(true)
        setSelectedDomicilioId(idDomicilio)
    }

    return (
        <div className="domicilios-container">
            {rows.length === 0 ? (
                <div className="domicilios-no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ) : (
                <DataTable
                    rows={rows}
                    columns={columns}
                />
            )}

            <ViewResidentesModal
                show={showViewResidentesModal}
                onClose={() => setShowViewResidentesModal(false)}
                domicilioId={selectedDomicilioId}
            />

            <ViewVehiculosModal
                show={showViewVehiculosModal}
                onClose={() => setShowViewVehiculosModal(false)}
                domicilioId={selectedDomicilioId}
            />

            <ViewFrecuentesModal
                show={showViewFrecuentesModal}
                onClose={() => setShowViewFrecuentesModal(false)}
                domicilioId={selectedDomicilioId}
            />
        </div>
    )
}

export default Domicilios