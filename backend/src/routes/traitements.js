import express from 'express';
import { getConnection } from '../db.js';
const router = express.Router();

// GET all traitements
router.get('/', async (_req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `SELECT * 
       FROM TRAITEMENT 
      ORDER BY DATE_PRESCRIPTION DESC`
    );
    await conn.close();
    res.json(result.rows);
});

// GET un traitement par id
router.get('/:id', async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `SELECT * 
       FROM TRAITEMENT 
      WHERE ID_TRAITEMENT = :id`,
        [req.params.id]
    );
    await conn.close();
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
});

// POST créer un traitement
router.post('/', async (req, res) => {
    const { description, date_prescription, id_patient } = req.body;
    const conn = await getConnection();
    await conn.execute(
        `INSERT INTO TRAITEMENT
       (ID_TRAITEMENT, DESCRIPTION, DATE_PRESCRIPTION, ID_PATIENT)
     VALUES
       (SEQ_TRAIT.NEXTVAL, :descr, TO_DATE(:dp,'YYYY-MM-DD'), :id_patient)`,
        { descr: description, dp: date_prescription, id_patient },
        { autoCommit: true }
    );
    await conn.close();
    res.status(201).json({ message: 'Traitement créé' });
});

// PUT modifier un traitement
router.put('/:id', async (req, res) => {
    const { description, date_prescription, id_patient } = req.body;
    const conn = await getConnection();
    const result = await conn.execute(
        `UPDATE TRAITEMENT
       SET DESCRIPTION       = :descr,
           DATE_PRESCRIPTION = TO_DATE(:dp,'YYYY-MM-DD'),
           ID_PATIENT        = :id_patient
     WHERE ID_TRAITEMENT = :id`,
        { descr: description, dp: date_prescription, id_patient, id: req.params.id },
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) return res.sendStatus(404);
    res.json({ message: 'Traitement modifié' });
});

// DELETE supprimer un traitement
router.delete('/:id', async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        `DELETE FROM TRAITEMENT WHERE ID_TRAITEMENT = :id`,
        [req.params.id],
        { autoCommit: true }
    );
    await conn.close();
    if (result.rowsAffected === 0) return res.sendStatus(404);
    res.json({ message: 'Traitement supprimé' });
});
router.delete('/:id', async (req, res) => {
    const id = +req.params.id;
    let conn;
    try {
      conn = await getConnection();
  
      const result = await conn.execute(
        `DELETE FROM TRAITEMENT WHERE ID_TRAITEMENT = :id`,
        [ id ]
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
