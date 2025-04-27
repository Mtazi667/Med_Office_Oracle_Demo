import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TraitementList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        client.get('/traitements')
            .then(res => setRows(res.data))
            .catch(err => console.error(err));
    }, []);

    const columns = [
        { field: 'ID_TRAITEMENT', headerName: 'ID', width: 80 },
        { field: 'DESCRIPTION', headerName: 'Description', width: 250 },
        { field: 'DATE_PRESCRIPTION', headerName: 'Date', width: 130 },
        { field: 'ID_PATIENT', headerName: 'Patient ID', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        component={Link}
                        to={`/traitements/${params.row.ID_TRAITEMENT}/edit`}
                        size="small"
                    >
                        Éditer
                    </Button>
                    <Button
                        component={Link}
                        to="/traitements/new"
                        size="small"
                        style={{ marginLeft: 8 }}
                    >
                        Nouveau
                    </Button>
                </>
            )
        }
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Liste des traitements</h2>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={row => row.ID_TRAITEMENT}
                    pageSize={5}
                />
            </div>
        </div>
    );
}
