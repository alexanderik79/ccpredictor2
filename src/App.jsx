// src/App.jsx

import React from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import TradingDashboard from './components/TradingDashboard';
// Импорт из нового .js файла
import { darkTheme } from './theme/ThemeConfig'; 

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
        {/* Сброс CSS для обеспечения согласованности стилей */}
        <CssBaseline />
        
        {/* Box для центрирования на весь экран */}
        <Box 
            sx={{
                minHeight: '100vh', 
                width: '100%',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'flex-start', 
                bgcolor: 'background.default' 
            }}
        >
            <TradingDashboard />
        </Box>
    </ThemeProvider>
  );
}

export default App;