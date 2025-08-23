import type { KeyValueCacheSetOptions } from '@apollo/utils.keyvaluecache';

export abstract class IPersistedQueries {
  public abstract get(key: string): Promise<string | undefined>;
  public abstract set(key: string, value: string, options?: KeyValueCacheSetOptions): Promise<void>;
  public abstract delete(key: string): Promise<void>;
}
