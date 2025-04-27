// src/components/MedecinList.jsx
import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MedecinList() {
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        try {
            const res = await client.get('/medecins');
            setRows(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce médecin ?')) return;
        try {
            await client.delete(`/medecins/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la suppression');
        }
    };

    const columns = [
        { field: 'ID_MEDECIN', headerName: 'ID', width: 80 },
        { field: 'NOM', headerName: 'Nom', width: 200 },
        { field: 'SPECIALITE', headerName: 'Spécialité', width: 200 },
        { field: 'TELEPHONE', headerName: 'Téléphone', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 290,
            renderCell: (params) => (
                <>
                    <Button
                        component={Link}
                        to={`/medecins/${params.row.ID_MEDECIN}/edit`}
                        size="small"
                    >
                        Éditer
                    </Button>
                    <Button
                        component={Link}
                        to="/medecins/new"
                        size="small"
                        sx={{ ml: 1 }}
                    >
                        Nouveau
                    </Button>
                    <Button
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => handleDelete(params.row.ID_MEDECIN)}
                    >
                        Supprimer
                    </Button>
                </>
            )
        }
    ];

    return (
        <Box p={4}>
            <Typography variant="h4" mb={2}>Liste des médecins</Typography>
            <Box sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.ID_MEDECIN}
                    pageSize={5}
                />
            </Box>
        </Box>
    );
}
