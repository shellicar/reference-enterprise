import { ApolloServerErrorCode } from '@apollo/server/errors';
import type { GraphQLFormattedError } from 'graphql';
import { isDevelopment } from './isDevelopment';

export const formatError = (formattedError: GraphQLFormattedError, _error: unknown): GraphQLFormattedError => {
  if (!isDevelopment && formattedError.extensions?.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
    return {
      message: 'An unexpected error occurred',
    };
  }
  return formattedError;
};
