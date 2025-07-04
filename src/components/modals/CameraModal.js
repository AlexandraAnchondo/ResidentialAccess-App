import React, { useRef, useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"

const ModalCamara = ({ setFormData, formData, onClose }) => {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [stream, setStream] = useState(null)

    // Inicia la cámara cuando el modal se abre
    useEffect(() => {
        startCamera()
        return () => stopCamera()
    }, [])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            videoRef.current.srcObject = stream
            setStream(stream)
        } catch (error) {
            console.error("Error al acceder a la cámara:", error)
        }
    }

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop())
        }
    }

    const takePhoto = () => {
        const canvas = canvasRef.current
        const video = videoRef.current
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const ctx = canvas.getContext("2d")
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], "ine_captura.png", { type: "image/png" })
                setFormData({ ...formData, ine: file }) // Se guarda como archivo
                onClose() // Cierra modal después de tomar la foto
                stopCamera()
            }
        }, "image/png")
    }

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent style={{ position: "relative", textAlign: "center" }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: "100%", borderRadius: 8 }} />
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={takePhoto} color="primary" variant="contained">
                    Tomar Foto
                </Button>
                <Button onClick={onClose} color="error" variant="outlined">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalCamara
