import React, { use, useState } from "react";
import "../../styles/Usuarios/Visitantes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AddVisitanteModal from "./modals/AddVisitanteModal";
import DeleteModal from "./modals/DeleteModal";
import { Button } from "@mui/material";

const Visitantes = () => {
    const [visitantesData, setVisitantesData] = useState([
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
        },
        {
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);


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

    // Función para agregar un nuevo visitante
    const handleAgregarVisitante = (nuevoVisitante) => {
        setVisitantesData([...visitantesData, nuevoVisitante]);
        setShowModal(false);
    };

    const handleBorrarVisitante = (index) => {
        const newVisitantes = visitantesData.filter((_, i) => i !== index);
        setVisitantesData(newVisitantes);
        setShowDeleteModal(false);
    };

    return (
        <>
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
                                        <label>Apellido:</label>
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
                                    sx={{
                                        color: '#ffff',
                                        backgroundColor: "#00a8cc",
                                        borderColor: "#00a8cc",
                                        "&:hover": { borderColor: "#00a8ccCC", backgroundColor: "#00a8ccCC" },
                                    }}
                                >
                                    Editar
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

            {/* DeleteModal */}
            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseDeleteModal}
                onDelete={() => handleBorrarVisitante(indexToDelete)}
            />
        </>
    );
};

export default Visitantes;