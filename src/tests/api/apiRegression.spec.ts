import { test, expect, request } from '@playwright/test';

test.describe('API Regression', () => {
  test('GET /entries returns 200', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.entries).toBeDefined();
  });
});
