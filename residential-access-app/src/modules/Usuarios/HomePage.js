import React, { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faShareAlt, faQrcode, faPencil } from "@fortawesome/free-solid-svg-icons"
import "../../styles/Usuarios/HomePage.scss"
import { Button } from "@mui/material"
import { QRCodeCanvas } from "qrcode.react"
import useMediaQuery from "@mui/material/useMediaQuery"

// Components
import CountdownTimer from "../../components/CountdownTimer"

// Utils
import { shareQrImage } from "../../utils/shareQRImage"

// Hooks
import {
    useGetDomicilioById,
    useCreateAccessCode,
    useUpdateDomicilio
} from "../../hooks/domicilio.hook"

// Modals
import CodeModal from "./modals/CodeModal"
import NumericCodeModal from "./modals/NumericCodeModal"

const HomePage = ({ id_domicilio, name, phone, email, ineSrc }) => {
    // API calls
    const { fetchDomicilio, domicilio } = useGetDomicilioById()
    const { saveCode } = useCreateAccessCode()
    const { editDomicilio } = useUpdateDomicilio()

    const [showModal, setShowModal] = useState(false)
    const [showNumericModal, setShowNumericModal] = useState(false)
    const [qrCodes, setQrCodes] = useState([])
    const [numericCode, setNumericCode] = useState(null)
    const qrRefs = useRef({})
    const [isSaved, setIsSaved] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [message, setMessage] = useState(false)
    const isUnder568 = useMediaQuery("(max-width: 568px)")
    const isUnder768 = useMediaQuery("(max-width: 768px)")
    const isUnder1068 = useMediaQuery("(max-width: 1068px)")

    // Cargar domicilio cuando ya se tenga el id
    useEffect(() => {
        if (id_domicilio && domicilio == null) {
            fetchDomicilio(id_domicilio)
        }
    }, [fetchDomicilio])

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        if (domicilio != null && domicilio.access_codes != null) {
            const validCodes = domicilio.access_codes.filter(code => code.id != null)
            setQrCodes(validCodes)
            setNumericCode(domicilio.codigo_numerico)
        }
    }, [showModal, domicilio])

    const handleGenerateClick = () => {
        setShowModal(true)
    }

    const handleSaveCode = async (selectedCodes) => {
        const codesToGenerate = selectedCodes.map((value) => {
            let duration
            let expiration

            // Asignar la duración
            if (value === "1-month") {
                duration = "1 mes"
                expiration = new Date()
                expiration.setMonth(expiration.getMonth() + 1) // Agregar 1 mes
            } else if (value === "1-week") {
                duration = "1 semana"
                expiration = new Date()
                expiration.setDate(expiration.getDate() + 7) // Agregar 7 días
            } else if (value === "1-day") {
                duration = "1 día"
                expiration = new Date()
                expiration.setDate(expiration.getDate() + 1) // Agregar 1 día
            } else if (value === "single-use") {
                duration = "1 uso único"
                expiration = "" // No hay fecha de expiración
            }

            return {
                duration,
                id: `${value}-${Date.now()}`,
                expiration: expiration ? expiration.toISOString() : "1 uso único" // La fecha de expiración en formato ISO
            }
        })

        try {
            const response = await saveCode({ id_domicilio: id_domicilio, codes: codesToGenerate })
            if (response.success !== false) {
                setQrCodes(() => [...qrCodes, ...codesToGenerate])
                domicilio.access_codes = [...domicilio.access_codes, ...codesToGenerate]
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

    const handleCloseModal = () => {
        setShowModal(false)
        setMessage(null)
    }

    const handleShareClick = (code) => {
        const qrCanvas = qrRefs.current[code.id]
        shareQrImage(qrCanvas, code, process.env.REACT_APP_NOMBRE_RESIDENCIAL)
    }

    const handleSaveNumericCode = async (nuevoCodigo) => {
        try {
            const response = await editDomicilio({ id: id_domicilio, codigo_numerico: nuevoCodigo })
            if (response.id != null) {
                setNumericCode(nuevoCodigo)
                setIsSaved(true)
                setMessage(response.message ? response.message : "Operación exitosa")
                return
            }
            setIsFailure(true)
        } catch (error) {
            setIsFailure(true)
            setMessage(error.message || "Operación fallida")
        }
    }

    const handleShareNumericCodeClick = (code) => {
        const mensaje = `${process.env.REACT_APP_NOMBRE_RESIDENCIAL}\n${domicilio.calle} ${domicilio.numero_calle}\nEste es tu código de acceso: ${code}\nCompártelo solo con personas de confianza`

        if (navigator.share) {
            navigator.share({
                title: "Código de acceso",
                text: mensaje
            }).catch((error) => {
                console.error("Error al compartir:", error)
            })
        } else {
            navigator.clipboard.writeText(mensaje)
            alert("Mensaje copiado al portapapeles:\n\n" + mensaje)
        }
    }

    return (
        <div className="home-container">
            <main className="home-main">
                <div className="combined-info">
                    <section className="homepage-info">
                        <h2>Información del residente:</h2>
                        <div className="homepage-info-item">
                            <strong>Nombre:</strong>
                            <input type="name" value={name} readOnly /> {/* Mostrar nombre */}
                        </div>
                        <div className="homepage-info-item">
                            <strong>Teléfono:</strong>
                            <input type="text" value={phone} readOnly /> {/* Mostrar teléfono */}
                        </div>
                        <div className="homepage-info-item">
                            <strong>Correo:</strong>
                            <input type="email" value={email} readOnly /> {/* Mostrar correo */}
                        </div>
                    </section>

                    <section className="id-photo">
                        <h2>Foto de Identificación:</h2>
                        {ineSrc == null || ineSrc === "" ? (
                            <div className="no-image">
                                <p>No se ha proporcionado <br/> identificación</p>
                                <FontAwesomeIcon icon={faImage} className="icon-placeholder" />
                            </div>
                        ) : (
                            <center>
                                <img src={ineSrc} alt="Foto de identificación" />
                            </center>
                        )}
                    </section>
                </div>

                <section className="code-generator">
                    <h2>Códigos de acceso:</h2>
                    <div className="numeric-code-container">
                        <p className="code-title">Código numérico</p>
                        <div className="numeric-code-card">
                            <div className="content">
                                <div className="left">
                                    <h2 className="numeric-code">{numericCode}</h2>
                                </div>
                                <div className="right">
                                    <Button
                                        variant="outlined"
                                        startIcon={<FontAwesomeIcon icon={faShareAlt} />}
                                        onClick={() => handleShareNumericCodeClick(numericCode)}
                                        fullWidth
                                    >
                                Compartir
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<FontAwesomeIcon icon={faPencil} />}
                                        onClick={() => setShowNumericModal(true)}
                                        fullWidth
                                    >
                                Cambiar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {qrCodes.length === 0 ? (
                        <div className="no-code">
                            <p>No existe ningún <br />código QR vigente</p>
                            <FontAwesomeIcon icon={faQrcode} className="icon-placeholder" />
                        </div>
                    ) : (
                        <div className="qr-codes-container">
                            <p className="code-title">Códigos QR</p>
                            {qrCodes.map((code, index) => {
                                if (!code.id) {
                                    return null
                                }

                                const handleCodeExpire = () => {
                                    setQrCodes((prev) => prev.filter((c) => c.id !== code.id))
                                }

                                return (
                                    <div
                                        key={code.id}
                                        className={`qr-code-card position-${index % 2 === 0 ? "left" : "right"}`}
                                    >
                                        <QRCodeCanvas
                                            ref={(el) => {
                                                if (el) {
                                                    qrRefs.current[code.id] = el
                                                }
                                            }}
                                            value={code.id}
                                            size={isUnder568 || qrCodes.length === 4 ? 100 : isUnder768 || qrCodes.length === 3 ? 120 : isUnder1068 ? 100 : 150}
                                        />

                                        <div className="content">
                                            <p>
                                                Vence en:{" "}
                                                <CountdownTimer expiration={code.expiration} onExpire={handleCodeExpire} /> (
                                                {code.duration})
                                            </p>
                                            <Button
                                                variant="outlined"
                                                startIcon={<FontAwesomeIcon icon={faShareAlt} />}
                                                onClick={() => handleShareClick(code)}
                                            >
                                            Compartir
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleGenerateClick}
                        disabled={qrCodes.length === 4}
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": { backgroundColor: "#00a8ccCC" },
                            marginTop: "20px"
                        }}
                        startIcon={<FontAwesomeIcon icon={faQrcode} />}
                    >
                        Generar
                    </Button>
                </section>
            </main>

            <CodeModal
                show={showModal}
                onClose={handleCloseModal}
                existingCodes={qrCodes}
                onAdd={handleSaveCode}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />

            <NumericCodeModal
                open={showNumericModal}
                onClose={() => setShowNumericModal(false)}
                onSave={handleSaveNumericCode}
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isFailure={isFailure}
                setIsFailure={setIsFailure}
                message={message}
            />
        </div>
    )
}

export default HomePage
