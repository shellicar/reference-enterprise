/**
 * @fileoverview Standardized Apollo Server factory
 * @description Creates a fully configured Apollo Server with auto-discovered GraphQL resources
 * @author Stephen Hellicar
 */
import { env } from 'node:process';
import { ApolloServer } from '@apollo/server';
import { formatError } from './formatError';
import { isDevelopment } from './isDevelopment';
import { logger } from './logger';
import { persistedQueries } from './persistedQueries';
import { plugins } from './plugins';
import { schema } from './schema';
import type { CreateApolloServerOptions } from './types';

export function createApolloServer(options: CreateApolloServerOptions) {
  const { serviceProvider } = options;

  return new ApolloServer({
    csrfPrevention: true,
    introspection: isDevelopment,
    hideSchemaDetailsFromClientErrors: !isDevelopment,
    schema,
    nodeEnv: env.NODE_ENV,
    includeStacktraceInErrorResponses: isDevelopment,
    formatError,
    plugins,
    logger,
    persistedQueries: persistedQueries(serviceProvider),
  });
}
