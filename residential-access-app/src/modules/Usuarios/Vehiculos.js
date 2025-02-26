// Resources
import React, { useState, useEffect } from "react"
import "../../styles/Usuarios/Vehiculos.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, faPencil, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { Button, Typography } from "@mui/material"
import { AddCircle, DirectionsCar as CarIcon, Lock, LockOpen } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import Loader from "../../components/Loader"

// Modals
import DeleteModal from "../../components/modals/DeleteModal"
import AddVehiculoModal from "./modals/AddVehiculoModal"
import EditVehiculoModal from "./modals/EditVehiculoModal"

// Hooks
import {
    useGetVehiculosByDomicilio,
    useCreateVehiculo,
    useGetVehiculoById,
    useUpdateVehiculo,
    useDeleteVehiculo
} from "../../hooks/vehiculo.hook"

const Vehiculos = ({ id_domicilio = 1 }) => {
    // API calls
    const { vehiculos, setVehiculos, loading } = useGetVehiculosByDomicilio(id_domicilio)
    const { saveVehiculo } = useCreateVehiculo()
    const { fetchVehiculo, vehiculo, setVehiculo } = useGetVehiculoById()
    const { editVehiculo } = useUpdateVehiculo()
    const { removeVehiculo } = useDeleteVehiculo()

    // State variables
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [vehiculoSelected, setVehiculoSelected] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)

    const isMobile = useMediaQuery("(max-width: 1068px)")

    const availableColors = ["Gris", "Blanco", "Negro", "Rojo", "Azul", "Verde", "Amarillo", "Dorado", "Plata", "Morado", "Cafe", "Naranja"]

    useEffect(() => {
        if (showAddModal || showDeleteModal || showEditModal || vehiculos.length === 0) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

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
        Naranja: "rgb(255, 128, 0)"
    }

    const handleCloseModal = () => {
        setShowDeleteModal(false)
        setShowEditModal(false)
        setShowAddModal(false)
        setVehiculoSelected(null)
        setVehiculo(null)
        setMessage(null)
    }

    const handleAgregarVehiculoClick = () => setShowAddModal(true)

    const handleAgregarVehiculo = async (nuevoVehiculo) => {
        try {
            const response = await saveVehiculo({ ...nuevoVehiculo, id_domicilio: id_domicilio })
            if (response.id != null) {
                setVehiculos([...vehiculos, { ...nuevoVehiculo, id: response.id, id_domicilio: 1 }])
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

    const handleEditVehiculoClick = async (vehiculo) => {
        await fetchVehiculo(vehiculo.id)
        setShowEditModal(true)
    }

    const handleEditarVehiculo = async (vehiculoEditado) => {
        try {
            const response = await editVehiculo({ ...vehiculoEditado, id_domicilio: id_domicilio })
            if (response.id != null) {
                const updatedVehiculos = vehiculos.map((vehiculo) =>
                    vehiculo.id === vehiculoEditado.id ? { ...vehiculoEditado, id_domicilio: 1 } : vehiculo
                )
                setVehiculos(updatedVehiculos)
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

    const handleDeleteClick = (vehiculo) => {
        setShowDeleteModal(true)
        setVehiculoSelected(vehiculo.id)
    }

    const handleBorrarVehiculo = async () => {
        await removeVehiculo(vehiculoSelected)
        const newVehiculos = vehiculos.filter((value) => value.id !== vehiculoSelected)
        setVehiculos(newVehiculos)
        setShowDeleteModal(false)
    }

    const toggleBloqueo = async (index) => {
        const updatedVehiculos = await vehiculos.map((vehiculo, i) => {
            if (i === index) {
                editVehiculo({ ...vehiculo, bloqueado: !vehiculo.bloqueado })
                return { ...vehiculo, bloqueado: !vehiculo.bloqueado }
            }
            return vehiculo
        }
        )
        setVehiculos(updatedVehiculos)
    }

    return (
        <div className="vehiculos-container">
            <main className="vehiculos-main">
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
                    <FontAwesomeIcon icon={faCircleInfo} /> Administre los vehículos de su propiedad. Utilice el candado para bloquear / desbloquear el acceso.
                </Typography>
                {vehiculos.length === 0 && !loading ? (
                    <div className="vehiculos-no-data">
                        <CarIcon className="icon-placeholder" />
                        <p>No existe ningún vehículo registrado</p>
                        <Button
                            variant="contained"
                            onClick={handleAgregarVehiculoClick}
                            endIcon={<AddCircle />}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8cc" }
                            }}
                        >
                                Agregar vehiculo
                        </Button>
                    </div>
                ) : loading ? (
                    <div className="loading-container">
                        <Loader/>
                    </div>
                ) : (
                    <div className="vehiculos-cards">
                        {vehiculos.map((item, index) => (
                            <div className="vehiculo-card" key={index}>
                                <div className="vehiculo-card-header">
                                    <Typography variant="h6">{item.modelo}</Typography>
                                    <CarIcon
                                        style={{
                                            fontSize: 100,
                                            color: colorMap[item.color] || "#CCCCCC"
                                        }}
                                    />
                                </div>
                                <div className="vehiculo-card-body">
                                    <p><strong>Placas:</strong> {item.placas}</p>
                                    <p><strong>Color:</strong> {item.color}</p>
                                </div>
                                <div className="vehiculo-card-actions">
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
                                        onClick={() => handleEditVehiculoClick(item)}
                                        startIcon={<FontAwesomeIcon icon={faPencil} />}
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="text"
                                        onClick={() => handleDeleteClick(item)}
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
                            onClick={handleAgregarVehiculoClick}
                            sx={{
                                backgroundColor: "#00a8cc",
                                "&:hover": { backgroundColor: "#00a8ccCC" }
                            }}
                        >
                            Agregar vehículo
                        </Button>
                    </div>
                )}
            </main>

            <AddVehiculoModal
                show={showAddModal}
                onClose={handleCloseModal}
                onAdd={handleAgregarVehiculo}
                availableColors={availableColors}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <EditVehiculoModal
                show={showEditModal}
                onClose={handleCloseModal}
                onEdit={handleEditarVehiculo}
                availableColors={availableColors}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                vehiculo={vehiculo}
                message={message}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseModal}
                onDelete={handleBorrarVehiculo}
            />
        </div>
    )
}

export default Vehiculos
