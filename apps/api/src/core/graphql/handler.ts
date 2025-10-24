import { v4 } from '@as-integrations/azure-functions';
import { context } from './context';
import { server } from './server';

export const handler = v4.startServerAndCreateHandler(server, {
  context,
});
