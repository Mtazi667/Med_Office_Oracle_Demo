// backend/src/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import patientsRouter from './routes/patients.js';
import medecinsRouter from './routes/medecins.js';
import rendezvousRouter from './routes/rendezvous.js';
import traitementsRouter from './routes/traitements.js';
import traceRouter from './routes/trace.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Health-check rapide
app.get('/', (_req, res) => {
    res.send('🩺 API SMI1002 en marche');
});

// Routers
app.use('/api/patients', patientsRouter);
app.use('/api/medecins', medecinsRouter);
app.use('/api/rendezvous', rendezvousRouter);
app.use('/api/traitements', traitementsRouter);
app.use('/api/trace', traceRouter);

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ API running on port ${PORT}`);
});
