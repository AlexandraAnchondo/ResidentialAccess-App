import React from "react";
import "../../styles/Usuarios/Historial.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faList } from "@fortawesome/free-solid-svg-icons"; 

const Historial = () => {
    // Datos de ejemplo
    const historialData = [
        {
            ingreso: "08 - 01 - 2025",
            nombre: "Alexandra",
            apellido: "Anchondo",
            telefono: "686-420-49-24",
            placas: "ORALE123J",
            modelo: "Hyundai Sonata",
            color: "Rojo",
            tipo: "Visita",
            estatus: "Terminada",
            salida: "08 - 01 - 2025"
        },
        {
            ingreso: "05 - 01 - 2025",
            nombre: "Benito",
            apellido: "Juarez",
            telefono: "686-453-43-76",
            placas: "ORALE456H",
            modelo: "Honda Civic",
            color: "Azul",
            tipo: "Visita",
            estatus: "Activa",
        },
        {
            ingreso: "05 - 01 - 2025",
            nombre: "Benito",
            apellido: "Juarez",
            telefono: "686-453-43-76",
            placas: "ORALE456H",
            modelo: "Honda Civic",
            color: "Azul",
            tipo: "Proveedor",
            estatus: "Terminada",
            salida: "08 - 01 - 2025"
        },
        {
            ingreso: "05 - 01 - 2025",
            nombre: "Benito",
            apellido: "Juarez",
            telefono: "686-453-43-76",
            placas: "ORALE456H",
            modelo: "Honda Civic",
            color: "Blanco",
            tipo: "Proveedor",
            estatus: "Activa",
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
                            <th>Ingreso</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Placas</th>
                            <th>Modelo del auto</th>
                            <th>Color</th>
                            <th>Tipo</th>
                            <th>Estatus</th>
                            <th>Salida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historialData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ingreso}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.telefono}</td>
                                <td>{item.placas}</td>
                                <td>{item.modelo}</td>
                                <td>{item.color}</td>
                                <td>{item.tipo}</td>
                                <td>{item.estatus}</td>
                                <td>{item.salida ? item.salida : "No registrada"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Historial;
