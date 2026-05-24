import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ApiClient } from '../api/base/api.client';
import { RoomService } from '../api/services';
import { PETSTORE_CONFIG, PetService, PetstoreClient } from '../petstore';

interface CustomFixtures {
    apiClient: ApiClient;
    roomService: RoomService;
    petstoreClient: PetstoreClient;
    petService: PetService;
}

export const test = base.extend<CustomFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },

  roomService: async ({ apiClient }, use) => {
    await use(new RoomService(apiClient));
  },

  petstoreClient: async ({ playwright }, use) => {
    // Opt out of AIT storageState — Petstore uses Bearer JWT, no cookies.
    const apiContext = await playwright.request.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const client = new PetstoreClient(apiContext);

    const tokenPath = path.resolve(process.cwd(), PETSTORE_CONFIG.tokenFile);
    if (fs.existsSync(tokenPath)) {
      const { token } = JSON.parse(fs.readFileSync(tokenPath, 'utf-8')) as { token: string };
      client.setBearerToken(token);
    }

    await use(client);
    await apiContext.dispose();
  },

  petService: async ({ petstoreClient }, use) => {
    await use(new PetService(petstoreClient));
  },
});

export { expect } from '@playwright/test';
