// src/Layout.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

const paths = [
  { to: '/patients', label: 'Patients' },
  { to: '/medecins', label: 'Médecins' },
  { to: '/rendezvous', label: 'RDV' },
  { to: '/traitements', label: 'Traitements' },
  { to: '/trace', label: 'Trace' },
];

export default function Layout() {
  return (
    <>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/patients"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
              MedOffice
            </Typography>
            {paths.map(p => (
              <Button
                key={p.to}
                component={RouterLink}
                to={p.to}
                color="inherit"
                size="small"
                sx={{ textTransform: 'none', ml: 2 }}
              >
                {p.label}
              </Button>
            ))}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 64px)', py: 4 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
