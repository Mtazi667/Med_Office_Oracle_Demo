// src/components/TraitementList.jsx
import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TraitementList() {
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        try {
            const res = await client.get('/traitements');
            setRows(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce traitement ?')) return;
        try {
            await client.delete(`/traitements/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la suppression');
        }
    };

    const columns = [
        { field: 'ID_TRAITEMENT', headerName: 'ID', width: 80 },
        { field: 'DESCRIPTION', headerName: 'Description', width: 250 },
        { field: 'DATE_PRESCRIPTION', headerName: 'Date', width: 130 },
        { field: 'ID_PATIENT', headerName: 'Patient ID', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 290,
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
                        sx={{ ml: 1 }}
                    >
                        Nouveau
                    </Button>
                    <Button
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => handleDelete(params.row.ID_TRAITEMENT)}
                    >
                        Supprimer
                    </Button>
                </>
            )
        }
    ];

    return (
        <Box p={4}>
            <Typography variant="h4" mb={2}>Liste des traitements</Typography>
            <Box sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.ID_TRAITEMENT}
                    pageSize={5}
                />
            </Box>
        </Box>
    );
}
