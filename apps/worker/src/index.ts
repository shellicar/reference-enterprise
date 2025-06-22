import { startServer } from './server.js';

async function main() {
  try {
    // Start the HTTP server
    await startServer();

    // TODO: Start your event listeners here
    // await startServiceBusClient();
    // await startTemporalWorker();

    console.log('Worker started successfully');
  } catch (error) {
    console.error('Failed to start worker:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});

main().catch(console.error);
