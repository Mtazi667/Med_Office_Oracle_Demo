import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import client from '../api/client';

export default function RendezvousForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        date_rdv: '',
        heure_rdv: '',
        id_patient: '',
        id_medecin: ''
    });

    useEffect(() => {
        if (isEdit) {
            client.get(`/rendezvous/${id}`)
                .then(res => {
                    const { DATE_RDV, HEURE_RDV, ID_PATIENT, ID_MEDECIN } = res.data;
                    setForm({
                        date_rdv: DATE_RDV.slice(0, 10),
                        heure_rdv: HEURE_RDV,
                        id_patient: ID_PATIENT,
                        id_medecin: ID_MEDECIN
                    });
                })
                .catch(err => console.error(err));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await client.put(`/rendezvous/${id}`, form);
            } else {
                await client.post('/rendezvous', form);
            }
            navigate('/rendezvous');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
                {isEdit ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    name="date_rdv"
                    value={form.date_rdv}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    fullWidth
                    label="Heure (HH:MM)"
                    name="heure_rdv"
                    value={form.heure_rdv}
                    onChange={handleChange}
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
                <TextField
                    fullWidth
                    label="ID Médecin"
                    name="id_medecin"
                    type="number"
                    value={form.id_medecin}
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" type="submit">
                    {isEdit ? 'Enregistrer' : 'Créer'}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/rendezvous')}>
                    Annuler
                </Button>
            </form>
        </div>
    );
}
