import type { HttpHandler, HttpRequest, InvocationContext } from '@azure/functions';

interface LoggerInterface {
  info: (message: any, ...meta: any[]) => void;
  error: (message: any, ...meta: any[]) => void;
  debug: (message: any, ...meta: any[]) => void;
}

const getLogger = async (): Promise<LoggerInterface> => {
  try {
    const { logger } = await import('@shellicar-reference-enterprise/server-common/core/logging/logger');
    return logger;
  } catch (_) {
    return {
      info: console.log,
      error: console.error,
      debug: console.debug,
    };
  }
};

export const createAsyncHandler = (name: string, importHandler: () => Promise<{ handler: HttpHandler }>): HttpHandler => {
  let cachedHandler: HttpHandler | null = null;
  let isInitialising = false;

  return async (request: HttpRequest, context: InvocationContext) => {
    if (cachedHandler) {
      return cachedHandler(request, context);
    }

    if (isInitialising) {
      return {
        status: 503,
        body: JSON.stringify({ errors: [{ message: 'Handler initialising, please retry' }] }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    isInitialising = true;

    try {
      const logger = await getLogger();
      logger.debug(`Initialising ${name} handler`);
      const { handler } = await importHandler();

      if (!handler || typeof handler !== 'function') {
        throw new Error(`Invalid handler export from ${name}`);
      }

      cachedHandler = handler;
      logger.info(`${name} handler initialised successfully`);
      return handler(request, context);
    } catch (err) {
      const logger = await getLogger();
      logger.error(`Failed to initialise ${name} handler:`, err);

      const errorHandler: HttpHandler = async () => ({
        status: 503,
        body: JSON.stringify({ errors: [{ message: 'Service temporarily unavailable' }] }),
        headers: { 'Content-Type': 'application/json' },
      });

      cachedHandler = errorHandler;
      return errorHandler(request, context);
    } finally {
      isInitialising = false;
    }
  };
};
