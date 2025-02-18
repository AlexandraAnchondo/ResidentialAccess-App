// Resources
import React, { useState, useEffect } from "react"
import "../../styles/Usuarios/Visitantes.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faTrashAlt, faPencil, faCircleInfo, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { AddCircle } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import Loader from "../../components/Loader"

// Modals
import AddVisitanteModal from "./modals/AddVisitanteModal"
import DeleteModal from "../../components/modals/DeleteModal"
import EditVisitanteModal from "./modals/EditVisitanteFrecuenteModal"

// Hooks
import {
    useGetVisitanteFrecuentesByDomicilio,
    useGetVisitanteFrecuenteById,
    useCreateVisitanteFrecuente,
    useUpdateVisitanteFrecuente,
    useDeleteVisitanteFrecuente
} from "../../hooks/visitante_frecuente.hook"

const Visitantes = ({ id_domicilio = 1 }) => {
    // Llamadas al api
    const { visitante_frecuentes, setVisitanteFrecuentes, loading } = useGetVisitanteFrecuentesByDomicilio(id_domicilio)
    const { saveVisitanteFrecuente } = useCreateVisitanteFrecuente()
    const { fetchVisitanteFrecuente, visitante_frecuente, setVisitanteFrecuente } = useGetVisitanteFrecuenteById()
    const { editVisitanteFrecuente } = useUpdateVisitanteFrecuente()
    const { removeVisitanteFrecuente } = useDeleteVisitanteFrecuente()

    // Variables de estado
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [visitanteFrecuenteSelected, setVisitanteFrecuenteSelected] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)

    const isMobile = useMediaQuery("(max-width: 1068px)")

    useEffect(() => {
        if (showAddModal || showDeleteModal || showEditModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const handleCloseModal = () => {
        setShowAddModal(false)
        setShowDeleteModal(false)
        setShowEditModal(false)
        setVisitanteFrecuenteSelected(null)
        setVisitanteFrecuente(null)
    }

    const handleAgregarVisitanteClick = () => {
        setShowAddModal(true)
    }

    const handleAgregarVisitante = async (nuevoVisitanteFrecuente) => {
        try {
            const response = await saveVisitanteFrecuente({ ...nuevoVisitanteFrecuente })
            if (response.id_visitante != null) {
                setVisitanteFrecuentes([...visitante_frecuentes, { ...nuevoVisitanteFrecuente, id: response.id }])
                setIsSaved(true)
                return
            }
            setIsFailure(true)
        } catch (err) {
            setIsFailure(true)
            console.error("Error al guardar visitante frecuente:", err)
        }
    }

    const handleEditVisitanteFrecuenteClick = async (visitante_frecuente) => {
        await fetchVisitanteFrecuente(visitante_frecuente.id)
        setShowEditModal(true)
    }

    const handleEditarVisitanteFrecuente = async (visitante_frecuenteEditado) => {
        try {
            const response = await editVisitanteFrecuente({ ...visitante_frecuenteEditado, id_domicilio: id_domicilio })
            if (response.id != null) {
                const updatedVisitanteFrecuentes = visitante_frecuentes.map((visitante_frecuente) =>
                    visitante_frecuente.id === visitante_frecuenteEditado.id ? { ...visitante_frecuenteEditado, id_domicilio: 1 } : visitante_frecuente
                )
                setVisitanteFrecuentes(updatedVisitanteFrecuentes)
                setIsSaved(true)
                return
            }
            setIsFailure(true)
        } catch (err) {
            setIsFailure(true)
            console.error("Error al editar visitante frecuente:", err)
        }
    }

    const handleDeleteClick = (visitante_frecuente) => {
        setShowDeleteModal(true)
        setVisitanteFrecuenteSelected(visitante_frecuente.id)
    }

    const handleBorrarVisitanteFrecuente = async () => {
        await removeVisitanteFrecuente(visitanteFrecuenteSelected)
        const newVisitanteFrecuentes = visitante_frecuentes.filter((value) => value.id !== visitanteFrecuenteSelected)
        setVisitanteFrecuentes(newVisitanteFrecuentes)
        setShowDeleteModal(false)
    }

    const toggleBloqueo = (index) => {
        const updatedVisitantes = visitante_frecuente.map((visitante, i) =>
            i === index ? { ...visitante, bloqueado: !visitante.bloqueado } : visitante
        )
        setVisitanteFrecuentes(updatedVisitantes)
    }

    return (
        <div className="visitantes-container">
            <main className="visitantes-main">
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
                    <FontAwesomeIcon icon={faCircleInfo} /> Administre las visitas frecuentes autorizadas. Siempre y cuando estén activas podrán acceder al residencial sin código.
                </Typography>
                {visitante_frecuentes.length === 0 && !loading ? (
                    <div className="visitor-no-data">
                        <FontAwesomeIcon icon={faUserGroup} className="icon-placeholder" />
                        <p>No existe ningún visitante frecuente registrado</p>
                        <Button
                            variant="contained"
                            onClick={handleAgregarVisitanteClick}
                            endIcon={<AddCircle />}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8cc" }
                            }}
                        >
                            Agregar visitante
                        </Button>
                    </div>
                ) : loading ? (
                    <div className="loading-container">
                        <Loader/>
                    </div>
                ) :(
                    <div className="visitantes-list">
                        {visitante_frecuentes.map((item, index) => (
                            <div className="visitor-container" key={index}>
                                <section className="visitor-info">
                                    <h3>Información del visitante</h3>
                                    <div className="visitor-info-container">
                                        <div className="visitor-info-item">
                                            <label>Nombre:</label>
                                            <span>{item.nombre}</span>
                                        </div>
                                        <div className="visitor-info-item">
                                            <label>Apellidos:</label>
                                            <span>{item.apellidos}</span>
                                        </div>
                                        <div className="visitor-info-item">
                                            <label>Teléfono:</label>
                                            <span>{item.telefono}</span>
                                        </div>
                                        <div className="visitor-info-item">
                                            <label>Placas:</label>
                                            <span>{item.placas}</span>
                                        </div>
                                        <div className="visitor-info-item">
                                            <label>Modelo:</label>
                                            <span>{item.modelo}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        className="edit-button"
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
                                    <Button
                                        variant="text"
                                        className="block-button"
                                        onClick={() => toggleBloqueo(index)}
                                        startIcon={
                                            item.bloqueado ? (
                                                <FontAwesomeIcon icon={faLock} style={{ color: "red" }} />
                                            ) : (
                                                <FontAwesomeIcon icon={faUnlock} style={{ color: "green" }} />
                                            )
                                        }
                                        sx={{
                                            color: item.bloqueado ? "red" : "green",
                                            marginTop: 2
                                        }}
                                    >
                                        {item.bloqueado ? "SIN ACCESO" : "CON ACCESO"}
                                    </Button>
                                </section>
                                <Button onClick={ () => handleDeleteClick(index)}
                                ><FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: "20px" }} />
                                </Button>
                            </div>
                        ))}
                        {visitante_frecuentes.length < 3 && (
                            <Button
                                variant="contained"
                                onClick={handleAgregarVisitanteClick}
                                endIcon={<AddCircle />}
                                sx={{
                                    backgroundColor: "#00a8cc",
                                    "&:hover": { backgroundColor: "#00a8ccCC" },
                                    width: "60%",
                                    marginBottom: "20px"
                                }}
                            >
                            Agregar visitante
                            </Button>
                        )}
                    </div>
                )}
            </main>

            <AddVisitanteModal
                show={showAddModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarVisitante}
            />

            <EditVisitanteModal
                show={showEditModal}
                onClose={handleCloseModal}
                onEdit={handleEditarVisitanteFrecuente}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                visitante_frecuente={visitante_frecuente}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseModal}
                onDelete={handleBorrarVisitanteFrecuente}
            />
        </div>
    )
}

export default Visitantes