import type { HttpHandler, HttpRequest, InvocationContext } from '@azure/functions';
import { Deferred } from './Deferred';

type Logger = {
  info: (message: string, ...meta: any[]) => void;
  error: (message: string, ...meta: any[]) => void;
  debug: (message: string, ...meta: any[]) => void;
};

type ImportHandler = () => Promise<{ handler: HttpHandler }>;

const createLogger = async (): Promise<Logger> => {
  try {
    const { logger } = await import('@shellicar-reference-enterprise/server-common/core/logging/logger');
    return logger;
  } catch {
    return {
      info: console.log,
      error: console.error,
      debug: console.debug,
    };
  }
};

const createErrorHandler = (): HttpHandler => () => ({
  status: 503,
  body: JSON.stringify({ errors: [{ message: 'Service temporarily unavailable' }] }),
  headers: { 'Content-Type': 'application/json' },
});

const startInitialisation = async (name: string, importHandler: ImportHandler, deferred: Deferred<HttpHandler>) => {
  const logger = await createLogger();

  try {
    logger.debug(`Initialising ${name} handler`);
    const { handler } = await importHandler();
    logger.info(`${name} handler initialised successfully`);
    deferred.resolve(handler);
  } catch (error) {
    logger.error(`Failed to initialise ${name} handler`, error);
    deferred.resolve(createErrorHandler());
  }
};

export const createAsyncHandler = (name: string, importHandler: ImportHandler): HttpHandler => {
  const deferred = new Deferred<HttpHandler>();

  startInitialisation(name, importHandler, deferred);

  return async (request: HttpRequest, context: InvocationContext) => {
    const handler = await deferred.promise;
    return handler(request, context);
  };
};
