import React, { use, useState } from "react";
import "../../styles/Usuarios/Residentes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTrashAlt, faPencil, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AddResidenteModal from "./modals/AddResidenteModal";
import { Button, Typography } from "@mui/material";
import DeleteModal from "./modals/DeleteModal";
import useMediaQuery from "@mui/material/useMediaQuery";

const Residentes = () => {
    const [residentesData, setResidentesData] = useState([
        {
            nombre: "Alexandra",
            apellido: "Anchondo Robles",
            telefono: "686-420-49-24",
            correo: "correo1@gmail.com",
        },
        {
            nombre: "Hael Giovanni",
            apellido: "Osuna Cota",
            telefono: "686-420-49-24",
            correo: "correo2@gmail.com",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);

    const isMobile = useMediaQuery("(max-width: 1068px)");

    const handleAgregarResidenteClick = () => {
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

    const handleAgregarResidente = (nuevoResidente) => {
        setResidentesData([...residentesData, nuevoResidente]);
        setShowModal(false);
    };

    const handleBorrarResidente = (index) => {
        const newResidentes = residentesData.filter((_, i) => i !== index);
        setResidentesData(newResidentes);
        setShowDeleteModal(false);
    };

    return (
        <div className="residentes-container">
            <main className="residentes-main">
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
                    <FontAwesomeIcon icon={faCircleInfo} /> Administre las personas que viven en su vivienda.
                </Typography>
                {residentesData.length === 0 ? (
                    <div className="no-data">
                        <FontAwesomeIcon icon={faUserGroup} className="icon-placeholder" />
                        <p>No existe ningún residente registrado</p>
                        <Button
                            variant="contained"
                            onClick={handleAgregarResidenteClick}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8cc" },
                            }}
                        >
                            Agregar residente
                        </Button>
                    </div>
                ) : (
                    <div className="residentes-list">
                        {residentesData.map((item, index) => (
                            <div className="resident-container" key={index}>
                                <section className="resident-info">
                                    <h3>Información del residente</h3>
                                    <div className="resident-info-container">
                                        <div className="resident-info-item ">
                                            <label>Nombre:</label>
                                            <span>{item.nombre}</span>
                                        </div>
                                        <div className="resident-info-item ">
                                            <label>Apellidos:</label>
                                            <span>{item.apellido}</span>
                                        </div>
                                        <div className="resident-info-item ">
                                            <label>Teléfono:</label>
                                            <span>{item.telefono}</span>
                                        </div>
                                        <div className="resident-info-item ">
                                            <label>Correo:</label>
                                            <span>{item.correo}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        startIcon={<FontAwesomeIcon icon={faPencil} />}
                                        sx={{
                                            color: "#ffff",
                                            color: "#00a8cc",
                                            borderColor: 'transparent',
                                            marginRight: 2,
                                            marginTop: 2,
                                            marginLeft: 3,
                                        }}
                                    >
                                        Editar
                                    </Button>
                                </section>
                                <Button
                                    onClick={() => {
                                        handleDeleteClick();
                                        setIndexToDelete(index);
                                    }}
                                ><FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '20px' }} />
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="contained"
                            onClick={handleAgregarResidenteClick}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8ccCC" },
                                width: isMobile ? "60%" : "50%", 
                                marginBottom: '20px'
                            }}
                        >
                            Agregar residente
                        </Button>
                    </div>
                )}
            </main>
            
            <AddResidenteModal
                show={showModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarResidente}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseDeleteModal}
                onDelete={() => handleBorrarResidente(indexToDelete)}
            />
        </div>
    );
};

export default Residentes;