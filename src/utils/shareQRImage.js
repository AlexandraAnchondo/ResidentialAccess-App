import logoImg from "../assets/Imagen Residencial.png"

export const shareQrImage = async (qrCanvas, code, residencial) => {
    if (!qrCanvas) {
        alert("No se pudo obtener el QR.")
        return
    }

    const qrSize = qrCanvas.width
    const padding = 60
    const textBoxHeight = 50
    const spacing = 20

    // Cargar imagen del logo
    const logo = new Image()
    logo.src = logoImg

    logo.onload = () => {
        const logoHeight = 80
        const logoSpacing = 30
        const height = qrSize + padding * 2 + (textBoxHeight + spacing) * 3 + logoHeight + logoSpacing
        const width = qrSize + padding * 4

        const finalCanvas = document.createElement("canvas")
        finalCanvas.width = width
        finalCanvas.height = height
        const ctx = finalCanvas.getContext("2d")

        // Fondo degradado
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, "#0ca9cc")
        gradient.addColorStop(1, "rgb(4, 18, 26)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Marco blanco redondeado para QR
        const qrX = (width - qrSize) / 2
        const qrY = padding
        const borderRadius = 30

        ctx.fillStyle = "#ffffff"
        drawRoundedRect(ctx, qrX - 15, qrY - 15, qrSize + 30, qrSize + 30, borderRadius)
        ctx.fill()

        // Dibujar QR dentro del marco
        ctx.drawImage(qrCanvas, qrX, qrY)

        // Dibujar texto dentro de cajas blancas
        const textos = [
            { text: residencial, font: "bold 22px 'Segoe UI', sans-serif" },
            { text: `Válido durante: ${code.duration}`, font: "20px 'Segoe UI', sans-serif" },
            { text: "Preséntalo en caseta para ingresar", font: "italic 18px 'Segoe UI', sans-serif" }
        ]

        let y = qrY + qrSize + spacing + 40

        textos.forEach(({ text, font }) => {
            ctx.font = font
            const textWidth = ctx.measureText(text).width
            const boxWidth = textWidth + 40
            const boxX = (width - boxWidth) / 2

            // Caja blanca
            ctx.fillStyle = "#fff"
            drawRoundedRect(ctx, boxX, y, boxWidth, textBoxHeight, 20)
            ctx.fill()

            // Texto negro
            ctx.fillStyle = "#000"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(text, width / 2, y + textBoxHeight / 2)

            y += textBoxHeight + spacing
        })

        // Dibujar logo centrado
        const logoWidth = (logo.width / logo.height) * logoHeight
        const logoX = (width - logoWidth) / 2
        const logoY = height - logoHeight - 20

        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight)

        // Convertir a imagen y compartir
        finalCanvas.toBlob(async (blob) => {
            if (!blob) {
                alert("No se pudo crear la imagen.")
                return
            }

            const file = new File([blob], "codigoQR.png", { type: "image/png" })

            if (navigator.canShare?.({ files: [file] })) {
                try {
                    await navigator.share({
                        title: "Código QR",
                        text: `Aquí tienes tu código para entrar a ${residencial}`,
                        files: [file]
                    })
                } catch (err) {
                    console.error("Error al compartir:", err)
                }
            } else {
                alert("Tu navegador no permite compartir imágenes.")
            }
        })
    }

    logo.onerror = () => {
        alert("No se pudo cargar el logo del residencial.")
    }
}

// Función para dibujar rectángulos redondeados
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
}
