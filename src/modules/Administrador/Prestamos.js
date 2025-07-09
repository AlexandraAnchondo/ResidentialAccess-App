import React, { useState } from "react"
import { FaPlus, FaUser, FaCheck, FaTimes, FaTrash, FaPencilAlt, FaArrowAltCircleLeft } from "react-icons/fa"
import { TextField, Button, IconButton } from "@mui/material"
import "../../styles/Administrador/Prestamos.scss"

// Components
import Loader from "../../components/Loader"
import DeleteModal from "../../components/modals/DeleteModal"

// Hooks
import {
    usePrestamos,
    useCreatePrestamo,
    useDeletePrestamo,
    useUpdatePrestamo
} from "../../hooks/prestamos.hook"

const PrestamosArticulos = () => {
    const { prestamos, loading, reload } = usePrestamos()
    const { savePrestamo } = useCreatePrestamo()
    const { removePrestamo } = useDeletePrestamo()
    const { editPrestamo } = useUpdatePrestamo()

    const [openModal, setOpenModal] = useState(false)
    const [nuevoNombre, setNuevoNombre] = useState("")
    const [closing, setClosing] = useState(false)
    const [articuloEditando, setArticuloEditando] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [articuloAEliminar, setArticuloAEliminar] = useState(null)

    const handleAgregar = async () => {
        if (!nuevoNombre.trim()) {
            return
        }
        try{
            await savePrestamo({
                id: articuloEditando?.id,
                nombre_articulo: nuevoNombre
            })
            reload()
            setNuevoNombre("")
            setArticuloEditando(null)
            setOpenModal(false)
        } catch (e){
            console.log(e)
        }
    }

    const handleEditar = (articulo) => {
        setArticuloEditando(articulo)
        setNuevoNombre(articulo.nombre_articulo)
        setOpenModal(true)
    }

    const handleBorrar = (articulo) => {
        setArticuloAEliminar(articulo)
        setShowDeleteModal(true)
    }

    const handleConfirmarBorrado = async () => {
        try{
            await removePrestamo(articuloAEliminar.id)
            setShowDeleteModal(false)
            reload()
        } catch (e){
            console.log(e)
        }
    }

    const handleConfirmarEdición = async () => {
        try{
            await editPrestamo({ id: articuloEditando.id, nombre_articulo: nuevoNombre })
            setOpenModal(false)
            reload()
        } catch (e){
            console.log(e)
        }
    }

    const handleClose = () => {
        setClosing(true)
        setTimeout(() => {
            setOpenModal(false)
            setArticuloEditando(null)
            setClosing(false)
        }, 500)
    }

    const formatearFecha = (fechaStr) => {
        const fecha = new Date(fechaStr)
        return fecha.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }

    const obtenerFechaHoy = () => {
        const hoy = new Date()
        return hoy.toISOString().split("T")[0] // YYYY-MM-DD
    }

    const handlePrestar = async (idArticulo) => {
        try {
            await editPrestamo({
                id: idArticulo,
                fecha_prestamo: obtenerFechaHoy(),
                estatus: "Prestado"
            })
            reload()
        } catch (error) {
            console.error(error)
        }
    }

    const handleDevolver = async (idArticulo) => {
        try {
            await editPrestamo({
                id: idArticulo,
                id_usuario: null,
                nombre_usuario: null,
                fecha_solicitado: null,
                fecha_prestamo: null,
                estatus: "Libre"
            })
            reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="prestamos-container">
            <h2 className="titulo-principal">Artículos para préstamos</h2>

            {loading ? (
                <div className="loading-container"><Loader /></div>
            ) : prestamos.length === 0 ? (
                <p className="mensaje-vacio">No se encontraron artículos.</p>
            ) : (
                <div className="prestamos-grid">
                    {prestamos.map((p, index) => (
                        <div
                            key={index}
                            className={`prestamo-card ${p.estatus === "Libre" ? "libre" : p.estatus === "Solicitado" ? "solicitado" : p.estatus === "Prestado" ? "prestado" : "devolucion-solicitada"}`}
                        >
                            <div className="icono">{p.id_usuario ? <FaTimes /> : <FaCheck />}</div>
                            <div className="nombre">{p.nombre_articulo}</div>
                            {p.id_usuario && (
                                <>
                                    {p.estatus === "Prestado" && <>
                                        <div className="fecha">📅 Prestado el: {formatearFecha(p.fecha_prestamo)}</div>
                                    </>}
                                    <div className={`usuario ${p.estatus === "Solicitado" ? "solicitado" : p.estatus === "Prestado" ? "prestado" : "devolucion-solicitada"}`}>
                                        <FaUser />&nbsp;&nbsp;{p.nombre_usuario}
                                    </div>
                                    {p.estatus === "Solicitado" && <>
                                        <div className="fecha">📅 Solicitado el: {formatearFecha(p.fecha_solicitado)}</div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<FaArrowAltCircleLeft />}
                                            onClick={() => handlePrestar(p.id)}
                                            sx={{
                                                marginTop: "10px"
                                            }}
                                        >
                                        Prestar
                                        </Button>
                                    </>}
                                    {p.estatus === "Devolucion solicitada" && <>
                                        <div className="fecha">📅 Devolución solicitada el: {formatearFecha(p.fecha_devolucion_solicitada)}</div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<FaArrowAltCircleLeft />}
                                            onClick={() => handleDevolver(p.id)}
                                            sx={{
                                                marginTop: "10px"
                                            }}
                                        >
                                        Devolver
                                        </Button>
                                    </>}
                                </>
                            )}
                            <div className="acciones-card">
                                <IconButton onClick={() => handleEditar(p)} size="small">
                                    <FaPencilAlt />
                                </IconButton>
                                <IconButton onClick={() => handleBorrar(p)} size="small" color="error">
                                    <FaTrash />
                                </IconButton>
                            </div>
                        </div>
                    ))}

                    <div className="prestamo-card agregar" onClick={() => setOpenModal(true)}>
                        <FaPlus className="icono-mas" />
                    </div>
                </div>
            )}

            {openModal && (
                <div className={`modal-overlay ${closing ? "fade-out-notification" : ""}`}>
                    <div className={`modal-contenido ${closing ? "scale-down-notification" : ""}`} onClick={e => e.stopPropagation()}>
                        <h3>{articuloEditando ? "Editar artículo" : "Agregar nuevo artículo"}</h3>
                        <TextField
                            fullWidth
                            label="Nombre del artículo"
                            value={nuevoNombre}
                            onChange={(e) => setNuevoNombre(e.target.value)}
                            margin="normal"
                        />
                        <div className="acciones">
                            <Button
                                variant="contained"
                                onClick={articuloEditando ? handleConfirmarEdición : handleAgregar}
                                sx={{
                                    backgroundColor: "#00a8cc",
                                    "&:hover": "#00a8ccCC"
                                }}>
                                {articuloEditando ? "Guardar cambios" : "Guardar"}
                            </Button>
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                color="error">Cancelar</Button>
                        </div>
                    </div>
                </div>
            )}

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={() => setShowDeleteModal(false)}
                onDelete={handleConfirmarBorrado}
            />
        </div>
    )
}

export default PrestamosArticulos
