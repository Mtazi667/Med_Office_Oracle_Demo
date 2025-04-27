import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MedecinList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        client.get('/medecins')
            .then(res => setRows(res.data))
            .catch(err => console.error(err));
    }, []);

    const columns = [
        { field: 'ID_MEDECIN', headerName: 'ID', width: 70 },
        { field: 'NOM', headerName: 'Nom', width: 150 },
        { field: 'SPECIALITE', headerName: 'Spécialité', width: 150 },
        { field: 'TELEPHONE', headerName: 'Téléphone', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button component={Link} to={`/medecins/${params.row.ID_MEDECIN}/edit`} size="small">
                        Éditer
                    </Button>
                    <Button component={Link} to="/medecins/new" size="small" style={{ marginLeft: 8 }}>
                        Nouveau
                    </Button>
                </>
            )
        }
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Liste des médecins</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={row => row.ID_MEDECIN}
                    pageSize={5}
                />
            </div>
        </div>
    );
}
