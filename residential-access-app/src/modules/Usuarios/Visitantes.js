import React, { useState } from "react";
import "../../styles/Usuarios/Visitantes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTrashAlt, faPencil, faCircleInfo, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import AddVisitanteModal from "./modals/AddVisitanteModal";
import { Button, Typography } from "@mui/material";

const Visitantes = () => {
    const [visitantesData, setVisitantesData] = useState([
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
            bloqueado: false, // Nuevo estado de bloqueo
        },
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
            bloqueado: false, // Nuevo estado de bloqueo
        },
    ]);

    const [showModal, setShowModal] = useState(false);

    const handleAgregarVisitanteClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAgregarVisitante = (nuevoVisitante) => {
        setVisitantesData([
            ...visitantesData,
            { ...nuevoVisitante, bloqueado: false }, // Inicializar como desbloqueado
        ]);
        setShowModal(false);
    };

    const handleBorrarVisitante = (index) => {
        const newVisitantes = visitantesData.filter((_, i) => i !== index);
        setVisitantesData(newVisitantes);
    };

    const toggleBloqueo = (index) => {
        const updatedVisitantes = visitantesData.map((visitante, i) =>
            i === index ? { ...visitante, bloqueado: !visitante.bloqueado } : visitante
        );
        setVisitantesData(updatedVisitantes);
    };

    return (
        <>
            <Typography
                variant="h2"
                align="center"
                sx={{
                    marginLeft: "60px",
                    marginRight: "60px",
                    fontWeight: 500,
                    fontSize: "1.3rem",
                    border: "1px solid",
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: "rgba(255, 255, 255)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1);",
                    opacity: "80%",
                    width: "100%",
                }}
            >
                <FontAwesomeIcon icon={faCircleInfo} /> Administre las visitas frecuentes autorizadas. Siempre y cuando estén activas podrán acceder al residencial sin código.
            </Typography>
            {visitantesData.length === 0 ? (
                <div className="no-data">
                    <FontAwesomeIcon icon={faUserGroup} className="icon-placeholder" />
                    <p>No existe ningún visitante frecuente registrado</p>
                    <Button
                        variant="contained"
                        onClick={handleAgregarVisitanteClick}
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": { backgroundColor: "#00a8cc" },
                        }}
                    >
                        Agregar visitante
                    </Button>
                </div>
            ) : (
                <div className="visitantes-list">
                    {visitantesData.map((item, index) => (
                        <div className="visitor-container" key={index}>
                            <section className="visitor-info">
                                <h3>Información del visitante</h3>
                                <div className="info-container">
                                    <div className="info-item">
                                        <label>Nombre:</label>
                                        <span>{item.nombre}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Apellidos:</label>
                                        <span>{item.apellido}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Teléfono:</label>
                                        <span>{item.telefono}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Placas:</label>
                                        <span>{item.placas}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Modelo:</label>
                                        <span>{item.modelo}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    className="edit-button"
                                    startIcon={<FontAwesomeIcon icon={faPencil} />}
                                    sx={{
                                        color: "#ffff",
                                        backgroundColor: "#00a8cc",
                                        borderColor: "#00a8cc",
                                        "&:hover": { borderColor: "#00a8ccCC", backgroundColor: "#00a8ccCC" },
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
                                        marginTop: 2,
                                    }}
                                >
                                    {item.bloqueado ? "SIN ACCESO" : "CON ACCESO"}
                                </Button>
                            </section>
                            <Button
                                onClick={() => handleBorrarVisitante(index)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: "20px" }} />
                            </Button>
                        </div>
                    ))}
                    {visitantesData.length < 3 && (
                        <Button
                            variant="contained"
                            onClick={handleAgregarVisitanteClick}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8ccCC" },
                            }}
                        >
                            Agregar visitante
                        </Button>
                    )}
                </div>
            )}

            {/* AddVisitanteModal */}
            <AddVisitanteModal
                show={showModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarVisitante}
            />
        </>
    );
};

export default Visitantes;