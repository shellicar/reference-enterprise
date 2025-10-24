import { createServiceCollection } from '@shellicar/core-di';
import { modules } from '@shellicar-reference-enterprise/server-common/generated';

const services = createServiceCollection();
services.registerModules(...modules);
export { services };
