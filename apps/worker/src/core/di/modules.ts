import type { IServiceModule } from '@shellicar/core-di';
import { HonoServerModule } from '../http/HonoServerModule';
import { TemporalWorkerModule } from '../temporal-worker/TemporalWorkerModule';

export const modules = [HonoServerModule, TemporalWorkerModule] satisfies (typeof IServiceModule)[];
