import React, { useState, useEffect } from "react"
import "../../styles/Administrador/Guardias.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"
import { Delete as DeleteIcon, Lock as LockIcon, LockOpen as LockOpenIcon } from "@mui/icons-material"
import DataTable from "../../components/DataGrid"
import { IconButton } from "@mui/material"
import DeleteModal from "../../components/modals/DeleteModal"

const Guardias = () => {
    const columns = [
        { field: "id", headerAlign: "center", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "nombre", headerAlign: "center", headerName: "Nombre", flex: 1, minWidth: 150 },
        { field: "apellido", headerAlign: "center", headerName: "Apellido", flex: 1, minWidth: 150 },
        { field: "telefono", headerAlign: "center", headerName: "Teléfono", flex: 1, minWidth: 150 },
        { field: "correo", headerAlign: "center", headerName: "Correo", flex: 1, minWidth: 200 },
        { field: "rfc", headerAlign: "center", headerName: "RFC", flex: 1, minWidth: 50 },
        {
            field: "action",
            headerName: "Acciones",
            flex: 1,
            minWidth: 50,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleToggleBlock(params.row.id)} color="primary">
                        {params.row.bloqueado ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                </>
            )
        }
    ]

    const [guardias, setGuardias] = useState([
        { id: 1, nombre: "Juan", apellido: "Perez", telefono: "555-555-5555", correo: "juan@example.com", rfc: "1234567890", bloqueado: false, principal: true },
        { id: 2, nombre: "Maria", apellido: "Garcia", telefono: "666-666-6666", correo: "maria@example.com", rfc: "9876543210", bloqueado: false },
        { id: 3, nombre: "Pedro", apellido: "Lopez", telefono: "777-777-7777", correo: "pedro@example.com", rfc: "0987654321", bloqueado: false },
        { id: 4, nombre: "Sofia", apellido: "Martinez", telefono: "888-888-8888", correo: "sofia@example.com", rfc: "1234567890", bloqueado: true }
    ])

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState(null)

    useEffect(() => {
        if (showDeleteModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    })

    const handleToggleBlock = (id) => {
        setGuardias((prev) => prev.map((res) => res.id === id ? { ...res, bloqueado: !res.bloqueado } : res))
    }

    const handleDelete = () => {
        setGuardias((prev) => prev.filter((res) => res.id !== indexToDelete))
        setShowDeleteModal(false)
    }

    const handleDeleteClick = (id) => {
        setShowDeleteModal(true)
        setIndexToDelete(id)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }

    return (
        <div className="guardias-container">
            {guardias.length === 0 ? (
                <div className="guardias-no-data">
                    <FontAwesomeIcon icon={faList} className="icon-placeholder" />
                    <p>No hay datos que mostrar</p>
                </div>
            ) : (
                <DataTable
                    rows={guardias}
                    columns={columns}
                />
            )}

            <DeleteModal
                showDeleteModal={showDeleteModal}
                onCloseDeleteModal={handleCloseDeleteModal}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default Guardias