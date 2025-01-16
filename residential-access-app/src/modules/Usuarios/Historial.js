import React from "react";
import "../../styles/Usuarios/Historial.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faList } from "@fortawesome/free-solid-svg-icons"; 

const Historial = () => {
    // Datos de ejemplo
    const historialData = [
        {
            fechaIngreso: "08 - 01 - 2025",
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
        },
        {
            fechaIngreso: "05 - 01 - 2025",
            nombre: "Benito",
            apellido: "Juarez",
            telefono: "686-453-43-76",
            placas: "ORALE456H",
            modelo: "Honda Civic",
        },
        {
            fechaIngreso: "05 - 01 - 2025",
            nombre: "Benito",
            apellido: "Juarez",
            telefono: "686-453-43-76",
            placas: "ORALE456H",
            modelo: "Honda Civic",
        },
        {
            fechaIngreso: "05 - 01 - 2025",
            nombre: "Benito",
            apellido: "Juarez",
            telefono: "686-453-43-76",
            placas: "ORALE456H",
            modelo: "Honda Civic",
        },
    ];

    return (
        <>
            {historialData.length === 0 ? (
                <div className="no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ) : (
                <table className="historial-table">
                    <thead>
                        <tr>
                            <th>Fecha Ingreso</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Placas</th>
                            <th>Modelo del auto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historialData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.fechaIngreso}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.telefono}</td>
                                <td>{item.placas}</td>
                                <td>{item.modelo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Historial;
