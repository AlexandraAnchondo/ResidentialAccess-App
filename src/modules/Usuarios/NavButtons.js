import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHouse,
    faReceipt,
    faUserGroup,
    faCar,
    faQrcode,
    faDoorOpen,
    faBell,
    faBox
} from "@fortawesome/free-solid-svg-icons"

const NavButtons = ({ isMobile, activeView, onClick, logout, isSidebarOpen }) => {
    const buttons = [
        { icon: faHouse, view: "home", buttonLabel: "Inicio", label: "Bienvenido (a)" },
        { icon: faReceipt, view: "historial", buttonLabel: "Historial", label: "Historial de visitas" },
        { icon: faQrcode, view: "visitantes", buttonLabel: "Visitantes", label: "Visitantes frecuentes" },
        { icon: faUserGroup, view: "residentes", buttonLabel: "Residentes", label: "Residentes" },
        { icon: faCar, view: "vehiculos", buttonLabel: "Vehículos", label: "Vehículos" },
        { icon: faBell, view: "comunicados", buttonLabel: "Comunicados", label: "Comunicados" },
        { icon: faBox, view: "prestamos", buttonLabel: "Préstamos", label: "Préstamos" }
    ]

    return (
        <>
            {buttons.map(({ icon, view, buttonLabel, label }) => (
                <button
                    key={view}
                    onClick={() => onClick(view, label)}
                    className={`nav-button ${activeView === view ? "active" : ""} ${isSidebarOpen ? "sidebar-button" : ""}`}
                >
                    <FontAwesomeIcon icon={icon} />
                    <span>{buttonLabel}</span>
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
