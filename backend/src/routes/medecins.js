import express from 'express';
import { getConnection } from '../db.js';
const router = express.Router();

// GET all médecins
router.get('/', async (_req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `SELECT * FROM MEDECIN ORDER BY ID_MEDECIN`
    );
    await conn.close();
    res.json(result.rows);
});

// GET un médecin par id
router.get('/:id', async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `SELECT * FROM MEDECIN WHERE ID_MEDECIN = :id`,
        [req.params.id]
    );
    await conn.close();
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
});

// POST créer un médecin
router.post('/', async (req, res) => {
    const { nom, specialite, telephone } = req.body;
    const conn = await getConnection();
    await conn.execute(
        `INSERT INTO MEDECIN
       (ID_MEDECIN, NOM, SPECIALITE, TELEPHONE)
     VALUES
       (SEQ_MEDECIN.NEXTVAL, :nom, :specialite, :telephone)`,
        { nom, specialite, telephone },
        { autoCommit: true }
    );
    await conn.close();
    res.status(201).json({ message: 'Médecin créé' });
});

// PUT modifier un médecin
router.put('/:id', async (req, res) => {
    const { nom, specialite, telephone } = req.body;
    const conn = await getConnection();
    const result = await conn.execute(
        `UPDATE MEDECIN
       SET NOM = :nom,
           SPECIALITE = :specialite,
           TELEPHONE = :telephone
     WHERE ID_MEDECIN = :id`,
        { nom, specialite, telephone, id: req.params.id },
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) return res.sendStatus(404);
    res.json({ message: 'Médecin modifié' });
});

// DELETE supprimer un médecin
router.delete('/:id', async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `DELETE FROM MEDECIN WHERE ID_MEDECIN = :id`,
        [req.params.id],
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) return res.sendStatus(404);
    res.json({ message: 'Médecin supprimé' });
});
router.delete('/:id', async (req, res) => {
    const id = +req.params.id;
    let conn;
    try {
        conn = await getConnection();

        // 1) supprimer tous les RDV liés à ce médecin
        await conn.execute(
            `DELETE FROM RENDEZVOUS WHERE ID_MEDECIN = :id`,
            [id]
        );

        // 2) supprimer le médecin
        const result = await conn.execute(
            `DELETE FROM MEDECIN WHERE ID_MEDECIN = :id`,
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
