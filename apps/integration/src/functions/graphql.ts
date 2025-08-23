/**
 * @fileoverview GraphQL endpoint for Azure Functions
 * @description This is an optional GraphQL endpoint if you want a GraphQL API for other services, or 3rd parties.
 *              Delete this file if you don't want GraphQL functionality.
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
