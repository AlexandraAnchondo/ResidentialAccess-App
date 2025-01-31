import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faShareAlt, faQrcode, faPencil } from "@fortawesome/free-solid-svg-icons"
import CodeModal from "./modals/CodeModal"
import "../../styles/Usuarios/HomePage.css"
import { Button } from "@mui/material"
import { QRCodeCanvas } from "qrcode.react"
import useMediaQuery from "@mui/material/useMediaQuery"

const HomePage = () => {
    const [address, setAddress] = useState("Av. Ficticia 1234 Fraccionamiento Inexistente Para Pruebas")
    const [phone, setPhone] = useState("(686) 420-49-24")
    const [email, setEmail] = useState("correo@gmail.com")
    const [ineSrc, setIneSrc] = useState("INE.png")
    const [showModal, setShowModal] = useState(false)
    const [qrCodes, setQrCodes] = useState([])
    const isUnder568 = useMediaQuery("(max-width: 568px)")
    const isUnder768 = useMediaQuery("(max-width: 768px)")
    const isUnder1068 = useMediaQuery("(max-width: 1068px)")

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const handleGenerateClick = () => {
        setShowModal(true)
    }

    const handleCloseModal = (newQrCodes) => {
        setShowModal(false)
        if (newQrCodes && newQrCodes.length > 0) {
            setQrCodes(() => [...newQrCodes])
        }
    }

    const handleShareClick = (code) => {
        navigator.share({
            title: "Código QR",
            text: `Aquí tienes un código QR con vencimiento en ${code.duration}`
        })
    }

    return (
        <div className="home-container">
            <main className="home-main">
                <div className="combined-info">
                    <section className="homepage-info">
                        <h2>Información del residente:</h2>
                        <div className="homepage-info-item">
                            <strong>Dirección:</strong>
                            <input
                                type="text"
                                value={address}
                                readOnly
                            />
                        </div>
                        <div className="homepage-info-item">
                            <strong>Teléfono:</strong>
                            <input type="text" value={phone} readOnly /> {/* Mostrar teléfono */}
                        </div>
                        <div className="homepage-info-item">
                            <strong>Correo:</strong>
                            <input type="email" value={email} readOnly /> {/* Mostrar correo */}
                        </div>
                        <Button
                            variant="contained"
                            className="edit-button"
                            sx={{
                                color: "#ffff",
                                backgroundColor: "#00a8cc",
                                borderColor: "#00a8cc",
                                "&:hover": { borderColor: "#00a8ccCC", backgroundColor: "#00a8ccCC" }
                            }}
                        >
                            <FontAwesomeIcon icon={faPencil} /> Editar
                        </Button>
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
                    <h2>Generador de códigos:</h2>
                    {qrCodes.length === 0 ? (
                        <div className="no-code">
                            <p>No existe ningún <br />código vigente</p>
                            <FontAwesomeIcon icon={faQrcode} className="icon-placeholder" />
                        </div>
                    ) : (
                        <div className="qr-codes-container">
                            {qrCodes.map((code, index) => (
                                <div
                                    key={code.id}
                                    className={`qr-code-card position-${index % 2 === 0 ? "left" : "right"}`}
                                >
                                    {/* Imagen QR */}
                                    <QRCodeCanvas value={code.id} size={isUnder568 ? 100 : isUnder768 ? 120 : isUnder1068  ? 100 : 150} />
                                    {/* Contenedor del texto y botón */}
                                    <div className="content">
                                        <p>Vence en: {code.duration}</p>
                                        <Button
                                            variant="outlined"
                                            startIcon={<FontAwesomeIcon icon={faShareAlt} />}
                                            onClick={() => handleShareClick(code)}
                                        >
                                            Compartir
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleGenerateClick}
                        disabled={qrCodes.length === 3}
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
            />
        </div>
    )
}

export default HomePage
