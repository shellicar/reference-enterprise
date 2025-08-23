/**
 * @fileoverview Configuration endpoint for API App
 * @description Returns current configuration values for debugging and verification
 * @author Stephen Hellicar
 */
import { app, type HttpHandler } from '@azure/functions';

const { handler } = await import('./handlers/config');

app.http('Config', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
