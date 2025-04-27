// src/components/RendezvousList.jsx
import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RendezvousList() {
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        try {
            const res = await client.get('/rendezvous');
            setRows(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce rendez-vous ?')) return;
        try {
            await client.delete(`/rendezvous/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la suppression');
        }
    };

    const columns = [
        { field: 'ID_RDV', headerName: 'ID', width: 80 },
        { field: 'DATE_RDV', headerName: 'Date', width: 150 },
        { field: 'HEURE_RDV', headerName: 'Heure', width: 120 },
        { field: 'ID_PATIENT', headerName: 'Patient ID', width: 120 },
        { field: 'ID_MEDECIN', headerName: 'Médecin ID', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 290,
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
                        sx={{ ml: 1 }}
                    >
                        Nouveau
                    </Button>
                    <Button
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => handleDelete(params.row.ID_RDV)}
                    >
                        Supprimer
                    </Button>
                </>
            )
        }
    ];

    return (
        <Box p={4}>
            <Typography variant="h4" mb={2}>Liste des rendez-vous</Typography>
            <Box sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.ID_RDV}
                    pageSize={5}
                />
            </Box>
        </Box>
    );
}
