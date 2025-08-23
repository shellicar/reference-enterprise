/**
 * @fileoverview Version endpoint for API App
 * @description Returns build version information to verify deployed code
 * @author Stephen Hellicar
 */
import { app } from '@azure/functions';

const { handler } = await import('./handlers/version');

app.http('Version', {
  handler,
  methods: ['POST', 'GET'],
  authLevel: 'anonymous',
});
