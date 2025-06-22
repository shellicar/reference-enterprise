import { Worker, type WorkerOptions } from '@temporalio/worker';
import type { IWorkerModule } from '../../interfaces';

export class TemporalWorker implements IWorkerModule {
  private readonly options: WorkerOptions;
  private worker: Worker;
  private promise: Promise<void>;

  public constructor() {
    this.options = {
      taskQueue: 'default',
    };
  }
  public async start(): Promise<void> {
    console.log('Starting Temporal worker with options:', this.options);
    this.worker = await Worker.create(this.options);

    this.promise = this.worker.run();
  }
  public [Symbol.dispose](): void {
    this.worker?.shutdown();
  }
  public async [Symbol.asyncDispose](): Promise<void> {
    try {
      this.worker?.shutdown();
      await this.promise;
    } catch (err) {
      console.error('Error during worker shutdown:', err);
    }
  }
}
