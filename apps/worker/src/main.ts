import { HonoServer } from './HonoServer';
import { TemporalWorker } from './TemporalWorker';
import type { IWorkerModule } from './interfaces';

const modules = [HonoServer, TemporalWorker] satisfies (typeof IWorkerModule)[];

const main = async () => {
  const classes = modules.map((Module) => new Module());
  const startPromises = classes.map((instance) => instance.start());
  const result = await Promise.all(startPromises);

  // TODO: Handle graceful shutdown

  const termHandler = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    for (const instance of classes) {
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
