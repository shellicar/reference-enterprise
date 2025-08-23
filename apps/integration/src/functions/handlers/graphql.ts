import type { HttpHandler } from '@azure/functions';
import { logger } from '@shellicar-reference-enterprise/server-common/core/logging/logger';

export const handler: HttpHandler = () => {
  logger.info('Not implemented yet');
  return {
    status: 501,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
