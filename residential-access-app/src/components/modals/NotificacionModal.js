import React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaInfoCircle } from "react-icons/fa"
import "../../styles/General/NotificationModal.scss"

const NotificationModal = ({ isOpen, message, onClose }) => {
    if (!isOpen) {
        return null
    }

    return createPortal(
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <FaInfoCircle className="modal-icon" />
                    <p>{message}</p>
                    <button onClick={onClose}>OK</button>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    )
}

export default NotificationModal
