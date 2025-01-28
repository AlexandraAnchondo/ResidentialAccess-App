import React, { useState } from "react";
import "../../styles/Usuarios/Autos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencil, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AddAutoModal from "./modals/AddAutoModal";
import { Button, Typography } from "@mui/material";
import { AddCircle, DirectionsCar as CarIcon, Lock, LockOpen } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Autos = () => {
    const [autosData, setAutosData] = useState([
        { placas: "93903KFJS", modelo: "Hyundai Sonata", color: "Gris", bloqueado: false },
        { placas: "FJF9FS09", modelo: "Volkswagen Jetta", color: "Blanco", bloqueado: false },
    ]);

    const [showModal, setShowModal] = useState(false);
    
    const isMobile = useMediaQuery("(max-width: 768px)");

    const availableColors = ["Gris", "Blanco", "Negro", "Rojo", "Azul", "Verde", "Amarillo", "Dorado", "Plata", "Morado", "Cafe", "Naranja"];

    const colorMap = {
        Gris: "#808080",
        Blanco: "rgb(212, 212, 212)",
        Negro: "#000000",
        Rojo: "#FF0000",
        Azul: "rgb(92, 181, 255)",
        Verde: "#008000",
        Amarillo: "rgb(223, 197, 51)",
        Dorado: "rgb(163, 147, 122)",
        Plata: "rgb(192, 192, 192)",
        Morado: "rgb(138, 61, 138)",
        Cafe: "rgb(88, 64, 39)",
        Naranja: "rgb(255, 128, 0)",
    };

    const handleAgregarAutoClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAgregarAuto = (nuevoAuto) => {
        setAutosData([...autosData, { ...nuevoAuto, bloqueado: false }]);
        setShowModal(false);
    };

    const handleBorrarAuto = (index) => {
        const newAutos = autosData.filter((_, i) => i !== index);
        setAutosData(newAutos);
    };

    const toggleBloqueo = (index) => {
        const updatedAutos = autosData.map((auto, i) =>
            i === index ? { ...auto, bloqueado: !auto.bloqueado } : auto
        );
        setAutosData(updatedAutos);
    };

    return (
        <div className="autos-container">
            <main className="autos-main">
                <Typography 
                    variant="h2" 
                    align="center" 
                    sx={{ 
                        marginLeft: isMobile ? '30px' : '60px',
                        marginTop: isMobile ? '40px' : '0',
                        marginBottom: isMobile ? '10px' : '0',
                        fontWeight: 500, 
                        fontSize: isMobile ? '1rem' : '1.3rem',
                        border: '1px solid', 
                        borderRadius: 2, 
                        padding: 2, 
                        backgroundColor: 'rgba(255, 255, 255)', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1);', 
                        opacity: '80%',
                        width: "90%",
                    }}
                >
                    <FontAwesomeIcon icon={faCircleInfo} /> Administre los autos de su propiedad. Utilice el candado para bloquear / desbloquear el acceso.
                </Typography>
                {autosData.length === 0 ? (
                    <div className="no-data">
                        <CarIcon className="icon-placeholder" />
                        <p>No existe ningún auto registrado</p>
                        <Button
                            variant="contained"
                            onClick={handleAgregarAutoClick}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8cc" },
                            }}
                        >
                            Agregar auto
                        </Button>
                    </div>
                ) : (
                <div className="autos-cards">
                    {autosData.map((item, index) => (
                        <div className="auto-card" key={index}>
                            <div className="auto-card-header">
                                <Typography variant="h6">{item.modelo}</Typography>
                                <CarIcon
                                    style={{
                                        fontSize: 100,
                                        color: colorMap[item.color] || "#CCCCCC",
                                    }}
                                />
                            </div>
                            <div className="auto-card-body">
                                <p><strong>Placas:</strong> {item.placas}</p>
                                <p><strong>Color:</strong> {item.color}</p>
                            </div>
                            <div className="auto-card-actions">
                                <Button
                                    variant="text"
                                    onClick={() => toggleBloqueo(index)}
                                    startIcon={
                                        item.bloqueado ? (
                                            <Lock style={{ color: "red" }} />
                                        ) : (
                                            <LockOpen style={{ color: "gray" }} />
                                        )
                                    }
                                    size="large"
                                >
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => console.log("Editar auto", item)}
                                    startIcon={<FontAwesomeIcon icon={faPencil} />}
                                    size="small"
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => handleBorrarAuto(index)}
                                    color="error"
                                    startIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                                    size="small"
                                >
                                    Borrar
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button
                        variant="contained"
                        endIcon={<AddCircle />}
                        onClick={handleAgregarAutoClick}
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": { backgroundColor: "#00a8ccCC" },
                            marginLeft: isMobile ? '60px' : '0',
                            marginBottom: isMobile ? '20px' : '0',
                        }}
                    >
                        Agregar auto
                    </Button>
                </div>
            )}
            </main>

            <AddAutoModal
                show={showModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarAuto}
                availableColors={availableColors}
            />
        </div>
    );
};

export default Autos;
