import React from "react";
import "../../../styles/Usuarios/CodeModal.css";
import {
    Button,
} from "@mui/material";
import {
    Check as CheckIcon,
} from "@mui/icons-material";
import '../../../styles/colors.css';

const CodeModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="code-modal-overlay">
            <div className="code-modal">
                <div className="code-modal-header">
                    <h2>¿Qué tipo de código desea crear?</h2>
                </div>
                <div className="code-modal-content">
                    <div className="code-modal-options">
                        <label>
                            <input type="checkbox" name="codeType" value="1-month" />
                            Un mes de vigencia
                        </label>
                        <label>
                            <input type="checkbox" name="codeType" value="1-week" />
                            Una semana de vigencia
                        </label>
                        <label>
                            <input type="checkbox" name="codeType" value="1-day" />
                            Un día de vigencia
                        </label>
                    </div>
                </div>
                <Button
                    onClick={onClose}
                    variant="contained"
                    startIcon={<CheckIcon />}
                    sx={{
                        color: '#ffff',
                        backgroundColor: "#00a8cc",
                        borderColor: "#00a8cc",
                        marginBottom: 3,
                        "&:hover": { borderColor: "#00a8ccCC", backgroundColor: "#00a8ccCC"},
                    }}
                >
                    Aceptar
                </Button>
            </div>
        </div>
    );
};

export default CodeModal;
