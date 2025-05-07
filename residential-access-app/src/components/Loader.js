import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import "../styles/General/Loader.scss"

const Loader = ({ loadingMessage = "" }) => {
    return (
        <div className="loading-spinner">
            <React.Fragment>
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0e1725" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress
                    size={80}
                    thickness={3}
                    sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
                />
                <p className="loading-captions">{loadingMessage === "" ? "Cargando..." : loadingMessage}</p>
            </React.Fragment>
        </div>
    )
}

export default Loader