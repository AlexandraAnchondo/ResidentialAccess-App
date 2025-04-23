/* eslint-disable react/react-in-jsx-scope */
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect } from "react"
import "../styles/General/QRCodeScanner.scss"

const QRCodeScanner = ({ onScanSuccess, onClose }) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        })

        scanner.render(
            (decodedText, decodedResult) => {
                scanner.clear().then(() => {
                    onScanSuccess(decodedText)
                })
            },
            (errorMessage) => {
                // Puedes ignorar errores o mostrarlos si quieres
                console.warn("QR Scan Error:", errorMessage)
            }
        )

        return () => {
            scanner.clear().catch((error) => console.error("Error clearing scanner", error))
        }
    }, [onScanSuccess])

    return (
        <div style={{ textAlign: "center" }}>
            <div id="qr-reader" className="qr-reader" style={{ width: "100%" }} />
            <button className="qr-reader-button" onClick={onClose} style={{ marginTop: "1rem" }}>
                Cancelar
            </button>
        </div>
    )
}

export default QRCodeScanner
