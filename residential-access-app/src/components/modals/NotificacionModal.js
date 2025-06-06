import React, { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaInfoCircle } from "react-icons/fa"
import "../../styles/General/NotificationModal.scss"

const NotificationModal = ({ isOpen, message, onClose }) => {
    const [closing, setClosing] = useState(false)

    if (!isOpen) {
        return null
    }

    const handleClose = () => {
        setClosing(true)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 500)
    }

    return createPortal(
        <AnimatePresence>
            <motion.div
                className={`notification-modal-overlay ${closing ? "fade-out-notification" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={`notification-modal-content ${closing ? "scale-down-notification" : ""}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <FaInfoCircle className="notification-modal-icon" />
                    <p>{message}</p>
                    <button onClick={handleClose}>OK</button>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    )
}

export default NotificationModal
