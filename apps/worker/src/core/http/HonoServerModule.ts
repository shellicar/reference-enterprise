import type { IServiceCollection, IServiceModule } from '@shellicar/core-di';
import { IWorkerModule } from '../../interfaces';
import { HonoServer } from './HonoServer';

export class HonoServerModule implements IServiceModule {
  registerServices(services: IServiceCollection): void {
    services.register(IWorkerModule).to(HonoServer);
  }
}
