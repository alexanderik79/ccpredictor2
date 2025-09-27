// src/types/analysis.ts

// Типы для сигналов (для большей строгости)
export type Signal = 
    | 'STRONG_BUY' 
    | 'BUY' 
    | 'HOLD' 
    | 'SELL' 
    | 'STRONG_SELL';

// Интерфейс для отдельного технического сигнала
export interface TechnicalSignal {
    indicator: string;
    value: number;
    signal: Signal;
}

// Интерфейс для сводных сигналов
export interface TechnicalSignals {
    movingAveragesSignal: Signal;
    oscillatorsSignal: Signal;
    overallSignal: Signal;
}

// Интерфейс для основных данных анализа
export interface AnalysisData {
    symbol: string;
    interval: string;
    currentPrice: number;
    priceChange24hPercent: number;
    time: string; // Временная метка
    technicalSignals: TechnicalSignals;
    indicatorDetails: TechnicalSignal[];
}