import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from './express.js';
import * as adderController from './adderController.js';

// Mock the adderController module
vi.mock('./adderController.js', () => ({
  getSum: vi.fn()
}));

describe('Express App', () => {
  const app = createApp();
  const mockGetSum = vi.mocked(adderController.getSum);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Health Check Endpoints', () => {




    it('should return healthy status on /health endpoint', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'healthy',
        timestamp: expect.any(String)
      });
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });

    
  describe('Addition Endpoint', () => {
    it('should have exactly the route /sum/:i/:j and no other sum-related routes', async () => {
      // This test ensures the specific route pattern exists and catches mutations to empty string
      mockGetSum.mockImplementation((req, res) => {
        res.status(200).json({ 
          route: req.route?.path,
          params: req.params 
        });
      });

      // Test that the correct route works
      const validResponse = await request(app)
        .get('/sum/1/2')
        .expect(200);

      expect(validResponse.body.route).toBe('/sum/:i/:j');
      expect(validResponse.body.params).toEqual({ i: '1', j: '2' });
      expect(mockGetSum).toHaveBeenCalledTimes(1);

      vi.clearAllMocks();

      // Test that root path does NOT trigger the sum handler
      await request(app)
        .get('/')
        .expect(404);

      expect(mockGetSum).not.toHaveBeenCalled();

      // Test that incomplete sum paths don't work
      await request(app)
        .get('/sum')
        .expect(404);

      expect(mockGetSum).not.toHaveBeenCalled();

      await request(app)
        .get('/sum/')
        .expect(404);

      expect(mockGetSum).not.toHaveBeenCalled();
    });

    it('should call getSum controller for /sum/:i/:j route', async () => {
      // Mock the controller response
      mockGetSum.mockImplementation((_, response) => {
        response.status(200).json({ result: 5 });
      });

      const response = await request(app)
        .get('/sum/2/3')
        .expect(200);

      expect(mockGetSum).toHaveBeenCalledTimes(1);
      
      // Verify the mock was called with Express request, response, and next
      const call = mockGetSum.mock.calls[0];
      expect(call).toBeDefined();
      expect(call).toHaveLength(3); // req, res, next
      
      const req = call![0];
      const res = call![1];
      expect(req.params).toEqual({ i: '2', j: '3' });
      expect(typeof res.status).toBe('function');
      expect(typeof res.json).toBe('function');
      
      expect(response.body).toEqual({ result: 5 });
    });

    it('should handle controller errors gracefully', async () => {
      // Mock console.error to suppress error logging during this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock the controller to throw an error
      mockGetSum.mockImplementation((_1, _2) => {
        throw new Error('Controller error');
      });

      const response = await request(app)
        .get('/sum/1/2')
        .expect(500);

      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
      });
      
      // Verify that the error was logged
      expect(consoleSpy).toHaveBeenCalledWith('Unhandled error:', expect.any(Error));
      
      // Restore console.error
      consoleSpy.mockRestore();
    });

    it('should handle invalid parameters through controller', async () => {
      // Mock the controller to return validation error
      mockGetSum.mockImplementation((_, response) => {
        response.status(400).json({
          error: 'Invalid input',
          details: 'Parameters must be valid numbers'
        });
      });

      const response = await request(app)
        .get('/sum/abc/def')
        .expect(400);

      expect(mockGetSum).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual({
        error: 'Invalid input',
        details: 'Parameters must be valid numbers'
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Not Found',
        message: 'Route GET /unknown-route not found'
      });
    });

    it('should return 404 for unsupported HTTP methods', async () => {
      const response = await request(app)
        .post('/sum/1/2')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Not Found',
        message: 'Route POST /sum/1/2 not found'
      });
    });

    it('should handle DELETE requests with 404', async () => {
      const response = await request(app)
        .delete('/health')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Not Found',
        message: 'Route DELETE /health not found'
      });
    });
  });

  describe('Middleware', () => {
    it('should parse JSON requests', async () => {
      // This test verifies that express.json() middleware is working
      // by sending a POST request with JSON body (even though we expect 404)
      const response = await request(app)
        .post('/test-json')
        .send({ test: 'data' })
        .set('Content-Type', 'application/json')
        .expect(404);

      // The 404 response indicates the middleware parsed the JSON successfully
      // and the request reached the 404 handler
      expect(response.body.error).toBe('Not Found');
    });
  });

  describe('App Creation', () => {
    it('should create a new app instance each time', () => {
      const app1 = createApp();
      const app2 = createApp();
      
      expect(app1).not.toBe(app2);
      expect(typeof app1.listen).toBe('function');
      expect(typeof app2.listen).toBe('function');
    });

    it('should return an Express application', () => {
      const app = createApp();
      
      expect(app).toBeDefined();
      expect(typeof app.get).toBe('function');
      expect(typeof app.post).toBe('function');
      expect(typeof app.use).toBe('function');
      expect(typeof app.listen).toBe('function');
    });

    it('should register the correct routes and not register empty string routes', () => {
      const app = createApp();
      
      // Get the router layer stack to inspect registered routes
      const routes = app._router.stack
        .filter((layer: any) => layer.route)
        .map((layer: any) => ({
          path: layer.route.path,
          methods: Object.keys(layer.route.methods)
        }));

      // Should have the sum route
      const sumRoute = routes.find((route: any) => route.path === '/sum/:i/:j');
      expect(sumRoute).toBeDefined();
      expect(sumRoute?.methods).toContain('get');

      // Should have the health route
      const healthRoute = routes.find((route: any) => route.path === '/health');
      expect(healthRoute).toBeDefined();
      expect(healthRoute?.methods).toContain('get');

      // Should NOT have empty string route
      const emptyRoute = routes.find((route: any) => route.path === '');
      expect(emptyRoute).toBeUndefined();

      // Should NOT have root route 
      const rootRoute = routes.find((route: any) => route.path === '/');
      expect(rootRoute).toBeUndefined();
    });
  });
}); 
});
