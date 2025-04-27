import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';

export default function TraceList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        client.get('/trace')
            .then(res => setRows(res.data))
            .catch(console.error);
    }, []);

    const columns = [
        { field: 'ID_TRACE', headerName: 'ID', width: 80 },
        { field: 'DATE_ACTION', headerName: 'Date/Heure', width: 200 },
        { field: 'UTILISATEUR', headerName: 'Utilisateur', width: 150 },
        { field: 'ACTION', headerName: 'Action', width: 120 },
        { field: 'TABLE_CONCERNEE', headerName: 'Table', width: 150 },
        { field: 'DESCRIPTION', headerName: 'Description', width: 250 }
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Historique des actions</h2>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={r => r.ID_TRACE}
                    pageSize={10}
                />
            </div>
        </div>
    );
}
