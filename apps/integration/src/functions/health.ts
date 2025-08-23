/**
 * @fileoverview Health check endpoint for Integration App
 * @description Returns overall health status, and individual feature health
 * @author Stephen Hellicar
 */
import { app } from '@azure/functions';
import { createAsyncHandler } from '@shellicar-reference-enterprise/server-common/core/handlers/loader';

const handler = createAsyncHandler('Health', () => import('./handlers/health'));

app.http('Health', {
  handler,
  methods: ['GET', 'HEAD'],
  authLevel: 'anonymous',
});
