import { test as base } from '@playwright/test';
import { ApiClient } from '../api/base/ApiClient';
import { AuthService, JobService, UserService } from '../api/services';

// Auth data interface
interface AuthData {
    cookies: Array<{ name: string; value: string; domain?: string }>;
    __requestverificationtoken: string;
}

// Define the fixture types
interface ApiFixtures {
    apiClient: ApiClient;
    authService: AuthService;
    userService: UserService;
    jobService: JobService;
}

// Extend base test with API fixtures
export const test = base.extend<ApiFixtures>({

    // API client (auto-loads auth from storage)
    apiClient: async ({ request }, use) => {
        const client = new ApiClient(request);
        await use(client);
    },

    // Auth service
    authService: async ({ apiClient }, use) => {
        await use(new AuthService(apiClient));
    },

    // User service
    userService: async ({ apiClient }, use) => {
        await use(new UserService(apiClient));
    },

    // Job service
    jobService: async ({ apiClient }, use) => {
        await use(new JobService(apiClient));
    }
});

export { expect } from '@playwright/test';

