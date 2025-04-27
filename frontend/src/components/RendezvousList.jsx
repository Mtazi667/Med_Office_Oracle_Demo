// src/components/RendezvousList.jsx
import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RendezvousList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        client.get('/rendezvous')
            .then(res => setRows(res.data))
            .catch(err => console.error(err));
    }, []);

    const columns = [
        { field: 'ID_RDV', headerName: 'ID', width: 70 },
        { field: 'DATE_RDV', headerName: 'Date', width: 130 },
        { field: 'HEURE_RDV', headerName: 'Heure', width: 100 },
        { field: 'ID_PATIENT', headerName: 'Patient ID', width: 120 },
        { field: 'ID_MEDECIN', headerName: 'Médecin ID', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        component={Link}
                        to={`/rendezvous/${params.row.ID_RDV}/edit`}
                        size="small"
                    >
                        Éditer
                    </Button>
                    <Button
                        component={Link}
                        to="/rendezvous/new"
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
        <div className="flex justify-center p-4">
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Liste des rendez-vous
                </h2>
                <div className="h-[500px]">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={row => row.ID_RDV}
                        pageSize={5}
                    />
                </div>
            </div>
        </div>
    );
}
