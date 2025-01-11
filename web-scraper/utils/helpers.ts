// src/utils/helpers.ts

export function formatData(data: any): string {
    // Format the scraped data as needed
    return JSON.stringify(data, null, 2);
}

export function handleError(error: Error): void {
    // Log the error or handle it as needed
    console.error('An error occurred:', error.message);
}

export function delay(ms: number): Promise<void> {
    // Return a promise that resolves after a delay
    return new Promise(resolve => setTimeout(resolve, ms));
}