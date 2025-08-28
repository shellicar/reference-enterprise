import { serviceProvider } from './core/di/serviceProvider';
import { IWorkerModule } from './interfaces';

const main = async () => {
  await using scope = serviceProvider.createScope();
  const workers = scope.resolveAll(IWorkerModule);

  const abortController = new AbortController();
  await Promise.all(workers.map((instance) => instance.start()));

  const termHandler = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    for (const instance of workers) {
      try {
        await instance[Symbol.asyncDispose]();
      } catch (err) {
        console.error(`Error during shutdown of ${instance.constructor.name}:`, err);
      }
    }
    console.log('All modules shut down gracefully.');
    abortController.abort();
  };

  process.on('SIGINT', termHandler);
  process.on('SIGTERM', termHandler);

  console.log('Worker modules started successfully.');
  await new Promise<void>((resolve) => {
    abortController.signal.addEventListener('abort', () => resolve(), { once: true });
  });
};

await main();
