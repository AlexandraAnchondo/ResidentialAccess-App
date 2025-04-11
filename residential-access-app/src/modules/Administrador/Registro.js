//Resources
import React, { useState, useEffect } from "react"
import { FaList, FaHouseUser, FaUserLock } from "react-icons/fa"
import { Button, Typography, Box, TextField, InputAdornment, Select, MenuItem } from "@mui/material"
import { FaIdCard } from "react-icons/fa"
import { ArrowBack, AddCard, People, Save, House, Phone, Email, CheckCircle, CameraAlt as CameraAltIcon, UploadFile as UploadFileIcon } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../../styles/Administrador/Registro.scss"

// Components
import Check from "../../components/Check"
import CameraModal from "../../components/modals/CameraModal"

// Hooks
import { useDomicilios } from "../../hooks/domicilio.hook"
import { useUsuario } from "../../hooks/usuario.hook"

const Registro = ({ selectedOption, setSelectedOption }) => {
    const isMobile = useMediaQuery("(max-width: 768px)")

    const [formResidenteData, setFormResidenteData] = useState({
        nombre: "",
        apellidos: "",
        ine: "",
        telefono: "",
        correo_electronico: "",
        id_domicilio: ""
    })
    const [formGuardiaData, setFormGuardiaData] = useState({
        nombre: "",
        apellidos: "",
        ine: "",
        telefono: "",
        correo_electronico: "",
        rfc: ""
    })
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)
    const [showCameraModal, setShowCameraModal] = useState(false)

    const { domicilios } = useDomicilios(["id", "calle", "numero_calle"])
    const { saveUsuario, loading } = useUsuario()

    useEffect(() => {
        setFormResidenteData({
            nombre: "",
            apellidos: "",
            ine: "",
            telefono: "",
            correo_electronico: "",
            id_domicilio: ""
        })
        setFormGuardiaData({
            nombre: "",
            apellidos: "",
            ine: "",
            telefono: "",
            correo_electronico: "",
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

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (selectedOption === "Residente") {
                setFormResidenteData({ ...formResidenteData, ine: file })
            } else {
                setFormGuardiaData({ ...formGuardiaData, ine: file })
            }
        }
    }

    const handleBackClick = () => {
        setSelectedOption("Registro de usuarios")
        setFormResidenteData({
            nombre: "",
            apellidos: "",
            ine: "",
            telefono: "",
            correo_electronico: "",
            id_domicilio: ""
        })
        setFormGuardiaData({
            nombre: "",
            apellidos: "",
            ine: "",
            telefono: "",
            correo_electronico: "",
            rfc: ""
        })
        setIsSaved(false)
        setIsFailure(false)
    }

    const isFormValid = (formData) => {
        return Object.values(formData).every(value => value !== "")
    }

    const handleSaveClick = async () => {
        const usuarioData = selectedOption === "Residente" ? formResidenteData : formGuardiaData
        usuarioData.id_rol = selectedOption === "Residente" ? 3 : 2
        try {
            const response = await saveUsuario(usuarioData)
            if (response.id != null) {
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
                            {isSaved ? "La información se ha registrado correctamente" : isFailure ? "La información no se pudo guardar" : `Ingresa la información del ${selectedOption.toLowerCase()}`}
                        </Typography>
                    </div>
                    <div className={selectedOption.toLowerCase() + "-content"}>
                        {!isSaved && !isFailure && <>
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
                                    label="Apellidos"
                                    name="apellidos"
                                    value={selectedOption === "Residente" ? formResidenteData.apellidos : formGuardiaData.apellidos}
                                    onChange={(e) => handleInputChange(e, selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData)}
                                    fullWidth
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <People /> </InputAdornment>) }}
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
                                    name="correo_electronico"
                                    value={selectedOption === "Residente" ? formResidenteData.correo_electronico : formGuardiaData.correo_electronico}
                                    onChange={(e) => handleInputChange(e, selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData)}
                                    fullWidth
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <Email /> </InputAdornment>) }}
                                />
                                {selectedOption === "Residente" ? (
                                    <Select name="id_domicilio"
                                        value={formResidenteData.id_domicilio}
                                        onChange={(e) => handleInputChange(e, setFormResidenteData)}
                                        displayEmpty
                                        fullWidth
                                        startAdornment={<InputAdornment position="start"> <House /> </InputAdornment>}>
                                        <MenuItem
                                            value=""
                                            disabled>
                                            Selecciona la dirección
                                        </MenuItem>
                                        {domicilios.map(domicilio => (<MenuItem key={domicilio.id} value={domicilio.id}>{`${domicilio.calle} ${domicilio.numero_calle}`}</MenuItem>))}
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

                                {/* Botón para tomar foto o subir INE */}
                                <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
                                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                        <FaIdCard size={isMobile ? 20 : 25} color="gray" />
                                        <Typography
                                            variant="caption"
                                            component={!isMobile ? "h2" : "h4"}
                                            gutterBottom
                                            color="gray"
                                            margin={0}
                                            fontFamily="'Lucida Sans', sans-serif"
                                            fontWeight="bold"
                                        >INE</Typography>
                                    </div>
                                    <Button
                                        variant="contained"
                                        startIcon={!isMobile ? <CameraAltIcon /> : ""}
                                        onClick={() => setShowCameraModal(true)} // Abre el modal de la cámara
                                    >
                                        {!isMobile ? "Tomar foto" : <CameraAltIcon />}
                                    </Button>

                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={!isMobile ?  <UploadFileIcon /> : ""}
                                    >
                                        {!isMobile ? "Subir archivo" : <UploadFileIcon />}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                </div>
                            </Box>
                            {formResidenteData.ine && !showCameraModal && (
                                <center><img
                                    src={typeof formResidenteData.ine === "string" ? formResidenteData.ine : URL.createObjectURL(formResidenteData.ine)}
                                    alt="INE"
                                    style={{ marginTop: 10, width: isMobile ? "90%" : "60%", borderRadius: 8 }}
                                /></center>
                            )}
                            {formGuardiaData.ine && !showCameraModal && (
                                <center><img
                                    src={typeof formGuardiaData.ine === "string" ? formGuardiaData.ine : URL.createObjectURL(formGuardiaData.ine)}
                                    alt="INE"
                                    style={{ marginTop: 10, width: isMobile ? "90%" : "60%", borderRadius: 8 }}
                                /></center>
                            )}
                            {showCameraModal && (
                                <CameraModal
                                    setFormData={selectedOption === "Residente" ? setFormResidenteData : setFormGuardiaData}
                                    formData={selectedOption === "Residente" ? formResidenteData : formGuardiaData}
                                    onClose={() => setShowCameraModal(false)} // Cierra modal después de tomar foto
                                />
                            )}
                            <Button
                                onClick={handleSaveClick}
                                variant="contained"
                                startIcon={<Save />}
                                disabled={!isFormValid(selectedOption === "Residente" ? formResidenteData : formGuardiaData) ||  loading}
                                size={isMobile ? "small" : "large"}
                                sx={{ minWidth: "100%", marginTop: "20px", backgroundColor: "#81c656", "&:hover": { backgroundColor: "#5f933f" } }}>
                                {loading ? "Guardando..." : "Guardar"}
                            </Button>
                        </>}
                        <Check isFailure={isFailure} isSaved={isSaved} message={message} />
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