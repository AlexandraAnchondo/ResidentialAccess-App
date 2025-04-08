// Resources
import React, { useState, useEffect } from "react"
import "../../styles/Administrador/Domicilios.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faCar, faHomeUser, faUserClock } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@mui/material"

// Components
import DataTable from "../../components/DataGrid"
import Loader from "../../components/Loader"

// Modals
import ViewResidentesModal from "./modals/ViewResidentesModal"
import ViewVehiculosModal from "./modals/ViewVehiculosModal"
import ViewFrecuentesModal from "./modals/ViewFrecuentesModal"

// Hooks
import useDomicilios from "../../hooks/domicilio.hook"

const Domicilios = () => {
    // API calls
    const { domicilios, loading } = useDomicilios(["id", "calle", "numero_calle"])

    const columns = [
        { field: "id", headerName: "ID", flex: 1, minWidth: 30, hide: true },
        { field: "calle", headerAlign: "center", headerName: "Calle", flex: 1, minWidth: 150 },
        { field: "numero_calle", headerAlign: "center", headerName: "Número", flex: 1, minWidth: 100 },{
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
        setSelectedDomicilioId(idDomicilio)
        setShowViewResidentesModal(true)
    }

    const handleViewVehiculosClick = (idDomicilio) => {
        setSelectedDomicilioId(idDomicilio)
        setShowViewVehiculosModal(true)
    }

    const handleViewFrecuentesClick = (idDomicilio) => {
        setSelectedDomicilioId(idDomicilio)
        setShowViewFrecuentesModal(true)
    }

    return (
        <div className="domicilios-container">
            {domicilios.length === 0 ? (
                <div className="domicilios-no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ) : loading ? (
                <div className="loading-container" style={{ marginTop: "100px" }}>
                    <Loader />
                </div>
            ) : (
                <DataTable
                    rows={domicilios}
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