import * as React from "react"
import Paper from "@mui/material/Paper"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import "../styles/DataGrid.css"

const paginationModel = { page: 0, pageSize: 5 }

export default function DataTable({ rows, columns, checkboxSelection = false, handleRowSelection }) {
    return (
        <div className="data-table-container">
            <Paper className="data-table">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 20, 30]}
                    checkboxSelection={checkboxSelection ? true : false}
                    filterMode="client" // Para filtrar en el cliente
                    slots={{ toolbar: GridToolbar }} // Agregar toolbar con filtros
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

