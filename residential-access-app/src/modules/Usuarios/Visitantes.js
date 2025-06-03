// Resources
import React, { useState, useEffect } from "react"
import "../../styles/Usuarios/Visitantes.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faTrashAlt, faPencil, faCircleInfo, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { AddCircle } from "@mui/icons-material"
import { Button, Typography, IconButton, Modal, Box } from "@mui/material"
import { FaIdCard } from "react-icons/fa"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import Loader from "../../components/Loader"

// Modals
import AddVisitanteModal from "./modals/AddVisitanteModal"
import DeleteModal from "../../components/modals/DeleteModal"
import EditVisitanteModal from "./modals/EditVisitanteFrecuenteModal"
import NotificationModal from "../../components/modals/NotificacionModal"

// Hooks
import {
    useGetVisitantesFrecuentesByDomicilio,
    useGetVisitanteFrecuenteById,
    useCreateVisitanteFrecuente,
    useUpdateVisitanteFrecuente,
    useDeleteVisitanteFrecuente
} from "../../hooks/visitante_frecuente.hook"

const Visitantes = ({ id_domicilio }) => {
    // API calls
    const { visitantes_frecuentes, setVisitanteFrecuentes, loading } = useGetVisitantesFrecuentesByDomicilio(id_domicilio)
    const { saveVisitanteFrecuente } = useCreateVisitanteFrecuente()
    const { fetchVisitanteFrecuente, visitante_frecuente, setVisitanteFrecuente } = useGetVisitanteFrecuenteById()
    const { editVisitanteFrecuente } = useUpdateVisitanteFrecuente()
    const { removeVisitanteFrecuente } = useDeleteVisitanteFrecuente()

    // State variables
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [imageSrc, setImageSrc] = useState("")
    const [modalMensaje, setModalMensaje] = useState("")
    const [showNotificationModal, setShowNotificationModal] = useState("")
    const [visitanteFrecuenteSelected, setVisitanteFrecuenteSelected] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)

    const isMobile = useMediaQuery("(max-width: 1068px)")

    useEffect(() => {
        if (showAddModal || showDeleteModal || showEditModal || visitantes_frecuentes.length === 0) {
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
        setMessage(null)
    }

    const handleAgregarVisitanteClick = () => setShowAddModal(true)

    const handleAgregarVisitante = async (nuevoVisitanteFrecuente) => {
        try {
            const response = await saveVisitanteFrecuente({ ...nuevoVisitanteFrecuente, id_domicilio: id_domicilio })
            if (response.id_visitante != null) {
                setVisitanteFrecuentes([...visitantes_frecuentes, { ...nuevoVisitanteFrecuente, id: response.id_visitante }])
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

    const handleEditVisitanteFrecuenteClick = async (visitante_frecuente) => {
        await fetchVisitanteFrecuente(visitante_frecuente.id, visitante_frecuente.id_vehiculo)
        setShowEditModal(true)
    }

    const handleEditarVisitanteFrecuente = async (visitante_frecuenteEditado) => {
        try {
            const response = await editVisitanteFrecuente({ ...visitante_frecuenteEditado, id_domicilio: id_domicilio })
            if (response.id_visitante != null) {
                const updatedVisitanteFrecuentes = visitantes_frecuentes.map((visitante_frecuente) =>
                    visitante_frecuente.id === visitante_frecuenteEditado.id ? { ...visitante_frecuenteEditado, id_domicilio: 1 } : visitante_frecuente
                )
                setVisitanteFrecuentes(updatedVisitanteFrecuentes)
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

    const handleDeleteClick = (visitante_frecuente) => {
        setShowDeleteModal(true)
        setVisitanteFrecuenteSelected(visitante_frecuente.id)
    }

    const handleBorrarVisitanteFrecuente = async () => {
        await removeVisitanteFrecuente(visitanteFrecuenteSelected)
        const newVisitanteFrecuentes = visitantes_frecuentes.filter((value) => value.id !== visitanteFrecuenteSelected)
        setVisitanteFrecuentes(newVisitanteFrecuentes)
        setShowDeleteModal(false)
    }

    const toggleBloqueo = async (index) => {
        const updatedVisitantes = await visitantes_frecuentes.map((visitante, i) => {
            if (i === index) {
                editVisitanteFrecuente({ ...visitante, bloqueado: !visitante.bloqueado })
                return { ...visitante, bloqueado: !visitante.bloqueado }
            }
            return visitante
        }
        )
        setVisitanteFrecuentes(updatedVisitantes)
    }

    const handleNotificationModalMessage = (message) => {
        setModalMensaje(message)
        setShowNotificationModal(true)
    }

    const handleCloseNotificationModal = () => {
        setShowNotificationModal(false)
        setModalMensaje("")
    }

    const handleShowImage = (visitante) => {
        if (visitante.ine) {
            const ineUrl = typeof visitante.ine === "string" ? `${process.env.REACT_APP_API_ASSETS_URL}${visitante.ine}` : URL.createObjectURL(visitante.ine)
            const imagePath = `${ineUrl}`
            setImageSrc(imagePath)
            setShowImageModal(true)
        } else {
            handleNotificationModalMessage("No se encontró ine para este conductor.")
        }
    }

    const handleCloseImageModal = () => {
        setShowImageModal(false)
        setImageSrc("")
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
                {visitantes_frecuentes.length === 0 && !loading ? (
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
                ) : (
                    <div className="visitantes-list">
                        {visitantes_frecuentes.map((item, index) => (
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
                                        <div className="visitor-info-item">
                                            <label>Color:</label>
                                            <span>{item.color}</span>
                                        </div>
                                        <div className="visitor-info-ine">
                                            <label>ID:</label>
                                            <span>
                                                <IconButton onClick={() => handleShowImage(item)} color="primary">
                                                    <FaIdCard style={{}} color="#46b7d3" />
                                                </IconButton>
                                            </span>
                                        </div>

                                    </div>
                                    <Button
                                        variant="outlined"
                                        className="edit-button"
                                        onClick={() => handleEditVisitanteFrecuenteClick(item)}
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
                                <Button onClick={ () => handleDeleteClick(item)}
                                ><FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: "20px" }} />
                                </Button>
                            </div>
                        ))}
                        {visitantes_frecuentes.length < 3 && (
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
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
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
                message={message}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseModal}
                onDelete={handleBorrarVisitanteFrecuente}
            />

            <NotificationModal
                message={modalMensaje}
                onClose={handleCloseNotificationModal}
                isOpen={showNotificationModal}
            />

            {/* Modal para mostrar la imagen */}
            <Modal open={showImageModal} onClose={handleCloseImageModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 800,
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: "center"
                    }}
                >
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Identificación"
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                                maxHeight: "40vh",
                                objectFit: "contain",
                                animation: "popUp 0.3s ease-out"
                            }}
                        />
                    ) : (
                        <p>No se encontró la imagen.</p>
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default Visitantes