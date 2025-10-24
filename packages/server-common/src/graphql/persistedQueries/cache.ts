import type { KeyValueCache, KeyValueCacheSetOptions } from '@apollo/utils.keyvaluecache';
import type { IServiceProvider } from '@shellicar/core-di';
import { IPersistedQueries } from './interfaces';

export const cache = (serviceProvider: IServiceProvider) =>
  ({
    get: async (key: string) => await serviceProvider.resolve(IPersistedQueries).get(key),
    set: async (key: string, value: string, options?: KeyValueCacheSetOptions) => await serviceProvider.resolve(IPersistedQueries).set(key, value, options),
    delete: async (key: string) => await serviceProvider.resolve(IPersistedQueries).delete(key),
  }) satisfies KeyValueCache<string>;
