import React, { useState, useEffect } from "react"
import { FaList, FaHouseUser, FaUserLock } from "react-icons/fa"
import { Button, Typography, Box, TextField, InputAdornment, Select, MenuItem } from "@mui/material"
import { ArrowBack, AddCard, People, Save, House, Phone, Email, CheckCircle } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../../styles/Administrador/Registro.css"

const Registro = ({ selectedOption, setSelectedOption }) => {
    const isMobile = useMediaQuery("(max-width: 768px)")

    const [formResidenteData, setFormResidenteData] = useState({
        nombre: "",
        apellido: "",
        ine: "",
        telefono: "",
        correo: "",
        direccion: ""
    })

    const [formGuardiaData, setFormGuardiaData] = useState({
        nombre: "",
        apellido: "",
        ine: "",
        telefono: "",
        correo: "",
        rfc: ""
    })

    const [isSaved, setIsSaved] = useState(false)
    const direcciones = ["Av. Mallorca 1110", "Av. Espierba 9302", "Av. De la bruma 5643"]

    useEffect(() => {
        setFormResidenteData({
            nombre: "",
            apellido: "",
            ine: "",
            telefono: "",
            correo: "",
            direccion: ""
        })
        setFormGuardiaData({
            nombre: "",
            apellido: "",
            ine: "",
            telefono: "",
            correo: "",
            rfc: ""
        })
    }, [])

    const handleCardSelection = (card) => {
        setSelectedOption(card)
    }

    const handleInputChange = (e, setFormData) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleBackClick = () => {
        setSelectedOption("Registro de usuarios")
        setFormResidenteData({
            nombre: "",
            apellido: "",
            ine: "",
            telefono: "",
            correo: "",
            direccion: ""
        })
        setFormGuardiaData({
            nombre: "",
            apellido: "",
            ine: "",
            telefono: "",
            correo: "",
            rfc: ""
        })
        setIsSaved(false)
    }

    const isFormValid = (formData) => {
        return Object.values(formData).every(value => value !== "")
    }

    const handleSaveClick = () => {
        setIsSaved(true)
        console.log("Información guardada:", selectedOption === "Residente" ? formResidenteData : formGuardiaData)
    }

    return (
        <div className="registro-container">
            {selectedOption === "Registro de usuarios" ? (
                <div className="card-container">
                    <button className="card" onClick={() => handleCardSelection("Residente")}>
                        <FaHouseUser size={isMobile ? 130 : 200} /> <span>Residente</span>
                    </button>
                    <button className="card" onClick={() => handleCardSelection("Guardia")}>
                        <FaUserLock size={isMobile ? 150 : 230} /> <span>Guardia</span>
                    </button>
                </div>
            ) : selectedOption === "Residente" || selectedOption === "Guardia" ? (
                <div className={selectedOption.toLowerCase() + "-container"}>
                    <div className={selectedOption.toLowerCase() + "-header"}>
                        <Typography
                            variant={!isMobile ? "h5" : "h6"}
                            component={!isMobile ? "h2" : "h4"}
                            gutterBottom
                            color="white"
                            margin={0}
                            fontFamily="'Lucida Sans', sans-serif"
                            fontWeight="bold">
                            {isSaved ? "La información se ha registrado correctamente" : `Ingresa la información del ${selectedOption.toLowerCase()}`}
                        </Typography>
                    </div>
                    <div className={selectedOption.toLowerCase() + "-content"}>
                        {!isSaved && <>
                            <Box className={selectedOption.toLowerCase() + "-options"}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={selectedOption === "Residente" ? formResidenteData.nombre : formGuardiaData.nombre}
                                    onChange={(e) => handleInputChange(e, selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData)}
                                    fullWidth
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <People /> </InputAdornment>) }}
                                />
                                <TextField
                                    label="Apellido"
                                    name="apellido"
                                    value={selectedOption === "Residente" ? formResidenteData.apellido : formGuardiaData.apellido}
                                    onChange={(e) => handleInputChange(e, selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData)}
                                    fullWidth
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <People /> </InputAdornment>) }}
                                />
                                <TextField
                                    label="INE"
                                    name="ine"
                                    value={selectedOption === "Residente" ? formResidenteData.ine : formGuardiaData.ine}
                                    onChange={(e) => handleInputChange(e, selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData)}
                                    fullWidth
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <AddCard /> </InputAdornment>) }}
                                />
                                <TextField
                                    label="Teléfono"
                                    name="telefono"
                                    value={selectedOption === "Residente" ? formResidenteData.telefono : formGuardiaData.telefono}
                                    onChange={(e) => handleInputChange(e, selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData)}
                                    fullWidth
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <Phone /> </InputAdornment>) }}
                                />
                                <TextField
                                    label="Correo"
                                    name="correo"
                                    value={selectedOption === "Residente" ? formResidenteData.correo : formGuardiaData.correo}
                                    onChange={(e) => handleInputChange(e, selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData)}
                                    fullWidth
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <Email /> </InputAdornment>) }}
                                />
                                {selectedOption === "Residente" ? (
                                    <Select name="direccion"
                                        value={formResidenteData.direccion}
                                        onChange={(e) => handleInputChange(e, setFormResidenteData)}
                                        displayEmpty
                                        fullWidth
                                        startAdornment={<InputAdornment position="start"> <House /> </InputAdornment>}>
                                        <MenuItem
                                            value=""
                                            disabled>
                                            Selecciona la dirección
                                        </MenuItem>
                                        {direcciones.map(direccion => (<MenuItem key={direccion} value={direccion}>{direccion}</MenuItem>))}
                                    </Select>
                                ) : (
                                    <TextField
                                        label="RFC"
                                        name="rfc"
                                        value={formGuardiaData.rfc}
                                        onChange={(e) => handleInputChange(e, setFormGuardiaData)}
                                        fullWidth
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <FaList /> </InputAdornment>) }}
                                    />
                                )}
                            </Box>
                            <Button
                                onClick={handleSaveClick}
                                variant="contained"
                                startIcon={<Save />}
                                disabled={!isFormValid(selectedOption === "Residente" ? formResidenteData : formGuardiaData)}
                                size={isMobile ? "small" : "large"}
                                sx={{ minWidth: "100%", marginTop: "20px", backgroundColor: "#81c656", "&:hover": { backgroundColor: "#5f933f" } }}>
                                Guardar
                            </Button>
                        </>}
                        {isSaved &&
                            <div className="add-modal-content-check" style={{ textAlign: "center", alignItems: "center" }}>
                                <CheckCircle className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                                    Captura exitosa
                                </Typography>
                            </div>
                        }
                        <Button
                            variant="contained"
                            endIcon={isSaved ? <CheckCircle /> : <ArrowBack />}
                            sx={{ minWidth: "100%", marginTop: "20px", backgroundColor: "#0778a1", "&:hover": { backgroundColor: "#004f79" } }}
                            onClick={handleBackClick}>
                            {isSaved ? "Aceptar" : "Atrás"}
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Registro