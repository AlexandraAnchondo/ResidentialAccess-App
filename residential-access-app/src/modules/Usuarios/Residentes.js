// Resources
import React, { useState, useEffect } from "react"
import "../../styles/Usuarios/Residentes.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faTrashAlt, faPencil, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { AddCircle } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import Loader from "../../components/Loader"

// Modals
import AddResidenteModal from "./modals/AddResidenteModal"
import DeleteModal from "../../components/modals/DeleteModal"
import EditResidenteModal from "./modals//EditResidenteModal"

// Hooks
import {
    useGetResidentesByDomicilio,
    useGetResidenteById,
    useCreateResidente,
    useUpdateResidente,
    useDeleteResidente
} from "../../hooks/residente.hook"

const Residentes = ({ id_domicilio = 1 }) => {
    // API calls
    const { residentes, setResidentes, loading } = useGetResidentesByDomicilio(id_domicilio)
    const { saveResidente } = useCreateResidente()
    const { fetchResidente, residente, setResidente } = useGetResidenteById()
    const { editResidente } = useUpdateResidente()
    const { removeResidente } = useDeleteResidente()

    // State variables
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [residenteSelected, setResidenteSelected] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)

    const isMobile = useMediaQuery("(max-width: 1068px)")

    useEffect(() => {
        if (showAddModal || showDeleteModal || showEditModal || residentes.length === 0) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const handleCloseModal = () => {
        setShowAddModal(false)
        setShowDeleteModal(false)
        setShowEditModal(false)
        setResidenteSelected(null)
        setResidente(null)
        setMessage(null)
    }

    const handleAgregarResidenteClick = () => setShowAddModal(true)

    const handleAgregarResidente = async (nuevoResidente) => {
        try {
            const response = await saveResidente({ ...nuevoResidente, id_domicilio: id_domicilio })
            if (response.id != null) {
                setResidentes([...residentes, { ...nuevoResidente, id: response.id, id_domicilio: 1 }])
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

    const handleEditResidenteClick = async (residente) => {
        await fetchResidente(residente.id)
        setShowEditModal(true)
    }

    const handleEditarResidente = async (residenteEditado) => {
        try {
            const response = await editResidente({ ...residenteEditado, id_domicilio: id_domicilio })
            if (response.id != null) {
                const updatedResidentes = residentes.map((residente) =>
                    residente.id === residenteEditado.id ? { ...residenteEditado, id_domicilio: 1 } : residente
                )
                setResidentes(updatedResidentes)
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

    const handleDeleteClick = (residente) => {
        setShowDeleteModal(true)
        setResidenteSelected(residente.id)
    }

    const handleBorrarResidente = async () => {
        await removeResidente(residenteSelected)
        const newResidentes = residentes.filter((value) => value.id !== residenteSelected)
        setResidentes(newResidentes)
        setShowDeleteModal(false)
    }

    return (
        <div className="residentes-container">
            <main className="residentes-main">
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        marginTop: isMobile ? "30px" : "0",
                        marginBottom: isMobile ? "10px" : "0",
                        fontWeight: 500,
                        fontSize: isMobile ? ".9rem" : "1.3rem",
                        border: "1px solid",
                        borderRadius: 2,
                        padding: 2,
                        backgroundColor: "rgba(255, 255, 255)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        opacity: "80%",
                        width: "calc(90% - 70px)",
                        mx: isMobile ? "12px" : "80px",
                        wordWrap: "break-word"
                    }}
                >
                    <FontAwesomeIcon icon={faCircleInfo} /> Administre las personas que viven en su vivienda.
                </Typography>
                {residentes.length === 0 && !loading ? (
                    <div className="resident-no-data">
                        <FontAwesomeIcon icon={faUserGroup} className="icon-placeholder" />
                        <p>No existe ningún residente registrado</p>
                        <Button
                            variant="contained"
                            onClick={handleAgregarResidenteClick}
                            endIcon={<AddCircle />}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8cc" }
                            }}
                        >
                            Agregar residente
                        </Button>
                    </div>
                ) : loading ? (
                    <div className="loading-container">
                        <Loader/>
                    </div>
                ) : (
                    <div className="residentes-list">
                        {residentes.map((item, index) => (
                            <div className="resident-container" key={index}>
                                <section className="resident-info">
                                    <h3>Información del residente {item.is_principal ? "principal" : ""}</h3>
                                    <div className="resident-info-container">
                                        <div className="resident-info-item ">
                                            <label>Nombre:</label>
                                            <span>{item.nombre}</span>
                                        </div>
                                        <div className="resident-info-item ">
                                            <label>Apellidos:</label>
                                            <span>{item.apellidos}</span>
                                        </div>
                                        <div className="resident-info-item ">
                                            <label>Teléfono:</label>
                                            <span>{item.telefono}</span>
                                        </div>
                                        <div className="resident-info-item ">
                                            <label>Correo:</label>
                                            <span>{item.correo_electronico}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleEditResidenteClick(item)}
                                        startIcon={<FontAwesomeIcon icon={faPencil} />}
                                        sx={{
                                            color: "#00a8cc",
                                            borderColor: "transparent",
                                            marginRight: 2,
                                            marginTop: 2,
                                            marginLeft: 3
                                        }}
                                    >
                                        Editar
                                    </Button>
                                </section>
                                {!item.is_principal &&
                                    <Button
                                        onClick={() => handleDeleteClick(item)}
                                    ><FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: "20px" }} />
                                    </Button>
                                }
                            </div>
                        ))}
                        <Button
                            variant="contained"
                            onClick={handleAgregarResidenteClick}
                            endIcon={<AddCircle />}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8ccCC" },
                                width: isMobile ? "60%" : "50%",
                                marginBottom: "20px"
                            }}
                        >
                            Agregar residente
                        </Button>
                    </div>
                )}
            </main>

            <AddResidenteModal
                show={showAddModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarResidente}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <EditResidenteModal
                show={showEditModal}
                onClose={handleCloseModal}
                onEdit={handleEditarResidente}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                residente={residente}
                message={message}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseModal}
                onDelete={handleBorrarResidente}
            />
        </div>
    )
}

export default Residentes