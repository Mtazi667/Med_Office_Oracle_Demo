import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PatientList() {
    const [rows, setRows] = useState([]);

    const fetchRows = () => {
        client.get('/patients')
            .then(res => setRows(res.data))
            .catch(console.error);
    };

    useEffect(fetchRows, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce patient ?")) return;
        try {
            await client.delete(`/patients/${id}`);
            fetchRows();
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        { field: 'ID_PATIENT', headerName: 'ID', width: 80 },
        { field: 'NOM', headerName: 'Nom', width: 150 },
        { field: 'PRENOM', headerName: 'Prénom', width: 150 },
        { field: 'ADRESSE', headerName: 'Adresse', width: 300 },
        { field: 'TELEPHONE', headerName: 'Téléphone', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 240,
            renderCell: params => (
                <>
                    <Button
                        component={Link}
                        to={`/patients/${params.row.ID_PATIENT}/edit`}
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        Éditer
                    </Button>
                    <Button
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.ID_PATIENT)}
                    >
                        Supprimer
                    </Button>
                </>
            )
        }
    ];

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h2">Liste des patients</Typography>
                <Button component={Link} to="/patients/new" variant="contained" color="primary">
                    Nouveau Patient
                </Button>
            </Box>
            <Box sx={{ height: 450, width: '100%', mx: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={r => r.ID_PATIENT}
                    pageSize={10}
                />
            </Box>
        </Box>
    );
}
