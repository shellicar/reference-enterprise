import type { v4 } from '@as-integrations/azure-functions';
import { serviceProvider } from '../di/serviceProvider';

export const context = async (_ctx: v4.AzureFunctionsContextFunctionArgument) => {
  const scope = serviceProvider.createScope();
  return {
    scope,
  };
};
