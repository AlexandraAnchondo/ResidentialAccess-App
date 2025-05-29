import React, { useState } from "react"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { Visibility, VisibilityOff, Check, Close } from "@mui/icons-material"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../../styles/General/ChangePasswordModal.scss"

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {
    const isMobile = useMediaQuery("(max-width: 768px)")

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [shakeError, setShakeError] = useState(false)
    const [closing, setClosing] = useState(false) // Estado para manejar animacion de cierre

    const validarContraseñaFuerte = (contraseña) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
        return regex.test(contraseña)
    }

    const handleSubmit = () => {
        const esFuerte = validarContraseñaFuerte(newPassword)
        const coinciden = newPassword === confirmPassword

        if (!esFuerte || !coinciden || !newPassword || !confirmPassword) {
            setMensaje(
                !esFuerte
                    ? "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo."
                    : "Las contraseñas no coinciden"
            )
            setShakeError(true)
            setTimeout(() => setShakeError(false), 500)
            return
        }

        onSubmit(newPassword)
        setConfirmPassword("")
        setNewPassword("")
        setMensaje("")
    }

    const handleClose = () => {
        setClosing(true)
        setTimeout(() => {
            setConfirmPassword("")
            setNewPassword("")
            setMensaje("")
            onClose()
            setClosing(false)
        }, 500)
    }

    if (!isOpen && !closing) {
        return null
    }

    return (
        <div className={`change-password-overlay ${closing ? "fade-out-notification" : ""}`}>
            <div className={`change-password-modal ${closing ? "scale-down-notification" : ""}`} style={{ height: mensaje != "" ? "280px" : "250px" }}>
                <h2>Cambiar contraseña</h2>

                <TextField
                    placeholder="Nueva contraseña"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    className={shakeError ? "error-shake" : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    placeholder="Confirmar contraseña"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    className={shakeError ? "error-shake" : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                {mensaje && <p className={`error-message ${shakeError ? "error-shake" : ""}`}>{mensaje}</p>}

                <div className="add-modal-options">
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        startIcon={<Check />}
                        size={isMobile ? "small" : "large"}
                        sx={{
                            backgroundColor: "#00a8cc",
                            "&:hover": { backgroundColor: "#00a8ccCC" },
                            marginLeft: isMobile ? 0 : 2,
                            marginTop: mensaje ? -1 : 2
                        }}
                    >
                        Guardar
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="error"
                        startIcon={<Close />}
                        size={isMobile ? "small" : "large"}
                        sx={{ marginLeft: isMobile ? 0 : 2, marginTop: mensaje ? -1 : 2 }}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal
