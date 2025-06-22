import { type ServerType, serve } from '@hono/node-server';
import version from '@shellicar/build-version/version';
import { Hono } from 'hono';
import type { IWorkerModule } from './interfaces';

export class HonoServer implements IWorkerModule {
  private readonly app: Hono;
  private readonly host = 'localhost';
  private readonly port = 3000;
  private server: ServerType | null = null;

  public constructor() {
    this.app = new Hono({
      strict: true,
    });

    this.app.get('/health', (c) => c.json({ status: 'ok' }));

    this.app.get('/version', (c) => c.json(version));

    this.app.get('/config', (c) =>
      c.json({
        hello: 'world',
      }),
    );
  }

  public async start(): Promise<void> {
    const url = new URL(`http://${this.host}:${this.port}`);
    console.log(`Starting server on: ${url.href}`);

    this.server = serve({
      fetch: this.app.fetch,
      port: this.port,
      hostname: this.host,
    });
  }

  public [Symbol.dispose](): void {
    this.server?.close();
  }
  public async [Symbol.asyncDispose](): Promise<void> {
    this.server?.close();
  }
}
