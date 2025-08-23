/**
 * @fileoverview GraphQL endpoint for API App
 * @description Main interface into the application. Serves frontend queries.
 * @author Stephen Hellicar
 */
import { app } from '@azure/functions';

const { handler } = await import('./handlers/graphql');

app.http('GraphQL', {
  handler,
  methods: ['POST', 'GET'],
  authLevel: 'anonymous',
});
