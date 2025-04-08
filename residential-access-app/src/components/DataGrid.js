import * as React from "react"
import Paper from "@mui/material/Paper"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import TextField from "@mui/material/TextField"
import "../styles/General/DataGrid.scss"

const paginationModel = { page: 0, pageSize: 5 }

export default function DataTable({ rows, columns, checkboxSelection = false, handleRowSelection }) {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [filteredRows, setFilteredRows] = React.useState(rows)

    // Función para manejar el cambio en la búsqueda
    const handleSearchChange = (event) => {
        const query = event.target.value
        setSearchQuery(query)

        // Filtrar las filas según el valor de búsqueda
        const filtered = rows.filter((row) =>
            columns.some((column) =>
                row[column.field] ? row[column.field].toString().toLowerCase().includes(query.toLowerCase()) : false
            )
        )
        setFilteredRows(filtered)
    }

    return (
        <div className="data-table-container">
            <Paper className="data-table">
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 20, 30]}
                    checkboxSelection={checkboxSelection}
                    filterMode="client" // Para filtrar en el cliente
                    slots={{
                        toolbar: GridToolbar // Puedes seguir usando GridToolbar para otras funcionalidades
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true
                        }
                    }}
                    disableRowSelectionOnClick={true}
                    sx={{
                        border: 0
                    }}
                    columnVisibilityModel={{
                        id: false
                    }}
                    onRowSelectionModelChange={handleRowSelection}
                />
            </Paper>
        </div>
    )
}