// src/components/ResultsDisplay.jsx

import React from 'react';
import { Typography, Box, Card, CardContent, Stack, styled, Paper } from '@mui/material';
import { TrendingUp, TrendingDown, Bolt } from '@mui/icons-material';
// Убедитесь, что ThemeConfig.jsx экспортирует эти утилиты и тему
import { darkTheme, formatPrice, getSignalColor, getSignalIcon } from '../theme/ThemeConfig.jsx'; 

// --- Стилизованные элементы ---

const IndicatorHeader = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: theme.palette.text.secondary,
}));

const SignalCell = styled('td')(({ signal }) => ({
    padding: '12px',
    fontWeight: 'bold',
    color: getSignalColor(signal),
    backgroundColor: signal && signal.includes('STRONG') ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    textAlign: 'left'
}));


// --- Компоненты рендеринга карточек ---

const renderSignalCard = (title, signal) => {
    
    // Защита от undefined/null
    if (!signal) {
        return (
            <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '30%' }, height: '100%' }}>
                <Card sx={{ 
                    height: '100%', 
                    background: darkTheme.palette.background.paper, 
                    color: 'text.secondary', 
                    p: 1, // Уменьшаем padding, чтобы CardContent был более контролируемым
                    boxShadow: 4 
                }}>
                    <CardContent 
                        // *** ФИКСАЦИЯ ВЫСОТЫ: minHeight и display: 'flex' для центрирования ***
                        sx={{ minHeight: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: '16px !important' }}
                    > 
                        <Typography variant="caption">{title}</Typography>
                        <Typography variant="h4" component="div" fontWeight="bold">N/A</Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }
    
    const gradient = signal.includes('BUY') 
        ? 'linear-gradient(135deg, #00c853 0%, #00e676 100%)' 
        : signal.includes('SELL') 
        ? 'linear-gradient(135deg, #d50000 0%, #ff1744 100%)' 
        : 'linear-gradient(135deg, #ffea00 0%, #ffc400 100%)';
    
    const textColor = signal.includes('HOLD') ? darkTheme.palette.grey[900] : 'white';

    return (
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '30%' }, height: '100%' }}> 
            <Card 
                sx={{ 
                    height: '100%', // Оставим height: '100%' для Stack
                    background: gradient, 
                    color: textColor, 
                    p: 1, // Уменьшаем padding на Card, чтобы контролировать CardContent
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: '0.3s', 
                    '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)',
                    } 
                }}
            >
                {/* *** КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: CardContent с minHeight и h4 *** */}
                <CardContent sx={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: '16px !important' }}>
                    <Typography variant="caption" sx={{ opacity: 0.9, display: 'block', mb: 0.5, fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography 
                            variant="h4" // <- ВОЗВРАЩЕНО К ИСХОДНОМУ РАЗМЕРУ
                            component="div" 
                            fontWeight="extra-bold"
                        >
                            {signal.replace('_', ' ')} 
                        </Typography>
                        <Box color={textColor} sx={{ ml: 2 }}>
                            {getSignalIcon(signal)}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

// ... (остальные функции renderMetricCard и ResultsDisplay остаются без изменений)
const renderMetricCard = (title, value, unit = '', isPrice = false, isPercent = false) => {
    const displayValue = isPrice ? formatPrice(value) : (value !== null && value !== undefined ? value.toFixed(isPercent ? 2 : 4) : '—');
    
    let color = darkTheme.palette.text.primary;
    let icon = null;

    if (isPercent && value !== null && value !== undefined) {
        if (value > 0.001) {
            color = darkTheme.palette.success.main;
            icon = <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />;
        } else if (value < -0.001) {
            color = darkTheme.palette.error.main;
            icon = <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />;
        }
    }
    if (title.includes('ATR')) {
        icon = <Bolt fontSize="small" sx={{ mr: 0.5, color: darkTheme.palette.warning.main }} />;
    }

    return (
        <Box sx={{ flex: 1, minWidth: { xs: '45%', sm: '22%' } }}>
            <Card variant="outlined" sx={{ boxShadow: 5, border: '1px solid #333', bgcolor: darkTheme.palette.background.paper }}>
                <CardContent sx={{ p: '16px !important' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{title}</Typography>
                    <Box display="flex" alignItems="center">
                        {icon}
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ color: color }} 
                            fontWeight="bold"
                        >
                            {displayValue}{unit}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};


// --- Основной компонент ResultsDisplay ---

const ResultsDisplay = ({ data }) => {
    
    if (!data || !data.technicalSignals || !data.overallTechnicalSignal) {
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="error.main">
                    Analysis data is incomplete. Please ensure the API is running and returns 
                    **overallTechnicalSignal** and **technicalSignals** fields.
                </Typography>
            </Box>
        );
    }

    const { 
        currentPrice, 
        predictedPrice,
        deviationPercent,
        atrValue,
        mlSignal,
        overallTechnicalSignal,
        finalCombinedSignal,
        technicalSignals, 
    } = data;
    
    const indicatorDetailsMap = technicalSignals; 

    return (
        <Box sx={{ mt: 4, width: '100%' }}>
            
            {/* 1. Main Signals (Карточки с сигналами) */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>🎯 Primary Trading Signals</Typography>
                <Stack 
                    direction={{ xs: 'column', md: 'row' }} 
                    spacing={3}
                    // Обеспечиваем растягивание по вертикали
                    alignItems="stretch" 
                >
                    {renderSignalCard('Final Combined Signal', finalCombinedSignal)}
                    {renderSignalCard('ML Prediction (LSTM)', mlSignal)}
                    {renderSignalCard('Technical Analysis', overallTechnicalSignal)}
                </Stack>
            </Box>
            
            {/* 2. Metrics */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>📊 Price & Volatility Metrics</Typography>
                <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2}
                    flexWrap="wrap"
                >
                    {renderMetricCard('Current Price', currentPrice, '', true)}
                    {renderMetricCard('Predicted Price', predictedPrice, '', true)}
                    {renderMetricCard('Deviation from Current', deviationPercent, '%', false, true)}
                    {renderMetricCard('ATR Value (Volatility)', atrValue, '', true)}
                </Stack>
            </Box>

            {/* 3. Technical Indicator Breakdown */}
            <Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>🔬 Technical Indicator Breakdown</Typography>
                <Card sx={{ p: 0, boxShadow: 6, bgcolor: 'background.paper' }}>
                    <Box sx={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: darkTheme.palette.background.default }}>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333' }}>
                                        <IndicatorHeader>Indicator</IndicatorHeader>
                                    </th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333' }}>
                                        <IndicatorHeader>Signal</IndicatorHeader>
                                    </th>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333' }}>
                                        <IndicatorHeader>Context / Note</IndicatorHeader>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(indicatorDetailsMap).map(([indicator, signal]) => (
                                    <tr key={indicator} style={{ borderBottom: '1px solid #222' }}>
                                        <td style={{ padding: '12px', fontWeight: '500', color: darkTheme.palette.text.primary }}>{indicator}</td>
                                        <SignalCell signal={signal}>
                                            {signal.replace('_', ' ')}
                                        </SignalCell>
                                        <td style={{ padding: '12px', color: darkTheme.palette.text.secondary }}>
                                            {indicator === 'RSI' ? `Current Price: ${currentPrice ? currentPrice.toFixed(2) : 'N/A'}` : 'Calculated based on price movement.'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

export default ResultsDisplay;