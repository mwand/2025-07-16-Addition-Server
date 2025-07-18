import express from 'express';
import { getSum } from './adderController.js';



/**
 * Creates and configures the Express application
 * @returns Configured Express app instance
 */
export const createApp = (): express.Application => {
  const app = express();

  // Middleware for parsing JSON requests
  app.use(express.json());

   // // empty endpoint
  // app.get('', (_req, res) => {
  //   res.status(404).json({ message: 'This is an empty endpoint' });
  // });

  // // Health check endpoint
  // app.get('/', (_req, res) => {
  //   res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
  // });

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
  }); 

  // Addition endpoint
  app.get('/sum/:i/:j', getSum); 
  
  app.use((req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method} ${req.originalUrl} not found`
    });
  });

  // Global error handler
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // eslint-disable-next-line no-console
    console.error('Unhandled error:', err);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'An unexpected error occurred' 
    });
  });

  return app;
};
