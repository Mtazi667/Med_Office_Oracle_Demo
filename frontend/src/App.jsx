// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import MedecinList from './components/MedecinList';
import MedecinForm from './components/MedecinForm';
import RendezvousList from './components/RendezvousList';
import RendezvousForm from './components/RendezvousForm';
import TraitementList from './components/TraitementList';
import TraitementForm from './components/TraitementForm';
import TraceList from './components/TraceList';


export default function App() {
  return (
    <BrowserRouter>
        <nav className="flex justify-center items-center gap-6 bg-gray-100 py-4">
          <Link to="/patients">Patients</Link>
          <Link to="/patients/new">+ Patient</Link>
          <span className="border-l h-5"></span>
          <Link to="/medecins">Médecins</Link>
          <Link to="/medecins/new">+ Médecin</Link>
          <span className="border-l h-5"></span>
          <Link to="/rendezvous">RDV</Link>
          <Link to="/rendezvous/new">+ RDV</Link>
          <span className="border-l h-5"></span>
          <Link to="/traitements">Traitements</Link>
          <Link to="/traitements/new">+ Traitement</Link>
          <Link to="/trace">Trace</Link>
        </nav>
        <main className="p-4">
          <Routes>
            {/* Patients */}
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/new" element={<PatientForm />} />
            <Route path="/patients/:id/edit" element={<PatientForm />} />
            {/* Médecins */}
            <Route path="/medecins" element={<MedecinList />} />
            <Route path="/medecins/new" element={<MedecinForm />} />
            <Route path="/medecins/:id/edit" element={<MedecinForm />} />
            {/* Rendez-vous */}
            <Route path="/rendezvous" element={<RendezvousList />} />
            <Route path="/rendezvous/new" element={<RendezvousForm />} />
            <Route path="/rendezvous/:id/edit" element={<RendezvousForm />} />
            {/* Traitements */}
            <Route path="/traitements" element={<TraitementList />} />
            <Route path="/traitements/new" element={<TraitementForm />} />
            <Route path="/traitements/:id/edit" element={<TraitementForm />} />
            <Route path="/trace" element={<TraceList />} />
          </Routes>
        </main>
    </BrowserRouter>
  );
}
