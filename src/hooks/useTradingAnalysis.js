// src/hooks/useTradingAnalysis.js

import { useState, useCallback, useEffect } from 'react';

const API_BASE_URL = 'https://needed-quagga-ultimate.ngrok-free.app';

export const useTradingAnalysis = (initialSymbol, initialInterval) => {
    const [symbol, setSymbol] = useState(initialSymbol);
    const [interval, setInterval] = useState(initialInterval);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false); 

    const fetchData = useCallback(async (currentSymbol, currentInterval) => { 
        setLoading(true);
        setError(null);

        const url = `${API_BASE_URL}?symbol=${currentSymbol}&interval=${currentInterval}`;
        const maxRetries = 3;
        let response = null;
        
        try {
            for (let attempt = 0; attempt < maxRetries; attempt++) {
                response = await fetch(url);
                if (response.ok) break;

                if (attempt < maxRetries - 1) {
                    const delay = Math.pow(2, attempt) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    const errorText = await response.text();
                    throw new Error(`HTTP Error: ${response.status} - ${errorText.substring(0, 100)}...`);
                }
            }
            
            if (!response || !response.ok) {
                 throw new Error("Failed to fetch data after all retries.");
            }

            const result = await response.json();
            
            if (!result || !result.currentPrice) {
                throw new Error("Invalid response structure received from API.");
            }

            setData(result);
        } catch (e) {
            console.error("Data fetch error:", e);
            let errorMessage = e.message;
            if (errorMessage.includes("Failed to fetch")) {
                errorMessage = "Connection blocked. Check CORS settings in Spring Boot (WebConfig.java) and ensure the server is running.";
            }
            
            setError("Could not connect to API. Ensure Spring Boot server is running on port 8080. Error: " + errorMessage);
        } finally {
            setLoading(false);
            setShouldFetch(false); 
        }
    }, []);

    useEffect(() => {
        if (shouldFetch) {
            fetchData(symbol, interval);
        }
    }, [shouldFetch, fetchData, symbol, interval]); 

    return { symbol, setSymbol, interval, setInterval, data, loading, error, setShouldFetch };
};