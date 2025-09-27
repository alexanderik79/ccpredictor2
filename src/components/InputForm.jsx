// src/components/InputForm.jsx

import React from 'react';
import { TextField, Button, Box, InputLabel, Select, MenuItem, Stack, CircularProgress } from '@mui/material';

const InputForm = ({ symbol, setSymbol, interval, setInterval, loading, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                alignItems={{ xs: 'stretch', sm: 'flex-end' }}
            >
                {/* Symbol Input */}
                <Box sx={{ flexGrow: 1, minWidth: { sm: 180 } }}>
                    <TextField
                        fullWidth
                        label="Symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        placeholder="e.g., BTCUSDT"
                        required
                        variant="filled" 
                    />
                </Box>
                {/* Interval Select */}
                <Box sx={{ minWidth: { sm: 120 } }}>
                    <InputLabel 
                        id="interval-select-label" 
                        sx={{ mb: 1, visibility: { xs: 'visible', sm: 'hidden' }, color: 'text.secondary' }}
                    >
                        Interval
                    </InputLabel>
                    <Select
                        fullWidth
                        labelId="interval-select-label"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                        variant="filled"
                    >
                        <MenuItem value="15m">15m</MenuItem>
                        <MenuItem value="1h">1h</MenuItem>
                        <MenuItem value="4h">4h</MenuItem>
                        <MenuItem value="1d">1d</MenuItem>
                    </Select>
                </Box>
                
                {/* Submit Button */}
                <Box sx={{ width: { sm: 180 } }}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        sx={{ height: '56px', boxShadow: 8 }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? 'Analyzing...' : 'Get Analysis'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};

export default InputForm;