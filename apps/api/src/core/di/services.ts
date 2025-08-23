import { createServiceCollection } from '@shellicar/core-di';
import { modules } from './modules';

const services = createServiceCollection();
services.registerModules(...modules);

export { services };
