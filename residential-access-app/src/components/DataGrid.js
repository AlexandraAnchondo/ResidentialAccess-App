import * as React from "react"
import Paper from "@mui/material/Paper"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { esES } from "@mui/x-data-grid/locales"
import "../styles/General/DataGrid.scss"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"

const paginationModel = { page: 0, pageSize: 5 }

export default function DataTable({ rows, columns, checkboxSelection = false, handleRowSelection }) {
    const StyledGridOverlay = styled("div")(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        "& .no-rows-primary": {
            fill: "#93e1f3",
            ...theme.applyStyles("light", {
                fill: "#93e1f3"
            })
        },
        "& .no-rows-secondary": {
            fill: "#1D2126",
            ...theme.applyStyles("light", {
                fill: "#93e1f3"
            })
        }
    }))

    function CustomNoRowsOverlay() {
        return (
            <StyledGridOverlay>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={70}
                    viewBox="0 0 452 257"
                    aria-hidden
                    focusable="false"
                >
                    <path
                        className="no-rows-primary"
                        d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
                    />
                    <path
                        className="no-rows-primary"
                        d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
                    />
                    <path
                        className="no-rows-primary"
                        d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
                    />
                    <path
                        className="no-rows-secondary"
                        d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
                    />
                </svg>
                <Box sx={{ mt: 2 }}>No hay registros</Box>
            </StyledGridOverlay>
        )
    }

    return (
        <div className="data-table-container">
            <Paper className="data-table">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 20, 30]}
                    checkboxSelection={checkboxSelection}
                    filterMode="client" // Para filtrar en el cliente
                    slots={{
                        toolbar: GridToolbar, // Agregar toolbar con filtros
                        loadingOverlay: {
                            variant: "skeleton"
                        },
                        noRowsOverlay: CustomNoRowsOverlay
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