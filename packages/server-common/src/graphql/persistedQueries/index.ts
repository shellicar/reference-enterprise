import type { PersistedQueryOptions } from '@apollo/server';
import type { IServiceProvider } from '@shellicar/core-di';
import { cache } from './cache';

export const persistedQueries = (serviceProvider: IServiceProvider): PersistedQueryOptions =>
  ({
    cache: cache(serviceProvider),
  }) satisfies PersistedQueryOptions;
