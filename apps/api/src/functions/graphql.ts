/**
 * @fileoverview GraphQL endpoint for API App
 * @description Main interface into the application. Serves frontend queries.
 * @author Stephen Hellicar
 */
import { app } from '@azure/functions';
import { createAsyncHandler } from '@shellicar-reference-enterprise/server-common/core/createAsyncHandler';

const handler = createAsyncHandler('GraphQL', () => import('./handlers/graphql'));

app.http('GraphQL', {
  handler,
  methods: ['POST', 'GET'],
  authLevel: 'anonymous',
});
