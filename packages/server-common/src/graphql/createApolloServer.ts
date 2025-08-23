/**
 * @fileoverview Standardized Apollo Server factory
 * @description Creates a fully configured Apollo Server with auto-discovered GraphQL resources
 * @author Stephen Hellicar
 */
import { env } from 'node:process';
import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from '@graphql/generated';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { IServiceProvider } from '@shellicar/core-di';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive/apollo4';
import { formatError } from './formatError';
import { logger } from './logger';
import { persistedQueries } from './persistedQueries';
import { plugins } from './plugins';
import { schema } from './schema';

export function createApolloServer(serviceProvider: IServiceProvider) {
  const isDevelopment = env.NODE_ENV === 'development';

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
