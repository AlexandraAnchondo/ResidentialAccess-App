import React, { useState } from "react";
import "../../styles/Usuarios/Residentes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTrashAlt, faPencil, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AddResidenteModal from "./modals/AddResidenteModal";
import { Button, Typography } from "@mui/material";

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


    const handleAgregarResidenteClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAgregarResidente = (nuevoResidente) => {
        setResidentesData([...residentesData, nuevoResidente]);
        setShowModal(false);
    };

    const handleBorrarResidente = (index) => {
        const newResidentes = residentesData.filter((_, i) => i !== index);
        setResidentesData(newResidentes);
    };

    return (
        <>
            <Typography 
                variant="h2" 
                align="center" 
                sx={{ 
                    marginLeft: '60px', 
                    marginRight: "60px",
                    fontWeight: 500, 
                    fontSize: '1.3rem', 
                    border: '1px solid', 
                    borderRadius: 2, 
                    padding: 2, 
                    backgroundColor: 'rgba(255, 255, 255)', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1);', 
                    opacity: '80%',
                    width: "100%",
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
                                        <label>Correo:</label>
                                        <span>{item.correo}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    className="resident-edit-button"
                                    startIcon={<FontAwesomeIcon icon={faPencil} />}
                                    sx={{
                                        color: '#ffff',
                                        backgroundColor: "#00a8cc",
                                        borderColor: "#00a8cc",
                                        marginRight: 2,
                                        marginTop: 2,
                                        marginLeft: 3,
                                        "&:hover": { borderColor: "#00a8ccCC", backgroundColor: "#00a8ccCC" },
                                    }}
                                >
                                    Editar
                                </Button>
                            </section>
                            <Button
                                onClick={() => handleBorrarResidente(index)}
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
                        }}
                    >
                        Agregar residente
                    </Button>
                </div>
            )}

            {/* AddResidenteModal */}
            <AddResidenteModal
                show={showModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarResidente}
            />
        </>
    );
};

export default Residentes;