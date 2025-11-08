import { createApp } from './express.ts';

const PORT = parseInt(process.env['PORT'] || '3000', 10);
const HOST = '0.0.0.0'; // not 'localhost'

/** Usage:
 * start with npx tsx src/server.ts
 * then visit http://localhost:3000/sum/1/2
 * or http://localhost:3000/health
 * or http://localhost:3000/ (should give 404)
 * (or say curl http://localhost:3000/sum/1/2)
 */

/**
 * Start the Express server
 */
const startServer = (): void => {
  const app = createApp();

  const server = app.listen(PORT, HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
    // eslint-disable-next-line no-console
    console.log(`📊 Health check: http://${HOST}:${PORT}/health`);
    // eslint-disable-next-line no-console
    console.log(`➕ Addition endpoint: http://${HOST}:${PORT}/sum/:i/:j`);
  });

  // Graceful shutdown handling
  const gracefulShutdown = (signal: string): void => {
    // eslint-disable-next-line no-console
    console.log(`\n${signal} received. Shutting down gracefully...`);

    server.close(err => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('Error during server shutdown:', err);
        process.exit(1);
      }
      // eslint-disable-next-line no-console
      console.log('Server closed successfully.');
      process.exit(0);
    });
  };

  // Handle process termination signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

// Start the server if this file is run directly
// Check if this module is the main module being executed
if (
  (process.argv[1] && process.argv[1].endsWith('server.ts')) ||
  (process.argv[1] && process.argv[1].endsWith('server.js'))
) {
  startServer();
}

export { startServer };
