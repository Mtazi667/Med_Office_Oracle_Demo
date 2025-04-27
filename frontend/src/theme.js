// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#4caf50' },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
    },
    typography: {
        h2: { fontSize: '1.75rem', fontWeight: 600 },
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                    color: '#fff',
                },
                columnHeaders: {
                    backgroundColor: '#1f1f1f',
                },
                row: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#181818',
                    },
                },
            },
        },
    },
});

export default theme;
