import { User, CreateUserRequest, UserRole, UserStatus } from '../../api/models';

export const TEST_USERS = {
    validUser: {
        email: 'test@example.com',
        password: 'Password123!'
    },

    existingUser: {
        id: 'user-001',
        email: 'existing@example.com',
        firstName: 'Existing',
        lastName: 'User',
        role: 'user' as UserRole,
        status: 'active' as UserStatus
    },

    adminUser: {
        id: 'admin-001',
        email: 'admin@example.com',
        password: 'AdminPass123!',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin' as UserRole
    },

    newUserTemplate: (): CreateUserRequest => ({
        email: `new-user-${Date.now()}@example.com`,
        password: 'NewPassword123!',
        firstName: 'New',
        lastName: 'User',
        role: 'user'
    })
} as const;

// Generate random user data for testing
export function generateRandomUser(): CreateUserRequest {
    const timestamp = Date.now();
    return {
        email: `user-${timestamp}@test.com`,
        password: 'TestPassword123!',
        firstName: `First${timestamp}`,
        lastName: `Last${timestamp}`,
        role: 'user'
    };
}

// Generate multiple test users
export function generateTestUsers(count: number): CreateUserRequest[] {
    return Array.from({ length: count }, () => generateRandomUser());
}
