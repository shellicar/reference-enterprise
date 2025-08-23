/**
 * @fileoverview Version endpoint for Integration App
 * @description Returns build version information to verify deployed code
 * @author Stephen Hellicar
 */
import { app } from '@azure/functions';
import { createAsyncHandler } from '@shellicar-reference-enterprise/server-common/core/handlers/loader';

const handler = createAsyncHandler('Version', () => import('./handlers/version'));

app.http('Version', {
  handler,
  methods: ['POST', 'GET'],
  authLevel: 'anonymous',
});
