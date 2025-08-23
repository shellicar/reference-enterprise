import type { KeyValueCache, KeyValueCacheSetOptions } from '@apollo/utils.keyvaluecache';
import { serviceProvider } from '../../di/serviceProvider';
import { IPersistedQueries } from './interfaces';

export const cache: KeyValueCache<string> = {
  get: async (key: string) => await serviceProvider.resolve(IPersistedQueries).get(key),
  set: async (key: string, value: string, options?: KeyValueCacheSetOptions) => await serviceProvider.resolve(IPersistedQueries).set(key, value, options),
  delete: async (key: string) => await serviceProvider.resolve(IPersistedQueries).delete(key),
};
