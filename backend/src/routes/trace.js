// backend/src/routes/trace.js
import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

// GET all trace entries
router.get('/', async (_req, res) => {
  const conn = await getConnection();
  const { rows } = await conn.execute(
    `SELECT *
       FROM TRACE
      ORDER BY ID_TRACE`
  );
  await conn.close();
  res.json(rows);
});

export default router;
