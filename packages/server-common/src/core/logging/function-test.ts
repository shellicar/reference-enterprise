import type { HttpRequest } from '@azure/functions';
import { logger } from './logger';

export const myFunc = (req: HttpRequest): void => {
  logger.info('Function called with request:', req);
};
