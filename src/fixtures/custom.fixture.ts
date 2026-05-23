import { test as base } from '@playwright/test';
import { ApiClient } from '../api/base/api.client';
import { RoomService } from '../api/services';

interface CustomFixtures {
    apiClient: ApiClient;
    roomService: RoomService;
}

export const test = base.extend<CustomFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },

  roomService: async ({ apiClient }, use) => {
    await use(new RoomService(apiClient));
  },
});

export { expect } from '@playwright/test';
