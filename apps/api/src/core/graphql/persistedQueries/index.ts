import type { PersistedQueryOptions } from '@apollo/server';
import { cache } from './cache';

export const persistedQueries = {
  cache,
} satisfies PersistedQueryOptions;
