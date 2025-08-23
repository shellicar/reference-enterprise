/**
 * @fileoverview Configuration endpoint for Integration App
 * @description Returns current configuration values for debugging and verification
 * @author Stephen Hellicar
 */
import { app } from '@azure/functions';

const { handler } = await import('./handlers/config');

app.http('Config', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
