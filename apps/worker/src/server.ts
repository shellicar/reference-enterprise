import { serve } from '@hono/node-server';
import { Hono } from 'hono';

export const startServer = async () => {
  const app = new Hono({
    strict: true,
  });

  // Basic health check endpoint
  app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

  // Config verification endpoint
  app.get('/config', (c) =>
    c.json({
      env: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    }),
  );

  const port = Number(process.env.PORT) || 3000;

  console.log(`Starting server on port ${port}`);

  serve({
    fetch: app.fetch,
    port,
  });

  return app;
};
