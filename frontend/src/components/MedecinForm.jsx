import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import client from '../api/client';

export default function MedecinForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        nom: '',
        specialite: '',
        telephone: ''
    });

    useEffect(() => {
        if (isEdit) {
            client.get(`/medecins/${id}`)
                .then(res => {
                    const { NOM, SPECIALITE, TELEPHONE } = res.data;
                    setForm({ nom: NOM, specialite: SPECIALITE, telephone: TELEPHONE });
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
                await client.put(`/medecins/${id}`, form);
            } else {
                await client.post('/medecins', form);
            }
            navigate('/medecins');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
                {isEdit ? 'Modifier le médecin' : 'Nouveau médecin'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    fullWidth
                    label="Nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Spécialité"
                    name="specialite"
                    value={form.specialite}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Téléphone"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                />
                <Button variant="contained" type="submit">
                    {isEdit ? 'Enregistrer' : 'Créer'}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/medecins')}>
                    Annuler
                </Button>
            </form>
        </div>
    );
}
