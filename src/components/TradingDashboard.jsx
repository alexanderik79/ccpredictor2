// src/components/TradingDashboard.jsx

import React, { useCallback } from 'react';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import InputForm from './InputForm';
import ResultsDisplay from './ResultsDisplay';
import { useTradingAnalysis } from '../hooks/useTradingAnalysis'; // Импорт из .js файла

const TradingDashboard = () => {
    const { 
        symbol, 
        setSymbol, 
        interval, 
        setInterval, 
        data, 
        loading, 
        error, 
        setShouldFetch 
    } = useTradingAnalysis('BTCUSDT', '4h');

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (symbol && interval) {
            setShouldFetch(true); 
        }
    }, [symbol, interval, setShouldFetch]);

    return (
        <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Crypto Trading Dashboard
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Real-time technical analysis for {symbol} on the {interval} chart.
                </Typography>
            </Box>

            {/* Input Form */}
            <InputForm
                symbol={symbol}
                setSymbol={setSymbol}
                interval={interval}
                setInterval={setInterval}
                loading={loading}
                handleSubmit={handleSubmit}
            />

            {/* Loading / Error / Results Display */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {loading && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                        <CircularProgress size={60} color="primary" />
                        <Typography variant="h6" sx={{ mt: 2 }}>Loading market data...</Typography>
                    </Box>
                )}

                {!loading && data && !error && (
                    <ResultsDisplay data={data} />
                )}
                
                {!loading && !data && !error && (
                    <Alert severity="info" sx={{ mt: 4 }}>
                         Enter a crypto symbol (e.g., ETHUSDT) and interval, then click "Get Analysis" to start.
                    </Alert>
                )}
            </Box>
        </Container>
    );
};

export default TradingDashboard;