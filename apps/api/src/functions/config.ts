/**
 * @fileoverview Configuration endpoint for API App
 * @description Returns current configuration values for debugging and verification
 * @author Stephen Hellicar
 */
import { app } from '@azure/functions';
import { createAsyncHandler } from '@shellicar-reference-enterprise/server-common/core/handlers/loader';

const handler = await createAsyncHandler('Config', () => import('./handlers/config'));

app.http('Config', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
