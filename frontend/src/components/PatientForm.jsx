import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import client from '../api/client';

export default function PatientForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        sexe: '',
        adresse: '',
        telephone: ''
    });

    useEffect(() => {
        if (isEdit) {
            client.get(`/patients/${id}`)
                .then(res => {
                    const { NOM, PRENOM, DATE_NAISSANCE, SEXE, ADRESSE, TELEPHONE } = res.data;
                    setForm({
                        nom: NOM,
                        prenom: PRENOM,
                        date_naissance: DATE_NAISSANCE.slice(0, 10),
                        sexe: SEXE,
                        adresse: ADRESSE,
                        telephone: TELEPHONE
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
                await client.put(`/patients/${id}`, form);
            } else {
                await client.post('/patients', form);
            }
            navigate('/patients');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
                {isEdit ? 'Modifier le patient' : 'Nouveau patient'}
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
                    label="Prénom"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Date de naissance"
                    type="date"
                    name="date_naissance"
                    value={form.date_naissance}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    fullWidth
                    label="Sexe"
                    name="sexe"
                    value={form.sexe}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Adresse"
                    name="adresse"
                    value={form.adresse}
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
                <Button variant="outlined" onClick={() => navigate('/patients')}>
                    Annuler
                </Button>
            </form>
        </div>
    );
}
