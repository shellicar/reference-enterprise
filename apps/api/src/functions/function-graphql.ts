import { type HttpHandler, app } from '@azure/functions';
import { logger } from '@shellicar-reference-enterprise/server-common/core/logging/logger';

const handler: HttpHandler = () => {
  logger.info('Not implemented yet');
  return {
    status: 501,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

app.http('GraphQL', {
  handler,
  methods: ['POST', 'GET'],
  authLevel: 'anonymous',
});
