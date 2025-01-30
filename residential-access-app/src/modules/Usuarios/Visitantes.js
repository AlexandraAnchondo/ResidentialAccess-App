import React, { use, useState } from "react";
import "../../styles/Usuarios/Visitantes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTrashAlt, faPencil, faCircleInfo, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import AddVisitanteModal from "./modals/AddVisitanteModal";
import DeleteModal from "./modals/DeleteModal";
import { Button, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Visitantes = () => {
    const [visitantesData, setVisitantesData] = useState([
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
            bloqueado: false, 
        },
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
            bloqueado: false, 
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);

    const isMobile = useMediaQuery("(max-width: 1068px)");

    const handleAgregarVisitanteClick = () => {
        setShowModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const handleAgregarVisitante = (nuevoVisitante) => {
        setVisitantesData([
            ...visitantesData,
            { ...nuevoVisitante, bloqueado: false }, 
        ]);
        setShowModal(false);
    };

    const handleBorrarVisitante = (index) => {
        const newVisitantes = visitantesData.filter((_, i) => i !== index);
        setVisitantesData(newVisitantes);
        setShowDeleteModal(false);
    };

    const toggleBloqueo = (index) => {
        const updatedVisitantes = visitantesData.map((visitante, i) =>
            i === index ? { ...visitante, bloqueado: !visitante.bloqueado } : visitante
        );
        setVisitantesData(updatedVisitantes);
    };

    return (
        <div className="visitantes-container">
            <main className="visitantes-main">
                <Typography 
                    variant="h2" 
                    align="center" 
                    sx={{ 
                        marginTop: isMobile ? '30px' : '0',
                        marginBottom: isMobile ? '10px' : '0',
                        fontWeight: 500, 
                        fontSize: isMobile ? '.9rem' : '1.3rem',
                        border: '1px solid', 
                        borderRadius: 2, 
                        padding: 2, 
                        backgroundColor: 'rgba(255, 255, 255)', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                        opacity: '80%',
                        width: 'calc(90% - 70px)', 
                        mx: isMobile ? '12px' : '80px', 
                        wordWrap: 'break-word', 
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
                                    <div className="visitor-info-container">
                                        <div className="visitor-info-item">
                                            <label>Nombre:</label>
                                            <span>{item.nombre}</span>
                                        </div>
                                        <div className="visitor-info-item">
                                            <label>Apellidos:</label>
                                            <span>{item.apellido}</span>
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
                                            color: "#ffff",
                                            color: "#00a8cc",
                                            borderColor: 'transparent',
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
                                <Button onClick={ () =>{
                                    handleDeleteClick();
                                    setIndexToDelete(index);
                                }}
                                ><FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '20px' }} />
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
                                    width: "50%", 
                                    marginBottom: '20px'
                                }}
                            >
                                Agregar visitante
                            </Button>
                        )}
                    </div>
                )}
            </main>
            
            <AddVisitanteModal
                show={showModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarVisitante}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseDeleteModal}
                onDelete={() => handleBorrarVisitante(indexToDelete)}
            />
        </div>
    );
};

export default Visitantes;