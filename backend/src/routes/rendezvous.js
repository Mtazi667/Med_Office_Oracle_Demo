import express from 'express';
import { getConnection } from '../db.js';
const router = express.Router();

// GET all rendez-vous
router.get('/', async (_req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `SELECT * 
       FROM RENDEZVOUS 
      ORDER BY DATE_RDV, HEURE_RDV`
    );
    await conn.close();
    res.json(result.rows);
});

// GET un rendez-vous par id
router.get('/:id', async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `SELECT * 
       FROM RENDEZVOUS 
      WHERE ID_RDV = :id`,
        [req.params.id]
    );
    await conn.close();
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
});

// POST créer un rendez-vous
router.post('/', async (req, res) => {
    const { date_rdv, heure_rdv, id_patient, id_medecin } = req.body;
    const conn = await getConnection();
    await conn.execute(
        `INSERT INTO RENDEZVOUS
       (ID_RDV, DATE_RDV, HEURE_RDV, ID_PATIENT, ID_MEDECIN)
     VALUES
       (SEQ_RDV.NEXTVAL,
        TO_DATE(:date_rdv,'YYYY-MM-DD'),
        :heure_rdv,
        :id_patient,
        :id_medecin)`,
        { date_rdv, heure_rdv, id_patient, id_medecin },
        { autoCommit: true }
    );
    await conn.close();
    res.status(201).json({ message: 'Rendez-vous créé' });
});

// PUT modifier un rendez-vous
router.put('/:id', async (req, res) => {
    const { date_rdv, heure_rdv, id_patient, id_medecin } = req.body;
    const conn = await getConnection();
    const result = await conn.execute(
        `UPDATE RENDEZVOUS
       SET DATE_RDV   = TO_DATE(:date_rdv,'YYYY-MM-DD'),
           HEURE_RDV  = :heure_rdv,
           ID_PATIENT = :id_patient,
           ID_MEDECIN = :id_medecin
     WHERE ID_RDV = :id`,
        { date_rdv, heure_rdv, id_patient, id_medecin, id: req.params.id },
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) return res.sendStatus(404);
    res.json({ message: 'Rendez-vous modifié' });
});

// DELETE supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `DELETE FROM RENDEZVOUS WHERE ID_RDV = :id`,
        [req.params.id],
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) return res.sendStatus(404);
    res.json({ message: 'Rendez-vous supprimé' });
});
router.delete('/:id', async (req, res) => {
    const id = +req.params.id;
    let conn;
    try {
        conn = await getConnection();

        const result = await conn.execute(
            `DELETE FROM RENDEZVOUS WHERE ID_RDV = :id`,
            [id]
        );

        await conn.commit();

        if (result.rowsAffected === 0) {
            return res.sendStatus(404);
        }
        res.sendStatus(204);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});
export default router;
