import React, { useState } from "react"
import { FaBox, FaPlus, FaUndo } from "react-icons/fa"
import { Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material"
import "../../styles/Administrador/Prestamos.scss"

// Components
import Loader from "../../components/Loader"

// Hooks
import {
    usePrestamos,
    useUpdatePrestamo
} from "../../hooks/prestamos.hook"

const MisPrestamos = ({ id_usuario, nombre_usuario }) => {
    const { prestamos, loading, reload } = usePrestamos()
    const { editPrestamo } = useUpdatePrestamo()

    const [solicitar, setSolicitar] = useState(false)
    const [articuloSeleccionado, setArticuloSeleccionado] = useState("")

    const misPrestamos = prestamos.filter(p => p.id_usuario === id_usuario)
    const disponibles = prestamos.filter(p => !p.id_usuario)

    const obtenerFechaHoy = () => {
        const hoy = new Date()
        return hoy.toISOString().split("T")[0] // YYYY-MM-DD
    }

    const handleSolicitar = async () => {
        if (!articuloSeleccionado) {
            return
        }

        try {
            await editPrestamo({
                id: articuloSeleccionado,
                id_usuario: id_usuario,
                nombre_usuario: nombre_usuario,
                fecha_solicitado: obtenerFechaHoy()
            })
            reload()
            setSolicitar(false)
            setArticuloSeleccionado("")
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
                fecha_solicitado: null
            })
            reload()
        } catch (error) {
            console.error(error)
        }
    }

    const formatearFecha = (fechaStr) => {
        const fecha = new Date(fechaStr)
        return fecha.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }

    return (
        <div className="prestamos-container">
            <h2 className="titulo-principal">Mis artículos prestados</h2>

            {loading ? (
                <div className="loading-container"><Loader /></div>
            ) : misPrestamos.length === 0 ? (
                <p className="mensaje-vacio">No has solicitado ningún artículo aún.</p>
            ) : (
                <div className="prestamos-grid">
                    {misPrestamos.map((p, i) => (
                        <div key={i} className="prestamo-card prestado">
                            <div className="icono"><FaBox /></div>
                            <div className="nombre">{p.nombre_articulo}</div>
                            <div className="fecha">📅 Solicitado el: {formatearFecha(p.fecha_solicitado)}</div>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<FaUndo />}
                                onClick={() => handleDevolver(p.id)}
                            >
                                Devolver
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <div className="acciones" style={{ marginTop: "2rem", justifyContent: "center" }}>
                {solicitar ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        <FormControl fullWidth sx={{ maxWidth: 300 }}>
                            <InputLabel>Selecciona un artículo</InputLabel>
                            <Select
                                value={articuloSeleccionado}
                                label="Selecciona un artículo"
                                onChange={(e) => setArticuloSeleccionado(e.target.value)}
                            >
                                {disponibles.map((a) => (
                                    <MenuItem key={a.id} value={a.id}>{a.nombre_articulo}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="acciones">
                            <Button
                                variant="contained"
                                disabled={!articuloSeleccionado}
                                onClick={handleSolicitar}
                                sx={{ backgroundColor: "#4caf50" }}
                            >
                                Confirmar solicitud
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setSolicitar(false); setArticuloSeleccionado("")
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                ) : (
                    disponibles.length > 0 ? (
                        <Button
                            variant="contained"
                            startIcon={<FaPlus />}
                            onClick={() => setSolicitar(true)}
                            sx={{ backgroundColor: "#00a8cc" }}
                        >
                            Solicitar nuevo artículo
                        </Button>
                    ) : (
                        <p className="mensaje-vacio">No hay artículos disponibles por ahora.</p>
                    )
                )}
            </div>
        </div>
    )
}

export default MisPrestamos
