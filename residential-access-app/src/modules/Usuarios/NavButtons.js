import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHouse,
    faReceipt,
    faUserGroup,
    faCar,
    faQrcode,
    faDoorOpen
} from "@fortawesome/free-solid-svg-icons"

const NavButtons = ({ isMobile, activeView, onClick, logout, isSidebarOpen }) => {
    const buttons = [
        { icon: faHouse, view: "home", label: "Inicio" },
        { icon: faReceipt, view: "historial", label: "Historial" },
        { icon: faQrcode, view: "visitantes", label: "Visitantes" },
        { icon: faUserGroup, view: "residentes", label: "Residentes" },
        { icon: faCar, view: "vehiculos", label: "Autos" },
    ]

    return (
        <>
            {buttons.map(({ icon, view, label }) => (
                <button
                    key={view}
                    onClick={() => onClick(view)}
                    className={`nav-button ${activeView === view ? "active" : ""} ${isSidebarOpen ? "sidebar-button" : ""}`}
                >
                    <FontAwesomeIcon icon={icon} />
                    <span>{label}</span>
                </button>
            ))}
            <button
                onClick={logout}
                className={`nav-button logout ${isSidebarOpen ? "sidebar-button" : ""}`}
            >
                <FontAwesomeIcon icon={faDoorOpen} />
                <span>{isMobile ? "Cerrar Sesión" : "Salir"}</span>
            </button>
        </>
    )
}

export default NavButtons
