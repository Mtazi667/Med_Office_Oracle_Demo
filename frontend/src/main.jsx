// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme.js';
import Layout from './Layout.jsx';

import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import MedecinList from './components/MedecinList';
import MedecinForm from './components/MedecinForm';
import RendezvousList from './components/RendezvousList';
import RendezvousForm from './components/RendezvousForm';
import TraitementList from './components/TraitementList';
import TraitementForm from './components/TraitementForm';
import TraceList from './components/TraceList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* landing → redirect to /patients */}
            <Route index element={<Navigate to="/patients" replace />} />

            {/* Patients */}
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/new" element={<PatientForm />} />
            <Route path="patients/:id/edit" element={<PatientForm />} />

            {/* Médecins */}
            <Route path="medecins" element={<MedecinList />} />
            <Route path="medecins/new" element={<MedecinForm />} />
            <Route path="medecins/:id/edit" element={<MedecinForm />} />

            {/* Rendez-vous */}
            <Route path="rendezvous" element={<RendezvousList />} />
            <Route path="rendezvous/new" element={<RendezvousForm />} />
            <Route path="rendezvous/:id/edit" element={<RendezvousForm />} />

            {/* Traitements */}
            <Route path="traitements" element={<TraitementList />} />
            <Route path="traitements/new" element={<TraitementForm />} />
            <Route path="traitements/:id/edit" element={<TraitementForm />} />

            {/* Trace */}
            <Route path="trace" element={<TraceList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
