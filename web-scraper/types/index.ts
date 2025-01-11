// src/types/index.ts

export interface ScraperConfig {
    url: string;
    method: 'GET' | 'POST';
    headers?: Record<string, string>;
}

export interface ScrapedData {
    [key: string]: any;
}