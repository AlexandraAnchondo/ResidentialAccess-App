import React, { useState, useMemo } from "react"
import { FaBullhorn, FaSearch, FaTimes } from "react-icons/fa"
import { ArrowBack } from "@mui/icons-material"
import Loader from "../../components/Loader"
import { Button } from "@mui/material"
import { useComunicados } from "../../hooks/comunicados.hook"
import "../../styles/Usuarios/Comunicados.scss"

const ComunicadosUsuario = ({ showBackButton = false, handleBack }) => {
    const { comunicados, loading } = useComunicados()

    const [filtroTiempo, setFiltroTiempo] = useState("3m")
    const [busqueda, setBusqueda] = useState("")
    const [comunicadoSeleccionado, setComunicadoSeleccionado] = useState(null)
    const [closing, setClosing] = useState(false)

    const filtrarPorTiempo = (lista, filtro) => {
        if (filtro === "todos") {
            return lista
        }
        const ahora = new Date()
        const fechaLimite = new Date()
        if (filtro === "3m") {
            fechaLimite.setMonth(ahora.getMonth() - 3)
        }
        if (filtro === "6m") {
            fechaLimite.setMonth(ahora.getMonth() - 6)
        }
        if (filtro === "1y") {
            fechaLimite.setFullYear(ahora.getFullYear() - 1)
        }
        return lista.filter(c => new Date(c.created_at) >= fechaLimite)
    }

    const comunicadosFiltrados = useMemo(() => {
        const ordenados = [...comunicados].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        const porTiempo = filtrarPorTiempo(ordenados, filtroTiempo)

        if (!busqueda.trim()) {
            return porTiempo
        }

        const termino = busqueda.toLowerCase()
        return porTiempo.filter(c =>
            c.titulo.toLowerCase().includes(termino) ||
            c.mensaje.toLowerCase().includes(termino)
        )
    }, [comunicados, filtroTiempo, busqueda])

    const formatearFecha = (fechaStr) => {
        const fecha = new Date(fechaStr)
        return fecha.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }

    const handleClose = () => {
        setClosing(true)
        setTimeout(() => {
            setComunicadoSeleccionado(null)
            setClosing(false)
        }, 500)
    }

    return (
        <div className="comunicados-usuarios-container">
            <h2 className="titulo-principal">Comunicados del Administrador</h2>

            {showBackButton && (
                <Button
                    variant="contained"
                    endIcon={<ArrowBack />}
                    sx={{ marginBottom: "1rem", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                    onClick={handleBack}
                >Atrás</Button>
            )}
            <div className="filtros">
                <select value={filtroTiempo} onChange={(e) => setFiltroTiempo(e.target.value)}>
                    <option value="3m">Últimos 3 meses</option>
                    <option value="6m">Últimos 6 meses</option>
                    <option value="1y">Último año</option>
                    <option value="todos">Todos</option>
                </select>

                <div className="buscador">
                    <FaSearch className="icono" />
                    <input
                        type="text"
                        placeholder="Buscar por título o mensaje"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <Loader />
                </div>
            ) : comunicadosFiltrados.length === 0 ? (
                <p className="mensaje-vacio">No se encontraron comunicados.</p>
            ) : (
                <div className="comunicados-usuarios-grid">
                    {comunicadosFiltrados.map((comunicado, index) => (
                        <button
                            className="comunicado-card fade-in"
                            key={index}
                            onClick={() => setComunicadoSeleccionado(comunicado)}
                        >
                            <div className="comunicado-header">
                                <FaBullhorn className="icono" />
                                <h3 className="titulo">{comunicado.titulo}</h3>
                            </div>
                            <p className="fecha">📅 {formatearFecha(comunicado.created_at)}</p>
                        </button>
                    ))}
                </div>
            )}

            {comunicadoSeleccionado && (
                <div className={`modal-overlay ${closing ? "fade-out-notification" : ""}`} onClick={() => setComunicadoSeleccionado(null)}>
                    <div className={`modal-contenido ${closing ? "scale-down-notification" : ""}`} onClick={e => e.stopPropagation()}>
                        <button className="cerrar" onClick={handleClose}>
                            <FaTimes />
                        </button>
                        <h3 className="titulo-modal">{comunicadoSeleccionado.titulo}</h3>
                        <p className="mensaje-modal">{comunicadoSeleccionado.mensaje}</p>
                        <p className="fecha-modal">
                            Publicado el {formatearFecha(comunicadoSeleccionado.created_at)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ComunicadosUsuario
