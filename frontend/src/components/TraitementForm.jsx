import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import client from '../api/client';

export default function TraitementForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        description: '',
        date_prescription: '',
        id_patient: ''
    });

    useEffect(() => {
        if (isEdit) {
            client.get(`/traitements/${id}`)
                .then(res => {
                    const { DESCRIPTION, DATE_PRESCRIPTION, ID_PATIENT } = res.data;
                    setForm({
                        description: DESCRIPTION,
                        date_prescription: DATE_PRESCRIPTION.slice(0, 10),
                        id_patient: ID_PATIENT
                    });
                })
                .catch(err => console.error(err));
        }
    }, [id, isEdit]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (isEdit) {
                await client.put(`/traitements/${id}`, form);
            } else {
                await client.post('/traitements', form);
            }
            navigate('/traitements');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
                {isEdit ? 'Modifier le traitement' : 'Nouveau traitement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Date prescription"
                    type="date"
                    name="date_prescription"
                    value={form.date_prescription}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    fullWidth
                    label="ID Patient"
                    name="id_patient"
                    type="number"
                    value={form.id_patient}
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" type="submit">
                    {isEdit ? 'Enregistrer' : 'Créer'}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/traitements')}>
                    Annuler
                </Button>
            </form>
        </div>
    );
}
