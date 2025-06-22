import { serviceProvider } from './core/di/serviceProvider';
import { HonoServer } from './core/http/HonoServer';
import { TemporalWorker } from './core/temporal-worker/TemporalWorker';
import { IWorkerModule } from './interfaces';

const modules = [HonoServer, TemporalWorker] satisfies (typeof IWorkerModule)[];

const main = async () => {
  using scope = serviceProvider.createScope();
  const workers = scope.resolveAll(IWorkerModule);
  const startPromises = workers.map((instance) => instance.start());
  const result = await Promise.all(startPromises);

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
  };

  process.on('SIGINT', termHandler);
  process.on('SIGTERM', termHandler);
  console.log(`PID = ${process.pid}`);
};

await main();
