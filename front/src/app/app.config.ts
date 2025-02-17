import { InjectionToken } from '@angular/core';

// ✅ Define an InjectionToken for the API base URL
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
    providedIn: 'root',
    factory: () => 'http://localhost:3000' // Set your base API URL here
});
