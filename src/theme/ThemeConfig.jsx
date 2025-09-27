// src/theme/ThemeConfig.js

import { createTheme } from '@mui/material';
import { TrendingUp, TrendingDown, Schedule, Warning } from '@mui/icons-material';
import React from 'react'; // Нужен для JSX в getSignalIcon

// --- DARK THEME SETUP ---

export const darkTheme = createTheme({
    palette: {
        mode: 'dark', 
        primary: {
            main: '#00e676', 
        },
        secondary: {
            main: '#ff1744', 
        },
        background: {
            default: '#121212', 
            paper: '#1e1e1e', 
        },
        success: {
            main: '#00e676', 
            dark: '#00c853', 
        },
        error: {
            main: '#ff1744', 
            dark: '#d50000', 
        },
        warning: {
            main: '#ffea00', 
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 500 },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12, 
                    transition: 'box-shadow 0.3s',
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(0, 230, 118, 0.2)', 
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 8,
                },
            }
        }
    }
});

// --- Utility Functions ---

export const formatPrice = (price) => {
    if (price === null || price === undefined) return '—';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    }).format(price);
};

export const getSignalColor = (signal) => {
    switch (signal) {
        case 'STRONG_BUY': return darkTheme.palette.success.dark;
        case 'BUY': return darkTheme.palette.success.main;
        case 'HOLD': return darkTheme.palette.warning.main;
        case 'SELL': return darkTheme.palette.error.main;
        case 'STRONG_SELL': return darkTheme.palette.error.dark;
        default: return darkTheme.palette.text.secondary;
    }
};

export const getSignalIcon = (signal) => {
    switch (signal) {
        case 'STRONG_BUY': return <TrendingUp sx={{ fontSize: 40 }} />;
        case 'BUY': return <TrendingUp sx={{ fontSize: 28 }} />;
        case 'HOLD': return <Schedule sx={{ fontSize: 28 }} />; 
        case 'SELL': return <TrendingDown sx={{ fontSize: 28 }} />;
        case 'STRONG_SELL': return <TrendingDown sx={{ fontSize: 40 }} />;
        default: return <Warning sx={{ fontSize: 28 }} />;
    }
};