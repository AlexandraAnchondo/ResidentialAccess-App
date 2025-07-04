import React from "react"
import "../styles/General/Loader.scss"

const Loader = ({ loadingMessage = "" }) => {
    return (
        <div className="loading-spinner">
            <div className="loader"></div>
            <p className="loading-captions">{loadingMessage === "" ? "Cargando..." : loadingMessage}</p>
        </div>
    )
}

export default Loader