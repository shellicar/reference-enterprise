import { modules } from '@modules/generated';
import { createServiceCollection } from '@shellicar/core-di';

const services = createServiceCollection();
services.registerModules(...modules);

export { services };
