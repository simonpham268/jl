export const API_CONFIG = {
    baseURL: process.env.API_BASE_URL || 'https://api.example.com/v1',
    
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    timeout: 30000, // 30 seconds

    retryConfig: {
        maxRetries: 3,
        retryDelay: 1000, // 1 second
        retryOn: [500, 502, 503, 504]
    }
} as const;

// Environment-specific configs
export const ENV_CONFIGS = {
    dev: {
        baseURL: 'https://dev-api.example.com/v1'
    },
    staging: {
        baseURL: 'https://staging-api.example.com/v1'
    },
    production: {
        baseURL: 'https://api.example.com/v1'
    }
} as const;
