import { createServiceCollection } from '@shellicar/core-di';
import { modules } from '@shellicar-reference-enterprise/server-common/generated';

const services = createServiceCollection();
console.log(
  'Registering service modules:',
  modules.map((m) => m.name),
);
services.registerModules(...modules);
export { services };
