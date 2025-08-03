import { Worker, type WorkerOptions } from '@temporalio/worker';
import type { IWorkerModule } from '../../interfaces';

export class TemporalWorker implements IWorkerModule {
  private readonly options: WorkerOptions;
  private worker: Worker | null = null;
  private promise: Promise<void> | null = null;

  public constructor() {
    this.options = {
      taskQueue: 'default',
    };
  }
  public async start(): Promise<void> {
    console.log('Starting Temporal worker with options:', this.options);
    this.worker = await Worker.create(this.options);

    this.promise = this.worker.run().catch((err) => {
      console.error('Error running Temporal worker:', err);
    });
  }
  public [Symbol.dispose](): void {
    this[Symbol.asyncDispose]().catch((err) => {
      console.error('Error during synchronous disposal of Temporal worker:', err);
    });
  }

  public async [Symbol.asyncDispose](): Promise<void> {
    if (this.worker) {
      try {
        const state = this.worker.getStatus();
        switch (state.runState) {
          case 'RUNNING': {
            this.worker.shutdown();
            break;
          }
        }
        await this.promise;
      } catch (err) {
        console.error('Error during worker shutdown:', err);
      }
    }
  }
}
