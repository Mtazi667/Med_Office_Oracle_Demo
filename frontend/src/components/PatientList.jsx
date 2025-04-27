import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PatientList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        client.get('/patients')
            .then(res => setRows(res.data))
            .catch(err => console.error(err));
    }, []);

    const columns = [
        { field: 'ID_PATIENT', headerName: 'ID', width: 70 },
        { field: 'NOM', headerName: 'Nom', width: 130 },
        { field: 'PRENOM', headerName: 'Prénom', width: 130 },
        { field: 'ADRESSE', headerName: 'Adresse', width: 200 },
        { field: 'TELEPHONE', headerName: 'Téléphone', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button component={Link} to={`/patients/${params.row.ID_PATIENT}/edit`}>Éditer</Button>
            )
        }
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Liste des patients</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.ID_PATIENT}
                    pageSize={5}
                />
            </div>
        </div>
    );
}