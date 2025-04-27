// backend/src/routes/patients.js
import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

// GET all patients
router.get('/', async (_req, res) => {
    const conn = await getConnection();
    const { rows } = await conn.execute(
        `SELECT * FROM PATIENT ORDER BY ID_PATIENT`
    );
    await conn.close();
    res.json(rows);
});

// GET one patient
router.get('/:id', async (req, res) => {
    const conn = await getConnection();
    const { rows } = await conn.execute(
        `SELECT * FROM PATIENT WHERE ID_PATIENT = :id`,
        [+req.params.id]               // on force la conversion en number
    );
    await conn.close();
    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
});

// POST create patient
router.post('/', async (req, res) => {
    const { nom, prenom, date_naissance, sexe, adresse, telephone } = req.body;
    const conn = await getConnection();
    await conn.execute(
        `INSERT INTO PATIENT
       (ID_PATIENT, NOM, PRENOM, DATE_NAISSANCE, SEXE, ADRESSE, TELEPHONE)
     VALUES
       (SEQ_PATIENT.NEXTVAL, :nom, :prenom, TO_DATE(:dn,'YYYY-MM-DD'), :sexe, :adresse, :tel)`,
        { nom, prenom, dn: date_naissance, sexe, adresse, tel: telephone },
        { autoCommit: true }
    );
    await conn.close();
    res.status(201).json({ message: 'Patient créé' });
});

// PUT update patient
router.put('/:id', async (req, res) => {
    const { nom, prenom, adresse, telephone } = req.body;
    const conn = await getConnection();
    const result = await conn.execute(
        `UPDATE PATIENT
       SET NOM       = :nom,
           PRENOM    = :prenom,
           ADRESSE   = :adresse,
           TELEPHONE = :tel
     WHERE ID_PATIENT = :id`,
        {
            nom,
            prenom,
            adresse,
            tel: telephone,
            id: +req.params.id
        },
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) return res.sendStatus(404);
    res.json({ message: 'Patient modifié' });
});

// DELETE patient
router.delete('/:id', async (req, res) => {
    const id = +req.params.id;
    const conn = await getConnection();
    const result = await conn.execute(
        `DELETE FROM PATIENT WHERE ID_PATIENT = :id`,
        [id],
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) {
        return res.sendStatus(404);
    }
    // renvoyer 204 No Content pour signifier "OK, rien à renvoyer"
    res.sendStatus(204);
});

export default router;
