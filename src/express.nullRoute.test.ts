// this file should never be run; the imports are there just to make the
// typechecker happy
import { it, expect, vi } from 'vitest';
import request from 'supertest';
import { createApp } from './express.js';
import * as adderController from './adderController.js';

/* These are tests for the empty route.  But the don't
   behave the same way in production mode as in test mode.
   In production mode, "/" hits dist/index.html boots the React app 
   and returns 200.  In test mode, there is no static file with empty file name, 
   so it returns 404.

   So it's pointless to try to run any of these tests.
*/

const app = createApp();
const mockGetSum = vi.mocked(adderController.getSum);
// Return a polite message for root endpoint
it('should return 200 for root endpoint', async () => {
  const response = await request(app).get('/').expect(200);
  console.log('response', response.body);
  expect(response.body).toEqual({
    error: 'Not Found',
    message: `Route GET / not found`,
  });
});

// This test was suggested by AI to catch the mutant
it('should NOT call getSum controller for root endpoint', async () => {
  // This test specifically catches the mutant where the /sum route is replaced with ""
  // The key insight: if app.get("", getSum) is used, then the root endpoint might
  // either call getSum OR still return 404 depending on Express behavior.
  // We need to test both conditions to ensure we catch the mutant.

  const response = await request(app)
    .get('/')
    .expect(res => {
      // The mutant could cause either:
      // 1. getSum to be called (which would be wrong)
      // 2. Still return 404 if Express ignores empty string routes

      // First, verify getSum was NOT called regardless of response
      expect(mockGetSum).not.toHaveBeenCalled();

      // Then verify we get the expected 404 response
      expect(res.status).toBe(404);
    });

  expect(response.body).toEqual({
    error: 'Not Found',
    message: 'Route GET / not found',
  });
});

// This test was also suggested by AI to catch the mutant
it('should NOT call getSum for any non-sum routes', async () => {
  // Test multiple paths that should NOT trigger getSum, including specific mutant cases
  const pathsToTest = ['/', '/health', '/random'];

  for (const path of pathsToTest) {
    vi.clearAllMocks(); // Clear previous calls

    // Use a timeout to prevent hanging if getSum is incorrectly called
    const response = await request(app).get(path).timeout(1000);

    // Verify getSum was never called for any of these paths
    expect(mockGetSum).not.toHaveBeenCalled();

    // Specifically verify we get 404 for root path (catches the empty string mutant)
    if (path === '/') {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    }
  }
});
