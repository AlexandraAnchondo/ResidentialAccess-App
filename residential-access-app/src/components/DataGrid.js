import * as React from 'react';
import Paper from '@mui/material/Paper';
import {DataGrid} from '@mui/x-data-grid';
import "../styles/DataGrid.css";

const paginationModel = {page: 0, pageSize: 5};

export default function DataTable({ rows, columns }) {
    return (
        <div className="data-table-container">
            <Paper className="data-table">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{
                        border: 0,
                    }}
                />
            </Paper>
        </div>
    );
}
