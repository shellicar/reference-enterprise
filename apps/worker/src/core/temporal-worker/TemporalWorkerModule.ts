import type { IServiceCollection, IServiceModule } from '@shellicar/core-di';
import { IWorkerModule } from '../../interfaces';
import { TemporalWorker } from './TemporalWorker';

export class TemporalWorkerModule implements IServiceModule {
  registerServices(services: IServiceCollection): void {
    services.register(IWorkerModule).to(TemporalWorker);
  }
}
